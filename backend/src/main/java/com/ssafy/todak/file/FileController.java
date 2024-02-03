package com.ssafy.todak.file;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.todak.fcm.FCMTokenManager;
import com.ssafy.todak.member.common.MemberLoader;
import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.member.repository.RefreshTokenRepository;
import com.ssafy.todak.member.util.JwtTokenUtil;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;


@RestController
@RequestMapping("/file")
@RequiredArgsConstructor
public class FileController {

    @Value("${flask2.server.url}")
    private String flaskServerUrl;  // Flask 서버의 URL을 application.properties에서 읽어옵니다.
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    private final FileService fileService;
    private final AmazonS3 amazonS3;
    private final MemberLoader memberLoader;


    // 녹음 파일을 S3에 저장 + 레디스에도 저장
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam MultipartFile file) throws IOException {
        try {
            String fileName= file.getOriginalFilename();

            ObjectMetadata metadata= new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            amazonS3.putObject(bucket,fileName,file.getInputStream(),metadata);
            String fileUrl= amazonS3.getUrl(bucket, fileName).toString();

            // 레디스에 저장
            fileService.addFileUrl(memberLoader.getId(), fileName, fileUrl);

            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 레디스에서 유저의 녹음 파일과 이름 map으로 가져오기
    @GetMapping("/download")
    public ResponseEntity<Map<String, String>> downloadFile() {
        return ResponseEntity.ok(fileService.getFile());
    }

    // S3에서 삭제하기
    @DeleteMapping("")
    public ResponseEntity<String> deleteFile(@RequestParam String originalFilename)  {

        amazonS3.deleteObject(bucket, originalFilename);
        return ResponseEntity.ok("삭제됐습니다");
    }

    @PostMapping()
    public void getRecordAndSend() throws IOException {
        // 저장돼있는 녹음 파일들 가져오기 -> 추후 보완 **************
        String memberId = String.valueOf(memberLoader.getId());

        // ZIP 파일 생성 경로
        // 현재 시간 문자열로 저장
        String currentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));

        // 파일 이름 생성 (예: member_id_20220101_123456.wav)
        String fileName = String.format("%s_%s.zip", memberId, currentDateTime);

        // 저장할 경로와 파일 이름 합치기
        String zipFilePath = Paths.get("C:\\tts-server\\save\\", fileName).toString();

        // 압축하기
        ZipOutputStream zipOutputStream = new ZipOutputStream(new FileOutputStream(zipFilePath));
        List<File> wavList = new ArrayList<>();
        for (File wavFile: wavList){
            addToZip(zipOutputStream, wavFile);
        }

        // Flask 서버의 엔드포인트 URL
        String flaskLearningUrl = flaskServerUrl + "learning-server/get";

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

        // 요청 엔터티 생성
        HttpEntity<List<File>> requestEntity = new HttpEntity<>(wavList, headers);

        // RestTemplate을 사용하여 플라스크 서버에 POST 요청을 보낸다
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(flaskLearningUrl, requestEntity, String.class);

        // 응답 출력
        System.out.println("Response from Flask server: " + responseEntity.getBody());
    }

    private static void addToZip(ZipOutputStream zipOutputStream, File file) throws IOException {
        ZipEntry zipEntry = new ZipEntry(file.getName());
        zipOutputStream.putNextEntry(zipEntry);

        try (FileInputStream fileInputStream = new FileInputStream(file)) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = fileInputStream.read(buffer)) > 0) {
                zipOutputStream.write(buffer, 0, bytesRead);
            }
        }

        zipOutputStream.closeEntry();
    }

    // 플라스크로부터 모델 학습 결과 받아오기 - glowtts => 추후 이미 존재 여부에 따라 다시 조건 나누기 ************************
    @PostMapping("/glow")
    public String getGlowRes(@RequestParam("file") MultipartFile file) {
        String uploadPath = "C:\\tts-server\\models\\glowtts-v2\\";

        try {
            // 임시 폴더에 zip 파일 저장
            File zipFile = File.createTempFile("received_zip", ".zip");
            file.transferTo(zipFile);

            // 압축 해제할 폴더 설정
            File extractFolder = new File(uploadPath);

            // ZipInputStream을 사용하여 압축 해제
            try (ZipInputStream zipInputStream = new ZipInputStream(FileUtils.openInputStream(zipFile))) {
                ZipEntry entry;
                while ((entry = zipInputStream.getNextEntry()) != null) {
                    // 압축 해제할 파일 경로 설정
                    File entryFile = new File(uploadPath, entry.getName());

                    // 디렉터리인 경우 생성
                    if (entry.isDirectory()) {
                        entryFile.mkdirs();
                    } else {
                        // 파일인 경우 복사
                        FileUtils.copyInputStreamToFile(zipInputStream, entryFile);
                    }

                    zipInputStream.closeEntry();
                }
            }

            // 압축 해제 후 원본 파일 및 폴더 삭제
            zipFile.delete();
            FileUtils.deleteDirectory(extractFolder);

            return "File uploaded and extracted successfully.";
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to process the file.";
        }
    }

    // hifi-gan
    @PostMapping("/gan")
    public String getGanRes(@RequestParam("file") MultipartFile file) {
        String uploadPath = "C:\\tts-server\\models\\hifigan-v2\\";

        try {
            // 임시 폴더에 zip 파일 저장
            File zipFile = File.createTempFile("received_zip", ".zip");
            file.transferTo(zipFile);

            // 압축 해제할 폴더 설정
            File extractFolder = new File(uploadPath);

            // ZipInputStream을 사용하여 압축 해제
            try (ZipInputStream zipInputStream = new ZipInputStream(FileUtils.openInputStream(zipFile))) {
                ZipEntry entry;
                while ((entry = zipInputStream.getNextEntry()) != null) {
                    // 압축 해제할 파일 경로 설정
                    File entryFile = new File(uploadPath, entry.getName());

                    // 디렉터리인 경우 생성
                    if (entry.isDirectory()) {
                        entryFile.mkdirs();
                    } else {
                        // 파일인 경우 복사
                        FileUtils.copyInputStreamToFile(zipInputStream, entryFile);
                    }

                    zipInputStream.closeEntry();
                }
            }

            // 압축 해제 후 원본 파일 및 폴더 삭제
            zipFile.delete();
            FileUtils.deleteDirectory(extractFolder);

            return "File uploaded and extracted successfully.";
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to process the file.";
        }
    }

//    private Optional<File> convert(MultipartFile file) throws IOException { // 파일화
//        File convertFile = new File(file.getOriginalFilename());
//        file.transferTo(convertFile);
//        return Optional.of(convertFile);
//    }
//
//    private void removeFile(File targetFile) { // 로컬파일 삭제
//        if (targetFile.exists()) {
//            if (targetFile.delete()) {
//                System.out.println("파일이 삭제되었습니다.");
//            } else {
//                System.out.println("파일이 삭제되지 못했습니다.");
//            }
//        }
//    }
//
//    private String putS3(File uploadFile, String fileName) { // S3로 업로드
//        amazonS3.putObject(bucket, fileName, uploadFile);
//        return amazonS3.getUrl(bucket, fileName).toString();
//    }

}
