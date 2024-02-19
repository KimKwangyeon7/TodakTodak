package com.ssafy.todak.chat.service;

import com.ssafy.todak.chat.domain.ChatRoom;
import com.ssafy.todak.chat.dto.request.ChatRoomRequestDto;
import com.ssafy.todak.chat.dto.response.RoomResponseDto;
import com.ssafy.todak.chat.redis.RedisRepository;
import com.ssafy.todak.chat.repository.ChatRoomRepository;
import com.ssafy.todak.member.domain.Member;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Log4j2
public class ChatRoomService {

    private final ChatRoomRepository roomRepository;
    private static final String CHAT_ROOMS = "CHAT_ROOM"; // 채팅룸 저장
    private final RedisTemplate<String, Object> redisTemplate;
    private final RedisRepository redisRepository;
    String ENTER_INFO = "ENTER_INFO"; // 채팅룸에 입장한 클라이언트의 sessionId와 채팅룸 id를 맵핑한 정보 저장

    @Resource(name = "redisTemplate")
    private HashOperations<String, String, RoomResponseDto> hashOpsChatRoom;

    @Resource(name = "redisTemplate")
    private HashOperations<String, String, String> hashOpsEnterInfo;
//    @Resource(name = "redisTemplate")
//    private ValueOperations<String, String> valueOps;


    @PostConstruct
    public void init() {
        hashOpsChatRoom = redisTemplate.opsForHash();
//        topics = new HashMap<>();
    }

    // 쪽지방 생성
    public RoomResponseDto createRoom(ChatRoomRequestDto roomRequestDto, Member member) {
        ChatRoom chatRoom = roomRepository.findBySenderOrReceiver(member.getNickname(), roomRequestDto.getReceiver());

        //처음 생성
        if (chatRoom == null) {
            ChatRoom room = ChatRoom.create(roomRequestDto, member);
            RoomResponseDto responseDto = new RoomResponseDto
                    (room.getChatRoomId(),
                            room.getTitle(),
                            member.getNickname(),
                            room.getReceiver()
                    );
            hashOpsChatRoom.put(CHAT_ROOMS, room.getChatRoomId(), responseDto);
            roomRepository.save(room);
            redisRepository.subscribe(room.getChatRoomId());

            return responseDto;

        } else { //이미 채팅방 있음
            RoomResponseDto responseDto = new RoomResponseDto
                    (chatRoom.getChatRoomId(),
                            chatRoom.getTitle(),
                            member.getNickname(),
                            chatRoom.getReceiver()
                    );

            return responseDto;
        }
    }


    // 사용자 관련 쪽지방 전체 조회
    public List<RoomResponseDto> findAllRoomByUser(Member member) {
        // sender & receiver 모두 해당 쪽지방 조회 가능 (1:1 대화)
        List<ChatRoom> chatRooms = roomRepository.findAllRoomsByMember(member.getNickname());

        List<RoomResponseDto> roomResponseDtos = new ArrayList<>();

        for (ChatRoom chatRoom : chatRooms) {
            RoomResponseDto responseDto = RoomResponseDto.builder()
                    .chatRoomId(chatRoom.getChatRoomId())
                    .title(chatRoom.getTitle())
                    .sender(chatRoom.getSender())
                    .receiver(chatRoom.getReceiver())
                    .build();
            roomResponseDtos.add(responseDto);
        }

        return roomResponseDtos;
    }

    // 사용자 관련 쪽지방 선택 조회
//    public RoomResponseDto findRoom(String chatRoomId, Member member) {
//        ChatRoom messageRoom = chatRoomRepository.findByChatRoomId(chatRoomId);
//
//        // 사용자 조회
//        Member receiver = memberRepository.findById(member.getId()).orElseThrow(
//                () -> new IllegalArgumentException("사용자가 존재하지 않습니다.")
//        );
//
//        // 9. sender & receiver 모두 messageRoom 조회 가능
//        messageRoom = chatRoomRepository.findByRoomIdAndUserOrRoomIdAndReceiver(chatRoomId, user, roomId, receiver.getNickname());
//        if (messageRoom == null) {
//            throw new IllegalArgumentException("쪽지방이 존재하지 않습니다.");
//        }
//
//        MessageRoomDto messageRoomDto = new MessageRoomDto(
//                messageRoom.getId(),
//                messageRoom.getRoomName(),
//                messageRoom.getRoomId(),
//                messageRoom.getSender(),
//                messageRoom.getReceiver());
//
//        messageRoomDto.setMessageRoomPostId(post.getId());
//        messageRoomDto.setMessageRoomCategory(post.getCategory().getValue());		// getValue() : category 는 int 타입이었기 때문. 없다면 String 타입으로 반환됨
//        messageRoomDto.setMessageRoomCountry(post.getCountry());
//        messageRoomDto.setMessageRoomTitle(post.getTitle());
//
//        return messageRoomDto;
//    }

//    // 쪽지방 입장
//    @Override
//    public void enterMessageRoom(String chatRoomId) {
//        ChannelTopic topic = topics.get(chatRoomId);
//
//        if (topic == null) {
//            topic = new ChannelTopic(chatRoomId);
//            // pub/sub 통신을 위해 리스너를 설정. 대화가 가능해진다
//            redisMessageListener.addMessageListener(messageListenerAdapter, topic);
//            topics.put(chatRoomId, topic);
//        }
//    }


    // 유저가 입장한 채팅방ID와 유저 세션ID 맵핑 정보 저장
    public void setUserEnterInfo(String sessionId, String roomId) {
        hashOpsEnterInfo.put(ENTER_INFO, sessionId, roomId);
    }

    // 유저 세션으로 입장해 있는 채팅방 ID 조회
    public String getUserEnterRoomId(String sessionId) {
        return hashOpsEnterInfo.get(ENTER_INFO, sessionId);
    }

    // 유저 세션정보와 맵핑된 채팅방ID 삭제
    public void removeUserEnterInfo(String sessionId) {
        hashOpsEnterInfo.delete(ENTER_INFO, sessionId);
    }

}
