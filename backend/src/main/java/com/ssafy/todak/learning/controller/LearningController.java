package com.ssafy.todak.learning.controller;

import com.ssafy.todak.common.BatchLoader;
import com.ssafy.todak.learning.service.LearningService;
import com.ssafy.todak.member.common.MemberLoader;
import com.ssafy.todak.record.RecordManager;
import com.ssafy.todak.record.repository.RecordRepository;
import com.ssafy.todak.record.service.RecordService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.io.*;



@Controller
@RequestMapping("/learning")
@RequiredArgsConstructor
public class LearningController {

    private final MemberLoader memberLoader;
    private final BatchLoader batchLoader;
    private final RecordManager recordManager;
    private final LearningService learningService;
    private final RecordService recordService;
    private final RecordRepository recordRepository;


    private static final String ttsServerPath = "home\\ubuntu\\S10P12C210\\src\\main\\resources\\tts-server";
    private static final String recordingPath = "home\\ubuntu\\S10P12C210\\src\\main\\resources\\mimic-recording-studio";

    private String[] names = new String[6];

    // 프론트로부터 학습하기 요청을 받기 + 녹음 음성 zip 파일을 S3에 저장 후 플라스크에 요청
    @PostMapping("/{recordId}")
    public ResponseEntity<String> getRecordAndSend(@PathVariable int recordId) throws IOException {
//        // 저장돼있는 녹음 파일들 가져오기
//        // 폴더 경로
        int memberId = memberLoader.getId();

        //String folderName = memberId + "_" + recordId;
        String folderName = "249fce65-3224-b071-aebb-0554e8d61145";
        String folderPath = recordingPath + "\\audio_files\\" + folderName;

//        // 배치 파일 편집하기
//        String batchFilePath = recordingPath + "\\run-ljs-converter.bat";
//        String newContent = batchLoader.editBatchFile(folderName);
//        batchLoader.writeBatchFile(batchFilePath, newContent);
//
//        batchLoader.executeBatchFile(batchFilePath);
//
//        learningService.getLoading(30000);

        // 압축할 파일 또는 폴더
        File sourceFile = new File(recordingPath + "\\filelists");

        // 생성할 zip 파일
        File zipFile = new File(recordingPath + "\\filelists.zip");

        try {
            learningService.zipFile(sourceFile, zipFile);
            //learningService.getLoading(30000);
            System.out.println("Zip 파일이 성공적으로 생성되었습니다.");
        } catch (IOException e) {
            System.err.println("Zip 파일 생성 중 오류가 발생했습니다: " + e.getMessage());
        }

        // zip 파일 S3에 저장
        String fileName = memberLoader.getId() + "_" + recordId +  "_"  + "filelists.zip";
        String S3Url = learningService.uploadZipFileToS3(zipFile, "todaktodak", fileName);
        System.out.println("저장완료");

//        String S3Url = "https://todaktodak.s3.ap-northeast-2.amazonaws.com/colab.zip";
        // 플라스크에 s3 url 전달
        learningService.connectFlask(recordId, memberId, S3Url);

        // 삭제하기
        File folder = new File(recordingPath + "\\filelists.zip");
        folder.delete();
        learningService.resetDirectory(recordingPath + "\\filelists");
        folder = new File(recordingPath + "\\filelists");
        FileUtils.deleteDirectory(folder);
        learningService.resetDirectory(recordingPath + "\\audio_files\\2_9");
        folder = new File(recordingPath + "\\audio_files\\2_9");
        FileUtils.deleteDirectory(folder);

        return ResponseEntity.ok("성공!");
    }


