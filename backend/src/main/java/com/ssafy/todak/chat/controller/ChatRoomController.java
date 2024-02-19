package com.ssafy.todak.chat.controller;

import com.ssafy.todak.chat.domain.ChatRoom;
import com.ssafy.todak.chat.dto.request.ChatRoomRequestDto;
import com.ssafy.todak.chat.dto.response.RoomResponseDto;
import com.ssafy.todak.chat.repository.ChatRoomRepository;
import com.ssafy.todak.chat.service.ChatRoomService;
import com.ssafy.todak.member.common.MemberLoader;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatRoomController {

    private final MemberLoader memberLoader;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomService roomService;

    // 쪽지방 생성
    @PostMapping("/rooms")
    public ResponseEntity<RoomResponseDto> createRoom(@RequestBody ChatRoomRequestDto chatRoomRequestDto) {
        RoomResponseDto room = roomService.createRoom(chatRoomRequestDto, memberLoader.getMember());
        return ResponseEntity.status(HttpStatus.OK).body(room);
    }

    // 사용자 관련 쪽지방 전체 조회
    @GetMapping("/rooms")
    public ResponseEntity<List<RoomResponseDto>> findAllRoomByUser() {
        System.out.println(memberLoader.getNickname());
        List<RoomResponseDto> chatRooms = roomService.findAllRoomByUser(memberLoader.getMember());

        return ResponseEntity.status(HttpStatus.OK).body(chatRooms);
    }

    // 사용자 관련 쪽지방 선택 조회
    @GetMapping("/rooms/{chatRoomId}")
    public ChatRoom findRoom(@PathVariable String chatRoomId) {
        return chatRoomRepository.findByChatRoomId(chatRoomId);
    }


    // 쪽지방 삭제
//    @DeleteMapping("/rooms/{roomId}")
//    public ResponseEntity<String> deleteRoom(@PathVariable int roomId) {
//        String result = chatRoomService.deleteChatRoom(roomId, memberLoader.getMember());
//        return ResponseEntity.status(HttpStatus.OK)
//                .contentType(new MediaType("applicaton", "text", StandardCharsets.UTF_8))
//                .body(result);
//    }

}

