package com.ssafy.todak.chat.controller;

import com.ssafy.todak.chat.dto.request.MessageRequestDto;
import com.ssafy.todak.chat.service.ChatRoomService;
import com.ssafy.todak.chat.service.ChatService;
import com.ssafy.todak.chat.service.EnterChatRoomService;
import com.ssafy.todak.fcm.FCMTokenManager;
import com.ssafy.todak.member.util.JwtTokenUtil;
import com.ssafy.todak.notification.dto.FCMNotificationRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
public class ChatMessageController {

    private final JwtTokenUtil jwtTokenUtil;
    private final ChatService chatService;
    private final EnterChatRoomService enterChatRoomService;

    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    @MessageMapping("/chat/message")
    public void sendMessage(MessageRequestDto message, @Header("Authorization") String token) {
        enterChatRoomService.enterMessageRoom(message.getChatRoomId());

        String nickname = jwtTokenUtil.extractNickname(token);

        // 로그인 회원 정보로 대화명 설정
        message.setSender(nickname);

        // Websocket에 발행된 메시지를 redis로 발행(publish)
        chatService.sendChatMessage(message);

        // DB & Redis 에 대화 저장
        chatService.saveMessage(message, nickname);
    }

//    @MessageMapping("/chat/message")
//    public void sendMessage(FCMNotificationRequestDto notificationRequestDto, @Header("Authorization") String token) {
//
////        enterChatRoomService.enterMessageRoom(message.getChatRoomId());
//
//        String nickname = jwtTokenUtil.extractNickname(token);
//
//        // 로그인 회원 정보로 대화명 설정
//        message.setSender(nickname);
//
//        // Websocket에 발행된 메시지를 redis로 발행(publish)
//        chatService.sendChatMessage(message);
//
//        // 푸시 알림 보내기
//        chatService.sendPushNotification(message.getChatRoomId(), "새로운 메시지가 도착했습니다.");
//
//
//        // DB & Redis 에 대화 저장
//        chatService.saveMessage(message, nickname);
//    }


    // 대화 내역 조회
    @GetMapping("/chat/rooms/{chatRoomId}/message")
    public ResponseEntity<List<MessageRequestDto>> loadMessage(@PathVariable String chatRoomId) {
        return ResponseEntity.ok(chatService.loadMessage(chatRoomId));
    }
}