package com.ssafy.todak.chat.repository;

import com.ssafy.todak.chat.domain.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {

    ChatMessage findTopByChatRoom_IdOrderByCreatedDateDesc(int chatRoomId);
    Page<ChatMessage> findAllByChatRoom_Id(Pageable pageable, int roomId);

    List<ChatMessage> findTop100ByChatRoomIdOrderByCreatedDateAsc(String chatRoomId);
}
