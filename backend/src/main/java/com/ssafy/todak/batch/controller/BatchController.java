package com.ssafy.todak.batch;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;

@Controller
@RequiredArgsConstructor
public class BatchController {

    @PostMapping("/tts/infer")
    public ResponseEntity<byte[]> convertAudioFile() {
        // 소스 폴더 내의 첫 번째 파일을 찾음
        File sourceFolder = new File("home/ubuntu/S10P12C210/src/main/resources/tts-server/wait");
        File[] files = sourceFolder.listFiles();

        if (files != null && files.length > 0) {
            File firstFile = files[0];

            try {
                // 음성 파일을 바이트 배열로 변환하여 응답
                FileInputStream fileInputStream = new FileInputStream(firstFile);
                byte[] audioBytes = Files.readAllBytes(firstFile.toPath());
                fileInputStream.close();

                // 대상 폴더로 파일 이동 (Optional)
                // firstFile.renameTo(new File(destinationFolderPath + File.separator + firstFile.getName()));

                // 음성 파일의 바이트 배열 반환
                return ResponseEntity.ok().body(audioBytes);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        } else {
            // 폴더에 파일이 없는 경우
            return ResponseEntity.notFound().build();
        }
    }

}
