package com.ssafy.todak.chat.domain;


import com.fasterxml.jackson.databind.ser.Serializers;
import com.ssafy.todak.board.domain.Favorite;
import com.ssafy.todak.common.BaseEntity;
import com.ssafy.todak.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ChatMessage extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private int id;

    @Column(name = "message_type", nullable = false)
    private String messageType; //메시지 타입 ENTER, TALK

    @Column(nullable = false)
    private String message;

    @Column(columnDefinition = "boolean default false")
    private boolean isRead; //읽은 여부

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private ChatRoom chatRoom;



}
