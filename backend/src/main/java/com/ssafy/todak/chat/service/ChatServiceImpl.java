package com.ssafy.todak.chat.service;

import com.ssafy.todak.chat.domain.ChatRoom;
import com.ssafy.todak.chat.dto.request.CreateRoomRequestDto;
import com.ssafy.todak.chat.dto.response.ChatRoomResponseDto;
import com.ssafy.todak.chat.repository.ChatRoomRepository;
import com.ssafy.todak.exception.CustomException;
import com.ssafy.todak.exception.ErrorCode;
import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRoomRepository roomRepository;
    private final MemberRepository memberRepository;

    /**
     * 유저의 채팅방 목록 가져오기
     * @param memberId
     * @return
     */
    @Override
    public List<ChatRoom> getChatRoonList(int memberId) {
        return roomRepository.findChatRoomList(memberId);
    }

    /**
     * 채팅방 조회
     * @param roomId
     * @return
     */
    @Override
    public ChatRoomResponseDto getChatRoom(int roomId) {
        ChatRoom chatRoom = roomRepository.findById(roomId).orElseThrow(
                () -> new CustomException(ErrorCode.NO_CHAT_ROOM)
        );
        Member sender = chatRoom.getFromMember();
        Member receiver = chatRoom.getToMember();

        return new ChatRoomResponseDto(chatRoom, sender, receiver);
    }

    /**
     * 채팅방 생성하기
     * @param member
     * @param chatRoomRequestDto
     * @return
     */
    @Override
    public int createChatRoom(Member member, CreateRoomRequestDto chatRoomRequestDto) {
        Member friend = memberRepository.findByNickname(chatRoomRequestDto.getToNickname()).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 이미 채팅방 있는지 확인
        List<ChatRoom> chatRoomList = roomRepository.findChatRoomList(member.getId());
        for (ChatRoom room : chatRoomList) {
            Member fromMember = room.getFromMember();
            if (fromMember == member) {
                Member toMember = room.getToMember();
                if (toMember == friend) {
                    throw new CustomException(ErrorCode.EXISTING_ROOM);
                }

            } else if (fromMember == friend) {
                Member toMember = room.getToMember();
                if (toMember == member) {
                    throw new CustomException(ErrorCode.EXISTING_ROOM);
                }
            }
        }

        ChatRoom chatRoom = ChatRoom.builder()
                .title(chatRoomRequestDto.getTitle())
                .fromMember(member)
                .toMember(friend)
                .build();

        roomRepository.save(chatRoom);

        return chatRoom.getId();
    }

    /**
     * 채팅방 삭제
     * @param roomId
     */
    @Override
    public void deleteChatRoom(int roomId) {
        ChatRoom chatRoom = roomRepository.findById(roomId).orElseThrow(
                () -> new CustomException(ErrorCode.NO_CHAT_ROOM)
        );
        roomRepository.delete(chatRoom);

    }
}
