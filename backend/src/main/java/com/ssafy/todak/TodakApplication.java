package com.ssafy.todak;


import jakarta.annotation.PostConstruct;
import org.springframework.boot.DefaultPropertiesPropertySource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.parser.audio.AudioParser;
import org.apache.tika.sax.BodyContentHandler;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.TimeZone;

@SpringBootApplication
@EnableJpaAuditing // BaseEntity클래스의 AuditingEntityListener를 활성화
@EnableScheduling //스케줄링
public class TodakApplication {

    public static void main(String[] args) {
        SpringApplication.run(TodakApplication.class, args);
//
//
//        try {
//            File file = new File("C:\\mimic-recording-studio\\audio_files\\2_5\\2_5_20240209_091207.wav");
//
//            // Tika parser를 사용하여 WAV 파일의 메타데이터를 추출합니다.
//            BodyContentHandler handler = new BodyContentHandler();
//            Metadata metadata = new Metadata();
//            InputStream stream = new FileInputStream(file);
//            ParseContext context = new ParseContext();
//
//            AudioParser audioParser = new AudioParser();
//            audioParser.parse(stream, handler, metadata, context);
//
//            // 모든 메타데이터를 출력합니다.
//            String[] metadataNames = metadata.names();
//            for (String name : metadataNames) {
//                System.out.println(name + ": " + metadata.get(name));
//            }
//
//            // 스트림을 닫습니다.
//            stream.close();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }

    }

    @PostConstruct
    public void init() {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul")); // 한국은 "Asia/Seoul"
    }

}
