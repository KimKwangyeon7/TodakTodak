package com.ssafy.todak.record.controller;

import com.ssafy.todak.common.BatchLoader;
import com.ssafy.todak.member.common.MemberLoader;
import com.ssafy.todak.member.repository.MemberRepository;
import com.ssafy.todak.record.RecordManager;
import com.ssafy.todak.record.domain.Record;
import com.ssafy.todak.record.dto.RecordCreateRequestDto;
import com.ssafy.todak.record.dto.RecordResponseDto;
import com.ssafy.todak.record.repository.RecordRepository;
import com.ssafy.todak.record.service.RecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping ("/records")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;
    private final RecordManager recordManager;
    private final MemberLoader memberLoader;
    private final MemberRepository memberRepository;
    private final RecordRepository recordRepository;
    private final BatchLoader batchLoader;
    private static final String ttsServerPath = "home\\ubuntu\\S10P12C210\\src\\main\\resources\\tts-server";
    private static final String recordingPath = "home\\ubuntu\\S10P12C210\\src\\main\\resources\\mimic-recording-studio";


    // 새로운 음성 만들기
    @PostMapping("")
    public ResponseEntity<Integer> createVoice(@RequestBody RecordCreateRequestDto recordCreateInfo){
        int recordId = recordService.createRecord(recordCreateInfo);

        return ResponseEntity.ok(recordId);
    }


    // 음성 메뉴 누르면 해당 유저의 AI 음성 리스트 반환
    @GetMapping("")
    public ResponseEntity<List<RecordResponseDto>> getVoiceList(){
        // 알람 동의 여부 확인 -> 비동의 했으면 거부
//        if (!memberRepository.findById(memberId).get().isAlarmAgreed()){
//            return ResponseEntity.ok(null);
//        }
        // 해당 유저의 record 리스트 가져오기 => 기본 음성들은 추후 **************
        List<Record> records = recordRepository.findByMember(memberLoader.getMember());
        List<RecordResponseDto> list = new ArrayList<>();
        if (records == null){
            return ResponseEntity.ok(null);
        }
        for (int i = 0; i < records.size(); i++){
            list.add(new RecordResponseDto(records.get(i)));
        }
        return ResponseEntity.ok(list);
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
        int memberId = memberLoader.getId();
        recordService.deleteRecord(recordId);
        recordManager.deleteRecord("prompt:" + memberId + "_" + recordId);
        recordManager.deleteRecord("time:" + memberId + "_" + recordId);

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
    @PatchMapping("/use/{recordId}")
    public ResponseEntity<List<RecordResponseDto>> isRecordUsed(@PathVariable int recordId) {
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
    @GetMapping("{recordId}/prompt")
    public ResponseEntity<Map<String, Integer>> getUser(@PathVariable int recordId) throws IOException {
        int promptNum = 0;
        int time = 0;
        Map<String, Integer> map = new HashMap<>();
        int memberId = memberLoader.getId();
        // 폴더를 생성할 경로 설정
        //String currentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        String folderName = memberId + "_" + recordId;

        // 파일 이름 설정
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));

        String fileName = String.format("%s_%s_%s.wav", memberLoader.getId(), recordId, now.format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")));

        String filePath = Paths.get(recordingPath +"\\audio_files\\" + folderName + "\\", fileName).toString();
        String folderPath = "home\\ubuntu\\S10P12C210\\src\\main\\resources\\mimic-recording-studio\\" + folderName;

        // ********************** 배치 파일 편집하기 (경로) ***********************
//        String batchFilePath = recordingPath + "\\run-ljs-converter.bat";
//
//        String newContent = batchLoader.editBatchFile(folderName);
//        batchLoader.writeBatchFile(batchFilePath, newContent);

        // redis에 저장할 때의 키
        String key = "prompt:" + folderName;
        String key2 = "time:" + folderName;

        // 폴더를 생성
        int a = recordService.createFolderIfNotExists(folderPath);
        if (a == -1){
            // 이미 녹음한 적이 있으면 그 전 기록 가져와서 반환
            promptNum = Integer.parseInt(recordManager.getRecord(key));
            time = Integer.parseInt(recordManager.getRecord(key2));
            map.put("prompt", promptNum+1);
            map.put("time", time);
            return ResponseEntity.ok(map);
        } else {
            // 처음 녹음한 유저는 레디스에 저장
            recordManager.saveRecord(key, "0");
            recordManager.saveRecord(key2, "0");
            map.put("prompt", 1);
            map.put("time", 0);
            return ResponseEntity.ok(map);
        }

    }
    // stop 버튼 누르면 녹음 파일 받아서 로컬에 저장
    @PostMapping("{recordId}/save/audio")
    public ResponseEntity<String> saveAudio(@PathVariable int recordId, @RequestBody byte[] audio) throws IOException {
        int memberId = memberLoader.getId();

        // 파일 이름 설정
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        String fileName = String.format("%s_%s_%s.wav", memberLoader.getId(), recordId, now.format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")));

        // 폴더 이름
        String folderName = memberId + "_" + recordId;

        // 저장할 경로와 파일 이름 합치기 *************************************************************** 잠시 수정
        String filePath = Paths.get(recordingPath +"\\audio_files\\" + folderName + "\\", fileName).toString();
        //String filePath = Paths.get("src\\main\\resources\\audio_files\\" + folderName + "\\", fileName).toString();

        // 오디오 파일을 저장하기
        recordService.saveAudioLocally(audio, filePath);

        return ResponseEntity.ok("저장 성공!");
    }


    // 녹음 완료 버튼 누르면(또는 녹음화면에서 나가기) 사용자 프롬프트 기록과 녹음 길이 받아서 레디스에 저장 + 음성 목록 반환
    @PostMapping("{recordId}/save/member")
    public ResponseEntity<List<RecordResponseDto>> saveRecord(@PathVariable int recordId, @RequestParam int promptNum, @RequestParam int time) {
        recordManager.saveRecord("prompt:" + memberLoader.getId() + "_" + recordId, String.valueOf(promptNum));
        recordManager.saveRecord("time:" + memberLoader.getId() + "_" + recordId, String.valueOf(time));

        // 저장 후 모든 녹음 리스트 반환
        List<Record> list = recordRepository.findByMember(memberRepository.findById(memberLoader.getId()).get());
        List<RecordResponseDto> recordList = new ArrayList<>();
        for (int i = 0; i < list.size(); i++){
            RecordResponseDto dto = new RecordResponseDto(list.get(i));
            recordList.add(dto);
        }
        return ResponseEntity.ok(recordList);
    }
}
