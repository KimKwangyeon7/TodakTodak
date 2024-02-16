package com.ssafy.todak.notification.common;

import com.ssafy.todak.member.common.MemberLoader;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

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

    private final MemberLoader memberLoader;


    // 음성으로 변환할 텍스트 받아서 tts 서버로 보내주기 + tts 서버에서 보낸 음성 파일 저장
    public void inferGlowttsAndSave(String text, String alarmDateTime) {
        int memberId = memberLoader.getId();
        //int memberId = 1;
        // tts 서버 배치 파일 실행
        executeBatchFile();

        // 20초 대기
        try {
            Thread.sleep(20000); // 20초를 밀리초로 변환
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // 오디오 파일을 받아오기
        ResponseEntity<byte[]> audioResponseEntity = inferGlowtts(text);

        // 현재 시간 문자열로 저장
        //String currentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));

        // 파일 이름 생성 (예: member_id_20220101_123456.wav)
        String fileName = String.format("%s_%s.wav", memberId, alarmDateTime);

        // 저장할 경로와 파일 이름 합치기
        String filePath = Paths.get("C:\\tts-server\\save\\", fileName).toString();

        // 오디오 파일을 로컬에 저장하기
        saveAudioLocally(audioResponseEntity, filePath);
    }

    // 배치 파일 실행시키기
    private static void executeBatchFile() {
        try {
            // 배치 파일 실행
            String absolutePath = "C:\\tts-server\\run-server.bat";
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
    public ResponseEntity<byte[]> inferGlowtts(String text) {
        // Flask 서버의 엔드포인트 URL
        String flaskInferGlowttsUrl = flaskServerUrl + "tts-server/api/infer-glowtts";

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

    //    @GetMapping("/api/index")
//    public ModelAndView index() {
//        // Flask 서버의 "/" 엔드포인트로 요청을 보내기
//        RestTemplate restTemplate = new RestTemplate();
//        String response = restTemplate.getForObject(flaskServerUrl + "/", String.class);
//
//        // 받은 응답을 ModelAndView에 담아서 반환
//        ModelAndView modelAndView = new ModelAndView("index");
//        modelAndView.addObject("flaskResponse", response);
//        return modelAndView;
//    }
//
//    @GetMapping("/text-inference")
//    public String textInferencePage(Model model) {
//        // Flask 서버의 엔드포인트 URL
//        String flaskTextInferenceUrl = flaskServerUrl + "/text-inference";
//
//        // RestTemplate을 사용하여 Flask 서버에 GET 요청 보내기
//        RestTemplate restTemplate = new RestTemplate();
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.TEXT_HTML);
//
//        ResponseEntity<String> responseEntity = restTemplate.exchange(
//                flaskTextInferenceUrl,
//                HttpMethod.GET,
//                null,
//                String.class
//        );
//
//        // Flask 서버에서 받은 HTML을 모델에 추가하여 렌더링
//        model.addAttribute("flaskResponse", responseEntity.getBody());
//        return "text-inference";
//    }
//
//    @GetMapping("/cc-overlay")
//    public String openCaptionsOverlay(Model model) {
//        // Flask 서버의 엔드포인트 URL
//        String flaskCcOverlayUrl = flaskServerUrl + "/cc-overlay";
//
//        // RestTemplate을 사용하여 Flask 서버에 GET 요청 보내기
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<String> responseEntity = restTemplate.getForEntity(flaskCcOverlayUrl, String.class);
//
//        // Flask 서버에서 받은 HTML을 모델에 추가하여 렌더링
//        model.addAttribute("flaskResponse", responseEntity.getBody());
//        return "cc-overlay";
//    }
//
//    // 텍스트 json 파일로 변환
//    @PostMapping("/api/process-text")
//    public ResponseEntity<String[]> processText(@RequestBody String text) {
//        // Flask 서버의 엔드포인트 URL
//        String flaskProcessTextUrl = flaskServerUrl + "/api/process-text";
//
//        // RestTemplate을 사용하여 Flask 서버에 POST 요청 보내기
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<String[]> responseEntity = restTemplate.postForEntity(
//                flaskProcessTextUrl,
//                text,
//                String[].class
//        );
//
//        // Flask 서버에서 받은 JSON을 ResponseEntity로 반환
//        return ResponseEntity.ok(responseEntity.getBody());
//    }

}
