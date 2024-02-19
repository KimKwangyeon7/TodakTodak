package com.ssafy.todak.chat.service;

import com.ssafy.todak.chat.domain.ChatMessage;
import com.ssafy.todak.chat.dto.request.MessageRequestDto;
import com.ssafy.todak.chat.redis.RedisPublisher;
import com.ssafy.todak.chat.redis.RedisRepository;
import com.ssafy.todak.chat.repository.ChatMessageRepository;
import com.ssafy.todak.chat.repository.ChatRoomRepository;
import com.ssafy.todak.exception.CustomException;
import com.ssafy.todak.exception.ErrorCode;
import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.member.repository.MemberRepository;
import com.ssafy.todak.notification.domain.Message;
import com.ssafy.todak.notification.dto.FCMNotificationRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final RedisTemplate<String, MessageRequestDto> redisTemplateMessage;
    private final ChatMessageRepository chatMessageRepository;
    private final MemberRepository memberRepository;
    private final RedisPublisher redisPublisher;
    private final RedisRepository redisRepository;
    private final SimpMessagingTemplate messagingTemplate;
    /**
     * destination정보에서 roomId 추출
     */
    public String getChatRoomId(String destination) {
        int lastIndex = destination.lastIndexOf('/');
        if (lastIndex != -1)
            return destination.substring(lastIndex + 1);
        else
            return "";
    }

    /**
     * 채팅방에 메시지 발송
     */
    public void sendChatMessage(MessageRequestDto messageRequestDto) {
        if (messageRequestDto.getMessageType().equals("QUIT")) {
            messageRequestDto.setMessage(messageRequestDto.getSender() + "님이 방에서 나갔습니다.");
            messageRequestDto.setSender("[알림]");
        }
//        redisTemplateMessage.convertAndSend(channelTopic.getTopic(), messageRequestDto);
        redisPublisher.publish(redisRepository.getTopic(messageRequestDto.getChatRoomId()), messageRequestDto);

    }

    /**
     * 대화 저장
     *
     * @param messageDto
     * @param nickname
     */
    public void saveMessage(MessageRequestDto messageDto, String nickname) {
        Member member = memberRepository.findMemberByNickname(nickname).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );
        // DB 저장
        ChatMessage message = new ChatMessage(messageDto, member);
        chatMessageRepository.save(message);

        // 1. 직렬화
        redisTemplateMessage.setValueSerializer(new Jackson2JsonRedisSerializer<>(ChatMessage.class));
        // 2. redis 저장
        redisTemplateMessage.opsForList().rightPush(messageDto.getChatRoomId(), messageDto);
        // 3. expire 을 이용해서, Key 를 만료시킬 수 있음
        redisTemplateMessage.expire(messageDto.getChatRoomId(), 1, TimeUnit.MINUTES);
    }

    //대화 조회 - Redis & DB
    public List<MessageRequestDto> loadMessage(String chatRoomId) {
        List<MessageRequestDto> messageList = new ArrayList<>();

        // Redis 에서 해당 채팅방의 메시지 100개 가져오기
        List<MessageRequestDto> redisMessageList = redisTemplateMessage.opsForList().range(chatRoomId, 0, 99);

        // 4. Redis 에서 가져온 메시지가 없다면, DB 에서 메시지 100개 가져오기
        if (redisMessageList == null || redisMessageList.isEmpty()) {
            // 생성시간이 빠른 순서 최대 100개의 데이터를 조회
            List<ChatMessage> dbMessageList = chatMessageRepository.findTop100ByChatRoomIdOrderByCreatedDateAsc(chatRoomId);

            for (ChatMessage message : dbMessageList) {
                MessageRequestDto messageDto = new MessageRequestDto(message.getMessageType(), message.getChatRoomId(), message.getMessage(), message.getSender());
                messageList.add(messageDto);
                // Java 객체를 JSON 형식으로 직렬화하고, Jackson JSON 라이브러리로 역직렬화(바이트 -> 객체)
                // Redis 에 저장되기 전, 값들을 직렬화
                redisTemplateMessage.setValueSerializer(new Jackson2JsonRedisSerializer<>(ChatMessage.class));
                redisTemplateMessage.opsForList().rightPush(chatRoomId, messageDto);                                // redis 저장
            }
        } else {
            messageList.addAll(redisMessageList);
        }

        return messageList;
    }


    public void sendPushNotification(Message message) {
        messagingTemplate.convertAndSend(message);
    }


}