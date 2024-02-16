package com.ssafy.todak.chat.controller;

import com.ssafy.todak.chat.domain.ChatRoom;
import com.ssafy.todak.chat.dto.request.CreateRoomRequestDto;
import com.ssafy.todak.chat.dto.response.ChatRoomResponseDto;
import com.ssafy.todak.chat.repository.ChatRoomRepository;
import com.ssafy.todak.chat.service.ChatService;
import com.ssafy.todak.friend.dto.request.FriendRequestDto;
import com.ssafy.todak.goal.dto.request.GoalCreateRequestDto;
import com.ssafy.todak.member.common.MemberLoader;
import com.ssafy.todak.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.C;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

@Controller
@RequestMapping("/chats")
@RequiredArgsConstructor
public class ChatController {

    private final MemberLoader memberLoader;
    private final ChatService chatService;

    //채팅방 목록 조회
    @GetMapping("/rooms")
    public ResponseEntity<String> getChatRoomList(@RequestBody CreateRoomRequestDto roomRequestDto) {
        int memberId = memberLoader.getId();
        chatService.getChatRoonList(memberId);

        return ResponseEntity.status(200).body("Success");
    }

    //채팅방 가져오기
    @GetMapping("/rooms/{roomId}")
    public ResponseEntity<ChatRoomResponseDto> getChatRoom(@PathVariable int roomId) {

        return ResponseEntity.status(200).body(chatService.getChatRoom(roomId));
    }


    //채팅방 삭제
    @DeleteMapping("/rooms/{roomId}")
    public  ResponseEntity<String> deleteChatRoom(@PathVariable int roomId) {
        chatService.deleteChatRoom(roomId);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(new MediaType("applicaton", "text", StandardCharsets.UTF_8))
                .body("채팅방을 삭제했습니다.");
    }

    //채팅 보내기

    //채팅 알람
}

