package com.ssafy.todak.learning.controller;

import com.ssafy.todak.learning.service.TtsService;
import com.ssafy.todak.member.common.MemberLoader;
import com.ssafy.todak.member.domain.RefreshToken;
import com.ssafy.todak.member.repository.RefreshTokenRepository;
import com.ssafy.todak.member.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveInputStream;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import org.apache.commons.compress.compressors.gzip.GzipCompressorInputStream;
import org.apache.commons.compress.compressors.gzip.GzipCompressorOutputStream;
import org.springframework.web.multipart.MultipartFile;

import java.util.zip.GZIPInputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;


@Controller
@RequestMapping("/learning")
@RequiredArgsConstructor
public class LearningController {

    @Value("${flask2.server.url}")
    private String flaskServerUrl;  // Flask 서버의 URL을 application.properties에서 읽어옵니다.

    private final JwtTokenUtil jwtTokenUtil;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberLoader memberLoader;
    //private final RestTemplate restTemplate;
    //private final TtsService ttsService;

    // 프론트로부터 학습하기 요청을 받기 + 녹음 음성 zip 파일을 플라스크로 보내주기
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

//    public static ResponseEntity<String> handleGzipFileUpload(MultipartFile file, String uploadDirectory) {
//        try {
//            Path uploadPath = Paths.get(uploadDirectory);
//
//            if (!Files.exists(uploadPath)) {
//                Files.createDirectories(uploadPath);
//            }
//
//            try (GZIPInputStream gzipInputStream = new GZIPInputStream(file.getInputStream())) {
//                // 압축 해제된 파일들의 정보를 얻어서 처리
//                Files.walkFileTree(uploadPath, new SimpleFileVisitor<Path>() {
//                    @Override
//                    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
//                        // 각 파일에 대한 정보를 얻어서 원하는 대로 처리
//                        String originalFileName = file.getFileName().toString();
//                        String newFileName = getNewFileName(originalFileName); // 원하는 로직에 따라 파일 이름을 수정
//
//                        // 수정된 파일 이름으로 저장
//                        Path newFilePath = uploadPath.resolve(newFileName);
//                        Files.copy(gzipInputStream, newFilePath, StandardCopyOption.REPLACE_EXISTING);
//
//                        return FileVisitResult.CONTINUE;
//                    }
//                });
//            }
//
//            return ResponseEntity.ok("Files uploaded successfully.");
//        } catch (IOException e) {
//            e.printStackTrace();
//            return ResponseEntity.status(500).body("Error uploading files.");
//        }
//    }
//
//    private static String getNewFileName(String originalFileName) {
//        // 원하는 로직에 따라 파일 이름을 수정하고 반환
//        // 예: 원래 파일 이름에 timestamp를 더한다.
//        long timestamp = System.currentTimeMillis();
//        return timestamp + "_" + originalFileName;
//    }

    // ------------------------------------------------------------------------------------------------------

    // 압축하기
    private static byte[] compressList(List<byte[]> dataList) throws IOException {
        // 리스트를 GZIP으로 압축
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
             GzipCompressorOutputStream gzipOut = new GzipCompressorOutputStream(baos)) {
            for (byte[] data : dataList) {
                gzipOut.write(data);
            }
            gzipOut.finish();
            return baos.toByteArray();
        }
    }

    // 압축풀기
    private static List<byte[]> decompressList(byte[] compressedData) throws IOException {
        // GZIP으로 압축 해제
        List<byte[]> dataList = new ArrayList<>();
        try (ByteArrayInputStream bais = new ByteArrayInputStream(compressedData);
             GzipCompressorInputStream gzipIn = new GzipCompressorInputStream(bais)) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = gzipIn.read(buffer)) != -1) {
                byte[] dataChunk = new byte[bytesRead];
                System.arraycopy(buffer, 0, dataChunk, 0, bytesRead);
                dataList.add(dataChunk);
            }
        }
        return dataList;
    }

}
