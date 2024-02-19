package com.ssafy.todak.file.controller;

import com.ssafy.todak.file.dto.FileResultDto;
import com.ssafy.todak.file.service.FileService;
import com.ssafy.todak.member.common.MemberLoader;
import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;


@RestController
@RequestMapping("/file")
@RequiredArgsConstructor
public class FileController {

    @Value("${flask2.server.url}")
    private String flaskServerUrl;  // Flask 서버의 URL을 application.properties에서 읽어옵니다.

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${file.upload.path}") // application 의 properties 의 변수
    private String uploadPath;

    private final FileService fileService;
    private final MemberLoader memberLoader;
    private final MemberRepository memberRepository;

    // 회원가입 / 마이페이지에서 수정 시 파일 업로드, 업로드 결과 반환 => 프론트에서 저장 후 회원 등록할 때 url 같이 보내주기
    // 멤버 회원가입 요청 dto 수정필요 *********************************************
    @PostMapping("/profile")
    public ResponseEntity<FileResultDto> uploadFile(MultipartFile[] uploadFiles) {
        FileResultDto fileResultDto = new FileResultDto();
        for (MultipartFile uploadFile : uploadFiles) {
            String originalName = uploadFile.getOriginalFilename();
            assert originalName != null;
            String fileName = originalName.substring(originalName.lastIndexOf("\\") + 1)
                    .replace(".jfif", ".jpeg");

            // UUID 생성
            String uuid = UUID.randomUUID().toString();

            // S3에 업로드할 파일 이름 설정
            String s3FileName = "profile_" + "_" + uuid + "_" + fileName;

            try {
                // 임시 파일 생성
                Path tempFilePath = Paths.get(System.getProperty("java.io.tmpdir"), uploadFile.getOriginalFilename());
                uploadFile.transferTo(tempFilePath);

                // S3에 업로드한 파일의 URL 생성
                String fileUrl = fileService.uploadS3(s3FileName, uploadFile);

                // 결과 DTO에 추가
                fileResultDto = new FileResultDto(fileName, uuid, fileUrl, memberLoader.getId());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return new ResponseEntity<>(fileResultDto, HttpStatus.OK);
    }


    // 유저 프로필 보기 눌렀을 때 프로필 사진 불러오기
    @GetMapping("/profile/{memberId}")
    public ResponseEntity<String> getProfile(int memberId) {
        Member member = memberRepository.findById(memberId).get();
        return ResponseEntity.ok(member.getProfileUrl());
    }


    // 회원가입 할 때 업로드 파일 바꿀 때 기존 파일 삭제
    @PostMapping("/removeFile")
    public ResponseEntity<Boolean> removeFile(String fileName) {

        String srcFileName = URLDecoder.decode(fileName, StandardCharsets.UTF_8);

        File file = new File(uploadPath + File.separator + srcFileName);

        File thumbnail = new File(file.getParent(), "s_" + file.getName());

        boolean result = file.delete() && thumbnail.delete();

        return new ResponseEntity<>(result, HttpStatus.OK);

    }

    //    // 녹음 파일을 S3에 저장 + 레디스에도 저장
//    @PostMapping("/upload")
//    public ResponseEntity<String> uploadFile(@RequestParam MultipartFile file) throws IOException {
//        try {
//            String fileName= file.getOriginalFilename();
//
//            ObjectMetadata metadata= new ObjectMetadata();
//            metadata.setContentType(file.getContentType());
//            metadata.setContentLength(file.getSize());
//
//            amazonS3.putObject(bucket,fileName,file.getInputStream(),metadata);
//            String fileUrl= amazonS3.getUrl(bucket, fileName).toString();
//
//            // 레디스에 저장
//            fileService.addFileUrl(memberLoader.getId(), fileName, fileUrl);
//
//            return ResponseEntity.ok(fileUrl);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }

//    // 레디스에서 유저의 녹음 파일과 이름 map으로 가져오기
//    @GetMapping("/download")
//    public ResponseEntity<Map<String, String>> downloadFile() {
//        return ResponseEntity.ok(fileService.getFile());
//    }

//    // S3에서 삭제하기
//    @DeleteMapping("")
//    public ResponseEntity<String> deleteFile(@RequestParam String originalFilename)  {
//
//        amazonS3.deleteObject(bucket, originalFilename);
//        return ResponseEntity.ok("삭제됐습니다");
//    }

    // ------------------------------------------------------------------------------------------------------------

}
