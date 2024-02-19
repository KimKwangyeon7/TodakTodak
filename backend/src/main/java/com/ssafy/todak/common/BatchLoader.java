package com.ssafy.todak.common;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Component;

import java.io.*;

@Component
public class BatchLoader {
    public String editBatchFile(String folderName) {
        // 배치 파일 내용을 원하는 대로 수정
        // 예: 특정 문자열 치환
        String newContent = "@echo off\n" +
                "setlocal\n" +
                "chcp 65001\n" +
                "cd /D \"%~dp0\"\n" +
                "SET PATH=%PATH%;%~dp0ffmpeg\n" +
                "ljs-converter.exe " + folderName + "\n" +
                "endlocal\n" +
                "pause";

        return newContent;
    }

    public String editTTS(String jsonG, String tarG, String jsonH, String tarH) {
        String newContent = "@echo off\n" +
                "setlocal\n" +
                "chcp 65001\n" +
                "cd /D \"%~dp0\"\n" +
                "set MECAB_KO_DIC_PATH=.\\" +
                "mecab\\mecab-ko-dic -r .\\" +
                "mecab\\mecabrc\n" +
                "set TTS_MODEL_FILE=C:\\Users\\SSAFY\\Desktop\\S10P12C210\\src\\main\\resources\\tts-server\\models\\glowtts-v2\\" + tarG + "\n" +
                "set TTS_MODEL_CONFIG=C:\\Users\\SSAFY\\Desktop\\S10P12C210\\src\\main\\resources\\tts-server\\models\\glowtts-v2\\" + jsonG + "\n" +
                "set VOCODER_MODEL_FILE=C:\\Users\\SSAFY\\Desktop\\S10P12C210\\src\\main\\resources\\tts-server\\models\\hifigan-v2\\" + tarH + "\n" +
                "set VOCODER_MODEL_CONFIG=C:\\Users\\SSAFY\\Desktop\\S10P12C210\\src\\main\\resources\\tts-server\\models\\hifigan-v2\\" + jsonH + "\n" +
                "@REM set VOCODER_MODEL_ONNX=C:\\Users\\SSAFY\\Desktop\\S10P12C210\\src\\main\\resources\\tts-server\\models\\hifigan-v2\\hifigan.onnx\n" +
                "start \"\" /B server.exe\r\n" +
                "timeout /t 40 /nobreak >nul\r\n" +
                "taskkill /F /IM server.exe >nul\r\n" +
                "exit";
        return newContent;
    }




    public void writeBatchFile(String batchFilePath, String content) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(batchFilePath))) {
            writer.write(content);
        }
    }

    public void writeTTS(String batchFilePath, String content) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(batchFilePath))) {
            writer.write(content);
        }
    }


    public void editAndWriteConfig(String configPath, String npyPath) throws IOException {
        // JSON 파일 경로
        String filePath = configPath;

        // JSON 파일을 읽고 ObjectMapper를 사용하여 JSON 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode rootNode = (ObjectNode) objectMapper.readTree(new File(filePath));

        // "stats_path" 키를 찾아서 값을 변경
        JsonNode statsPathNode = rootNode.path("audio").path("stats_path");
        if (!statsPathNode.isMissingNode()) {
            // "stats_path"의 값을 변경
            ((ObjectNode) rootNode.path("audio")).put("stats_path", "C:\\Users\\SSAFY\\Desktop\\S10P12C210\\" + npyPath);
        }

        // 변경된 JSON 객체를 문자열로 변환
        String updatedJson = objectMapper.writeValueAsString(rootNode);
        System.out.println(updatedJson); // 변경된 JSON 출력

        // 변경된 JSON을 파일에 씀
        objectMapper.writeValue(new File(filePath), rootNode);
    }

}
