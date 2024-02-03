package com.ssafy.todak.record.service;

import com.ssafy.todak.member.common.MemberLoader;
import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.member.repository.MemberRepository;
import com.ssafy.todak.record.domain.Record;
import com.ssafy.todak.record.dto.RecordCreateRequestDto;
import com.ssafy.todak.record.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecordService {
    private final RecordRepository recordRepository;
    private final MemberRepository memberRepository;
    private final MemberLoader memberLoader;
    private static final String promptPath = "src\\main\\resources\\prompts\\korean_corpus.csv";
    public void createRecord(RecordCreateRequestDto recordCreateInfo) {
        Record record = Record.builder()
                .name(recordCreateInfo.getName())
                .memo(recordCreateInfo.getMemo())
                .member(memberLoader.getMember())
                .build();

        recordRepository.save(record);
        Member member = memberRepository.findById(memberLoader.getId()).get();
        member.getRecordList().add(record);
        memberRepository.save(member);
    }

    public Record modifyRecord(int recordId, RecordCreateRequestDto recordCreateInfo) {
        Record record = recordRepository.findById(recordId).get();
        record.setName(recordCreateInfo.getName());
        record.setMemo(recordCreateInfo.getMemo());

        recordRepository.save(record);
        return record;
    }

    public void deleteRecord(int recordId) {
        recordRepository.deleteById(recordId);
    }

    public void isRecordUsed(int recordId) {
        List<Record> list = recordRepository.findByMember(memberLoader.getMember());
        for (int i = 0; i < list.size(); i++){
            if (list.get(i).getId() == recordId){
                recordRepository.findById(recordId).get().setUsed(true);
            } else {
                recordRepository.findById(list.get(i).getId()).get().setUsed(false);
            }
        }
    }

    // 새 폴더 만들기
    public void createFolderIfNotExists(String folderPath) {
        try {
            Path path = Paths.get(folderPath);

            // 폴더가 존재하지 않으면 생성
            if (!Files.exists(path)) {
                Files.createDirectories(path);
                System.out.println("폴더가 생성되었습니다: " + folderPath);
            } else {
                System.out.println("폴더가 이미 존재합니다: " + folderPath);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getNextPrompt(int promptNum) throws IOException {
        // CSV 파일에서 promptNum에 맞는 데이터 가져오기
        List<String> prompts = Files.readAllLines(Path.of(promptPath));

        if (promptNum >= 0 && promptNum < prompts.size()) {
            return prompts.get(promptNum);
        } else {
            // 예외를 던지거나 기본값을 반환하도록 프로젝트의 요구에 맞게 처리할 수 있습니다.
            throw new IllegalArgumentException("Invalid prompt number: " + promptNum);
        }
    }

    public void saveAudioLocally(ResponseEntity<byte[]> audioResponseEntity, String filePath) {
        try (FileOutputStream fos = new FileOutputStream(filePath)) {
            // ResponseEntity에서 오디오 바이트 배열 가져오기
            byte[] audioBytes = audioResponseEntity.getBody();

            // 파일에 쓰기
            fos.write(audioBytes);

            System.out.println("Audio saved locally at: " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
