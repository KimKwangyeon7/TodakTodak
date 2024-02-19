package com.ssafy.todak.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import jakarta.annotation.PostConstruct;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.List;

import static com.google.api.ResourceProto.resource;

@Configuration
@Log4j2
public class FCMConfig {

    @Value("${fcm.certification}")
    private String firebaseConfigPath;

    @Value("${fcm.scope}")
    private String scope;

    /**
     * FCM 초기화
     * 어플리케이션 시작 시 한번만 실행된다.
     * @PostConstruct 의존성 주입이 이루어진 후 초기화메서드를 수행하기 위한 어노테이션.
     *                호출을 따로 해주지 않더라도 어플리케이션 시작 시 한번만 실행하도록 보장된다. 파라미터가 존재하면 안된다.
     * setCredentials()에서 키를 이용해 인증한다.
     * GoogleCredentials : OAuth2를 이용해 GoogleApi 호출을 승인하기 위한 객체
     */

    @Bean
    FirebaseMessaging firebaseMessaging() throws IOException {
        ClassPathResource serviceAccount = new ClassPathResource(firebaseConfigPath);
        FirebaseApp firebaseApp = null;
        List<FirebaseApp> firebaseAppList = FirebaseApp.getApps();

        if (firebaseAppList != null && !firebaseAppList.isEmpty()) {
            for (FirebaseApp app : firebaseAppList) {
                if (app.getName().equals(FirebaseApp.DEFAULT_APP_NAME)) {
                    firebaseApp = app;
                }
            }
        }
        else {
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount.getInputStream())
                            .createScoped(Collections.singleton(scope)))
                    .build();
            firebaseApp = FirebaseApp.initializeApp(options);
        }
        return FirebaseMessaging.getInstance(firebaseApp);
    }
//    @PostConstruct
//    public void firebaseInit() throws IOException {
//        ClassPathResource serviceAccount = new ClassPathResource(firebaseConfigPath);
//
//        FirebaseOptions options = FirebaseOptions.builder()
//                .setCredentials(GoogleCredentials.fromStream(serviceAccount.getInputStream())
//                        .createScoped(Collections.singleton(scope)))
//                .build();
//
//        if (FirebaseApp.getApps().isEmpty()) {
//            FirebaseApp.initializeApp(options);
//            log.info("Firebase init start");
//        }
//    }

}
