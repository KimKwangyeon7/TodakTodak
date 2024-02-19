package com.ssafy.todak.chat.service;

import com.ssafy.todak.chat.domain.ChatRoom;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EnterChatRoomService {

    // 쪽지방(topic)에 발행되는 메시지 처리하는 리스너
    private final RedisMessageListenerContainer redisMessageListener;
    // RedisConfig에서 가져온 기존 리스너
//    private final MessageListenerAdapter messageListenerAdapter;
    private Map<String, ChannelTopic> topics;

    @PostConstruct
    public void init() {
        topics = new HashMap<>();
    }

    // redis 채널에서 쪽지방 조회
    public ChannelTopic getTopic(String roomId) {
        return topics.get(roomId);
    }


    // 쪽지방 입장
    public void enterMessageRoom(String chatRoomId) {
        ChannelTopic topic = topics.get(chatRoomId);

        if (topic == null) {
            topic = new ChannelTopic(chatRoomId);
            // pub/sub 통신을 위해 리스너를 설정. 대화가 가능해진다
//            redisMessageListener.addMessageListener(messageListenerAdapter, topic);
            topics.put(chatRoomId, topic);
        }
    }

}
