package com.ssafy.todak.chat.domain;


import com.ssafy.todak.chat.dto.request.MessageRequestDto;
import com.ssafy.todak.common.BaseEntity;
import com.ssafy.todak.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
@Builder
public class ChatMessage extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private int id;

    @Column(nullable = false)
    private String message;

    @Column(columnDefinition = "boolean default false")
    private boolean isRead; //읽은 여부

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String sender; //닉네임

    private String receiver; //닉네임

    @Column
    private String chatRoomId; //1:N 관계 X

    @Column
    private String messageType;

    private String profileUrl; // 프로필 사진

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private ChatRoom chatRoom;


    public ChatMessage(MessageRequestDto requestDto, Member member) {
        this.chatRoomId = requestDto.getChatRoomId();
        this.message = requestDto.getMessage();
        this.messageType = requestDto.getMessageType();
        this.sender = member.getNickname();
        this.member = member;
    }

    public ChatMessage(MessageRequestDto requestDto) {
        this.chatRoomId = requestDto.getChatRoomId();
        this.message = requestDto.getMessage();
        this.messageType = requestDto.getMessageType();
        this.sender = requestDto.getSender();
    }
}
