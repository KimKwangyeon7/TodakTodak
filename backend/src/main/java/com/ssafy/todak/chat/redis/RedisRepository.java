package com.ssafy.todak.chat.redis;

import com.ssafy.todak.chat.domain.ChatRoom;
import com.ssafy.todak.chat.repository.ChatRoomRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
@Log4j2
public class RedisRepository {

    private final RedisSubscriber redisSub;
    private final RedisMessageListenerContainer redisMessageListenerContainer;
    private final ChatRoomRepository chatRoomRepository;
    private Map<String, ChannelTopic> topicMap;

    // 임시로 설정
    @PostConstruct
    private void init() {
        topicMap = new HashMap<>();
        List<ChatRoom> roomList = chatRoomRepository.findAllRooms();
        for (ChatRoom c : roomList) {
            ChannelTopic topic = ChannelTopic.of(c.getChatRoomId());
            redisMessageListenerContainer.addMessageListener(redisSub, topic);
            topicMap.put(c.getChatRoomId(), topic);
        }
    }

    // 채팅방 생성 시 사용해야함
    public void subscribe(String chatRoomId) {
        ChannelTopic topic = topicMap.get(chatRoomId);
        if (topic == null) {
            topic = ChannelTopic.of(chatRoomId);
            redisMessageListenerContainer.addMessageListener(redisSub, topic);
            topicMap.put(chatRoomId, topic);
        }
    }

    public ChannelTopic getTopic(String roomId) {
        return topicMap.get(roomId);
    }
}
