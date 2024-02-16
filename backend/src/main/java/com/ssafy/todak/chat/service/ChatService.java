package com.ssafy.todak.chat.service;

import com.ssafy.todak.chat.domain.ChatRoom;
import com.ssafy.todak.chat.dto.request.CreateRoomRequestDto;
import com.ssafy.todak.chat.dto.response.ChatRoomResponseDto;
import com.ssafy.todak.member.domain.Member;

import java.util.List;

public interface ChatService {

    //채팅방 목록 조회
    List<ChatRoom> getChatRoonList(int memberId);

    //채팅방 가져오기
    ChatRoomResponseDto getChatRoom(int roomId);

    //채팅방 생성
    int createChatRoom(Member sender, CreateRoomRequestDto chatRoomRequestDto);

    //채팅방 나가기

    //채팅방 삭제
    void deleteChatRoom(int roomId);

    //채팅 보내기

    //채팅 알람


}
