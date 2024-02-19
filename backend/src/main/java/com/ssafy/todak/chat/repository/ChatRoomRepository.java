package com.ssafy.todak.chat.repository;

import com.ssafy.todak.chat.domain.ChatRoom;
import com.ssafy.todak.member.domain.Member;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {

//    @Autowired
//    HashOperations<String, String, String> hashOpsEnterInfo;

    String ENTER_INFO = "ENTER_INFO"; // 채팅룸에 입장한 클라이언트의 sessionId와 채팅룸 id를 맵핑한 정보 저장

    // A유저와 B유저 채팅방 조회
    @Query("select ch from ChatRoom ch" +
            " where (ch.sender = :sender and ch.receiver = :receiver) or (ch.sender = :receiver and ch.receiver = :sender) ")
    ChatRoom findBySenderOrReceiver(String sender, String receiver);

    @Query("select ch from ChatRoom ch where ch.sender = :nickname or ch.receiver = :nickname")
    List<ChatRoom> findAllRoomsByMember(String nickname);

    //채팅방 조회
    ChatRoom findByChatRoomId(String chatRoomId);

    @Query("select ch from ChatRoom ch")
    List<ChatRoom> findAllRooms();

    @Query("select ch from ChatRoom ch " +
            "where ch.chatRoomId = :chatRoomId " +
            "and (ch.sender = :sender and ch.receiver = :receiver) or (ch.sender = :receiver and ch.receiver = :sender)")
    ChatRoom findByRoomIdAndUserOrRoomIdAndReceiver(String chatRoomId, String sender, String receiver);


//    // 유저가 입장한 채팅방ID와 유저 세션ID 맵핑 정보 저장
//    default void setUserEnterInfo(String sessionId, String roomId) {
//        hashOpsEnterInfo.put(ENTER_INFO, sessionId, roomId);
//    }
//
//    // 유저 세션으로 입장해 있는 채팅방 ID 조회
//    default String getUserEnterRoomId(String sessionId) {
//        return hashOpsEnterInfo.get(ENTER_INFO, sessionId);
//    }
//
//    // 유저 세션정보와 맵핑된 채팅방ID 삭제
//    default void removeUserEnterInfo(String sessionId) {
//        hashOpsEnterInfo.delete(ENTER_INFO, sessionId);
//    }
}
