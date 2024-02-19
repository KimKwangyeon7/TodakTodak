package com.ssafy.todak.common;

import com.ssafy.todak.member.common.MemberLoader;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
@RequiredArgsConstructor
public class TTSLoader {

    @Value("${flask.server.url}")
    private String flaskServerUrl;  // Flask 서버의 URL을 application.properties에서 읽어옵니다.
    @Value(("{front.server.url"))
    private String frontServerUrl;

    private final MemberLoader memberLoader;

    private final String ttsServerPath = "C:\\Users\\SSAFY\\Desktop\\S10P12C210\\src\\main\\resources\\tts-server";

    // 음성으로 변환할 텍스트 받아서 tts 서버로 보내주기 + tts 서버에서 보낸 음성 파일 저장
    public void inferAndSave(String text, int memberId, String fileName) {
        //int memberId = 1;
        // tts 서버 배치 파일 실행
        executeBatchFile();

        // 20초 대기
        try {
            Thread.sleep(30000); // 20초를 밀리초로 변환
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // 오디오 파일을 받아오기
        ResponseEntity<byte[]> audioResponseEntity = inferTts(text);

        // 저장할 경로와 파일 이름 합치기
        String filePath = Paths.get(ttsServerPath + "\\save\\", fileName).toString();

        // 오디오 파일을 로컬에 저장하기
        saveAudioLocally(audioResponseEntity, filePath);
    }

    // 프론트로 합성된 음성 파일 보내기
    public void sendAudio(String fileName) {
        // 저장할 경로와 파일 이름 합치기
        String filePath = Paths.get(ttsServerPath + "\\save\\", fileName).toString();

        // 파일을 바이트 배열로 읽어오기
        byte[] audioBytes = readBytesFromFile(filePath);

        // api 엔드포인트 설정
        String inferUrl = frontServerUrl + "/tts/infer";

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        // 파일 데이터와 헤더를 포함한 요청 엔티티 생성
        HttpEntity<byte[]> requestEntity = new HttpEntity<>(audioBytes, headers);

        // RestTemplate을 사용하여 POST 요청 보내기
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(
                inferUrl, // 프론트엔드 엔드포인트 URL
                requestEntity,
                String.class
        );

        // 응답 확인
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            System.out.println("음성 파일을 성공적으로 프론트엔드로 전송했습니다.");
        } else {
            System.err.println("음성 파일 전송에 실패했습니다.");
        }
    }


    // 배치 파일 실행시키기
    private void executeBatchFile() {
        try {
            // 배치 파일 실행
            String absolutePath = ttsServerPath + "\\run-server.bat";
            String command = "cmd /c start /min " + absolutePath;
            Runtime.getRuntime().exec(command);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error executing batch file: " + e.getMessage());
        }
    }

    // 음성 파일 로컬에 저장하기
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


    // 텍스트를 플라스크 서버로 보내고 음성 파일 받기
    public ResponseEntity<byte[]> inferTts(String text) {
        // Flask 서버의 엔드포인트 URL
        String flaskInferGlowttsUrl = flaskServerUrl + "/tts-server/api/infer-glowtts";

        // RestTemplate을 사용하여 Flask 서버에 GET 요청 보내기
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<byte[]> responseEntity = restTemplate.getForEntity(
                flaskInferGlowttsUrl + "?text={text}",
                byte[].class,
                text
        );

        // Flask 서버에서 받은 음성 파일 데이터를 ResponseEntity로 반환
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(responseEntity.getBody());
    }

    // 파일을 바이트 배열로 읽어오는 메서드
    private byte[] readBytesFromFile(String filePath) {
        File file = new File(filePath);
        byte[] fileBytes = new byte[(int) file.length()];
        try (FileInputStream inputStream = new FileInputStream(file)) {
            inputStream.read(fileBytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return fileBytes;
    }
}