    // 플라스크로부터 요청을 받아서 S3에서 모델 학습 결과 zip 파일 받아오기 - glowtts => 추후 이미 존재 여부에 따라 다시 조건 나누기 ************************
    @PostMapping("{recordId}/glow")
    public ResponseEntity<String> getGlowRes(@PathVariable int recordId, @RequestParam("url") String url) throws IOException {
        System.out.println("recordId: " + recordId + " url: " + url);
        String uploadPath = ttsServerPath + "\\models\\glowtts-v2";

        // 파일들 다 삭제
        learningService.resetDirectory(uploadPath);

        // S3 URL에서 zip 파일 다운로드
        try {
            learningService.processZipFromS3(url, uploadPath);
            System.out.println("다운로드 성공!");
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("다운로드 실패!", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // 레디스에 학습 여부 및 결과 url 저장
        int memberId = recordRepository.findById(recordId).get().getMember().getId();
        String redisKey = memberId + "_" + recordId +  "_" + "glow";
        recordManager.saveRecord("learning:" + redisKey, url);

        System.out.println("레디스 저장 성공!");

        // 파일 이름 저장하기
        getGlowNames(uploadPath);


        batchLoader.writeTTS("home/ubuntu/S10P12C21/src/main/resources/tts-server/run-server.bat", batchLoader.editTTS(names[0], names[1], names[3], names[4]));

        // config 파일 편집
        System.out.println(uploadPath);
        batchLoader.editAndWriteConfig("home\\ubuntu\\S10P12C21\\src\\main\\resources\\tts-server\\models\\glowtts-v2\\" + names[0], "home\\ubuntu\\S10P12C21\\src\\main\\resources\\tts-server\\models\\glowtts-v2\\" + names[2]);

        return ResponseEntity.ok("glow 설정 완료!");
    }


    // hifi-gan
    @PostMapping("{recordId}/hifi")
    public ResponseEntity<String> getHifiRes(@PathVariable int recordId, @RequestParam String url) throws IOException {
        String uploadPath = ttsServerPath + "\\models\\hifigan-v2";

        // 파일들 다 삭제
        learningService.resetDirectory(uploadPath);

        // S3 URL에서 zip 파일 다운로드
        try {
            learningService.processZipFromS3(url, uploadPath);
            System.out.println("다운로드 성공!");
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("다운로드 실패!", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // 레디스에 학습 여부 및 결과 url 저장
        int memberId = recordRepository.findById(recordId).get().getMember().getId();
        String redisKey = memberId + "_" + recordId +  "_" + "hifi";
        recordManager.saveRecord("learning:" + redisKey, url);

        System.out.println("레디스 저장 성공!");

        // 파일 이름 저장하기
        getHifiNames(uploadPath);

        // tts 서버 편집
        batchLoader.writeTTS("home/ubuntu/S10P12C21/src/main/resources/tts-server/run-server.bat", batchLoader.editTTS(names[0], names[1], names[3], names[4]));

        // config 파일 편집
        batchLoader.editAndWriteConfig("home\\ubuntu\\S10P12C21\\src\\main\\resources\\tts-server\\models\\hifigan-v2\\" + names[3], "home\\ubuntu\\S10P12C21\\src\\main\\resources\\tts-server\\models\\hifigan-v2\\" + names[5]);

        // 해당 음성 사용 가능으로 바꾸기
        recordService.completeLearning(recordId);




        return ResponseEntity.ok("gan 설정 완료!");
    }

    private void getGlowNames(String uploadPath) {
        // 폴더 내 파일 목록 가져오기
        File folder = new File(uploadPath);
        File[] fs = folder.listFiles();
        String json = "";
        String npy = "";
        String tar = "";
        for (File f: fs){
            if (f.isFile()){
                if (f.getName().endsWith(".json")) {
                    json += f.getName();
                } else if (f.getName().endsWith(".npy")) {
                    npy += f.getName();
                } else if (f.getName().endsWith(".tar")) {
                    tar += f.getName();
                }
            }
        }
        names[0] = json;
        names[1] = tar;
        names[2] = npy;
    }

    private void getHifiNames(String uploadPath) {
        // 폴더 내 파일 목록 가져오기
        File folder = new File(uploadPath);
        File[] fs = folder.listFiles();
        String json = "";
        String npy = "";
        String tar = "";
        for (File f: fs){
            if (f.isFile()){
                if (f.getName().endsWith(".json")) {
                    json += f.getName();
                } else if (f.getName().endsWith(".npy")) {
                    npy += f.getName();
                } else if (f.getName().endsWith(".tar")) {
                    tar += f.getName();
                }
            }
        }
        names[3] = json;
        names[4] = tar;
        names[5] = npy;
    }
}
