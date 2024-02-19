package com.ssafy.todak.notification.service;


import com.ssafy.todak.chat.service.ChatService;
import com.ssafy.todak.fcm.FCMTokenManager;
import com.ssafy.todak.goal.repository.AlarmRepository;
import com.ssafy.todak.goal.repository.HabitRepository;
import com.ssafy.todak.goal.repository.TodoRepository;
import com.ssafy.todak.member.common.MemberLoader;
import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.member.repository.MemberRepository;
import com.ssafy.todak.notification.domain.Message;
import com.ssafy.todak.notification.domain.Notification;
import com.ssafy.todak.notification.dto.FCMNotificationRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final MemberRepository memberRepository;
    private final FCMTokenManager fcmTokenManager;
    private final ChatService chatService;

    public  String sendNotificationByToken(FCMNotificationRequestDto requestDto){
        Optional<Member> member = memberRepository.findById(requestDto.getReceiveId());

        if (member.isPresent()){
            if (fcmTokenManager.getToken("FCM:" + member.get().getId()) != null){
                Notification notification = Notification.builder()
                        .title(requestDto.getTitle()).body(requestDto.getBody())
                        .build();

                Message message = Message.builder()
                        .FCMToken(fcmTokenManager.getToken("FCM:" + member.get().getId()))
                        .notification(notification)
                        .build();

                try {
                    chatService.sendPushNotification(message);
                    return "알람 전송 성공!" + requestDto.getReceiveId();
                } catch (Exception e){
                    e.printStackTrace();
                    return "알람 전송 실패!" + requestDto.getReceiveId();
                }
            } else { // 해당 유저가 FCM 토큰 X
                return "FCM 토큰 존재 X" + requestDto.getReceiveId();
            }
        } else { // 해당 유저가 존재 X
            return "해당 유저 존재 X" + requestDto.getReceiveId();
        }
    }
}
