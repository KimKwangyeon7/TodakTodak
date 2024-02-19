package com.ssafy.todak.fcm;

import com.google.firebase.messaging.*;
import com.ssafy.todak.exception.CustomException;
import com.ssafy.todak.exception.ErrorCode;
import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
@Log4j2
public class FCMService {
    private final FirebaseMessaging firebaseMessaging;
    private final MemberRepository memberRepository;

    public void sendMessage(FCMRequestDto requestDto) {
        log.info("FCMService sendMessage");
        Member member = memberRepository.findById(requestDto.getMemberId()).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );
        // setToken 혹은 setTopic을 이용해 메세지의 타겟을 결정
        Message message = Message.builder()
                .setToken(member.getFirebaseToken())
                .setWebpushConfig(
                        WebpushConfig.builder()
                                .putHeader("HeaderKey", "HeaderValue")
                                .setNotification(new WebpushNotification(requestDto.getTitle(), requestDto.getBody()))
                                .build()
                )
                .build();
        try {
            String messageResponse = FirebaseMessaging.getInstance().sendAsync(message).get();
            log.info("Sent Message: {}", messageResponse);
        } catch (ExecutionException | InterruptedException e) {
            throw new IllegalStateException("알림 전송에 실패하였습니다.");
        }
    }


//    public String sendNotificationByToken(FCMRequestDto requestDto) {
//        Member member = memberRepository.findById(requestDto.getMemberId()).orElseThrow(
//                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
//        );
//
//        if (member.getFirebaseToken() != null) {
//            Message message = Message.builder()
//                    .setToken(member.getFirebaseToken())
//                    .setWebpushConfig(
//                            WebpushConfig.builder()
//                                    .putHeader("HeaderKey", "HeaderValue")
//                                    .setNotification(new WebpushNotification(requestDto.getTitle(), requestDto.getBody()))
//                                    .build()
//                    )
//                    .build();
//        } else {
//            return "해당 유저에 저장된 FCM Token이 없습니다. memberId: " + requestDto.getMemberId();
//        }
//        return
//    }
}
