package com.ssafy.todak.chat.repository;

import com.ssafy.todak.chat.domain.ChatRoom;
import com.ssafy.todak.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRoomRepository  extends JpaRepository<ChatRoom, Integer> {

    @Query("select al from ChatRoom al where al.fromMember = :memberId or al.toMember = :memberId")
    List<ChatRoom> findChatRoomList(int memberId);

}
