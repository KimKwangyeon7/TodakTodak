package com.ssafy.todak.chat.service;

import com.ssafy.todak.chat.dto.response.ChatRoomResponseDto;
import com.ssafy.todak.chat.repository.ChatRoomRepository;
import com.ssafy.todak.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatMessageServiceIml {

    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;

    //메시지 전송
    //메시지 저장

}
