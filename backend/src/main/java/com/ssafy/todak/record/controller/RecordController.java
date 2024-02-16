package com.ssafy.todak.record.controller;

import com.ssafy.todak.file.FileService;
import com.ssafy.todak.member.common.MemberLoader;
import com.ssafy.todak.member.repository.MemberRepository;
import com.ssafy.todak.record.RecordManager;
import com.ssafy.todak.record.domain.Record;
import com.ssafy.todak.record.dto.RecordCreateRequestDto;
import com.ssafy.todak.record.dto.RecordResponseDto;
import com.ssafy.todak.record.repository.RecordRepository;
import com.ssafy.todak.record.service.RecordService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItem;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping ("/record")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;
    private final RecordManager recordManager;
    private final MemberLoader memberLoader;
    private final MemberRepository memberRepository;
    private final RecordRepository recordRepository;
    private final FileService fileService;
    private static final String promptPath = "src\\main\\resources\\prompts\\korean_corpus.csv";


    // 새로운 음성 만들기
    @PostMapping("")
    public ResponseEntity<List<RecordResponseDto>> createVoice(@RequestBody RecordCreateRequestDto recordCreateInfo){
        recordService.createRecord(recordCreateInfo);
        // 저장 후 모든 녹음 리스트 반환
        List<Record> list = recordRepository.findByMember(memberRepository.findById(memberLoader.getId()).get());
        List<RecordResponseDto> recordList = new ArrayList<>();
        for (int i = 0; i < list.size(); i++){
            RecordResponseDto dto = new RecordResponseDto(list.get(i));
            recordList.add(dto);
        }
        return ResponseEntity.ok(recordList);
    }


    // 음성 메뉴 누르면 해당 유저의 AI 음성 리스트 반환
    @GetMapping("")
    public ResponseEntity<List<Record>> getVoiceList(){
        int memberId = memberLoader.getId();
        // 알람 동의 여부 확인 -> 비동의 했으면 거부
        if (!memberRepository.findById(memberId).get().isAlarmAgreed()){
            return ResponseEntity.ok(null);
        }
        // 해당 유저의 record 리스트 가져오기 => 기본 음성들은 추후 **************
        return ResponseEntity.ok(recordRepository.findByMember(memberLoader.getMember()));
    }


    // 해당 음성에 대한 상세보기
    @GetMapping("{recordId}")
    public ResponseEntity<RecordResponseDto> getVoiceDetail(@PathVariable int recordId){
        return ResponseEntity.ok(new RecordResponseDto(recordRepository.findById(recordId).get()));
    }

    // 음성 수정하기
    @PutMapping("{recordId}")
    public ResponseEntity<RecordResponseDto> modifyVoice(@PathVariable int recordId, @RequestBody RecordCreateRequestDto recordCreateInfo){
        return ResponseEntity.ok(new RecordResponseDto(recordService.modifyRecord(recordId, recordCreateInfo)));
    }

    // 음성 삭제하기
    @DeleteMapping("{recordId}")
    public ResponseEntity<List<RecordResponseDto>> deleteVoice(@PathVariable int recordId){
        recordService.deleteRecord(recordId);

        // 삭제 후 모든 녹음 리스트 반환
        List<Record> list = recordRepository.findByMember(memberRepository.findById(memberLoader.getId()).get());
        List<RecordResponseDto> recordList = new ArrayList<>();
        for (int i = 0; i < list.size(); i++){
            RecordResponseDto dto = new RecordResponseDto(list.get(i));
            recordList.add(dto);
        }
        return ResponseEntity.ok(recordList);
    }

    // 음성 선택하기
    @PutMapping("/use")
    public ResponseEntity<List<RecordResponseDto>> isRecordUsed(@RequestParam int recordId) {
        recordService.isRecordUsed(recordId);

        // 모든 리스트 반환
        List<Record> list = recordRepository.findByMember(memberRepository.findById(memberLoader.getId()).get());
        List<RecordResponseDto> recordList = new ArrayList<>();
        for (int i = 0; i < list.size(); i++){
            RecordResponseDto dto = new RecordResponseDto(list.get(i));
            recordList.add(dto);
        }
        return ResponseEntity.ok(recordList);
    }

//    // 음성이 사용 가능한지
//    @PatchMapping("/todos/{todoId}/complete")
//    public ResponseEntity<String> isRecordAvailable(@PathVariable int todoId) {
//        // Toggle the completion status of the specified TODO
//        goalService.isTodoCompleted(todoId);
//        return ResponseEntity.status(200).body("Success");
//    }

    // ---------------------------------------------------------------------------------------------------------

    // 녹음하기 화면으로 들어가면 프롬프트에 몇번째 문장 띄울지 반환해주기
    @GetMapping("/prompt/{uuid}")
    public ResponseEntity<String> getUser(@PathVariable String uuid) throws IOException {
        int promptNum = 0;
        // 폴더를 생성할 경로 설정
        String currentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        String folderPath = "C:\\tts-server\\save\\"+ uuid + currentDateTime;  // 원하는 경로로 수정

        // ********************** 배치 파일 편집하기 (경로) ***********************



        String key = "prompt:" + memberLoader.getId();

        try {
            // 폴더를 생성
            recordService.createFolderIfNotExists(folderPath);

            // 이미 녹음한 적이 있으면 그 전 기록 가져와서 반환
            promptNum = recordManager.getRecord(key);
            return ResponseEntity.ok(recordService.getNextPrompt(promptNum+1));

        } catch (Exception e) {
            e.printStackTrace(); // 실제 프로젝트에서는 로깅을 사용하는 것이 좋습니다.
            // 처음 녹음한 유저는 -1 반환
            recordManager.saveRecord(key, 0);
            return ResponseEntity.ok(recordService.getNextPrompt(1));
        }
    }


    // 녹음 완료 버튼 누르면 사용자 UUID와 프롬프트 기록 받아서 레디스에 저장
    @PostMapping("/save/member")
    public void saveRecord(@RequestParam String uuid, @RequestParam int promptNum) {
        recordManager.saveRecord("prompt:" + memberLoader.getId(), promptNum);
    }

    // 다음 프롬프트로 넘어가면 녹음 파일 받아서 로컬에 저장 후 다음 프롬프트 내용 반환
    @PostMapping("/save/audio")
    public ResponseEntity<String> saveAudio(@RequestBody ResponseEntity<byte[]> audio, @RequestParam String uuid, @RequestParam String prompt, @RequestParam int promptNum) throws IOException {
        // 로컬에 저장
        // 파일 이름 설정
        String fileName = String.format("%s_%s.wav", memberLoader.getId(), LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")));
        // 저장할 경로와 파일 이름 합치기
        String filePath = Paths.get("C:\\mimic-recording-studio\\save\\", fileName).toString();

        // 오디오 파일을 로컬에 저장하기
        recordService.saveAudioLocally(audio, filePath);

        // CSV 파일에서 promptNum에 맞는 데이터 가져오기
        return ResponseEntity.ok(recordService.getNextPrompt(promptNum));
    }



}
