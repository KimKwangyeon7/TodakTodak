package com.ssafy.todak.chat.domain;

import com.ssafy.todak.chat.dto.request.ChatRoomRequestDto;
import com.ssafy.todak.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
@Builder
public class ChatRoom implements Serializable {

    private static final long serialVersionUID = 6494678977089006639L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private int id;

    @Column(name = "room_title")
    private String title;

    private int outMemberId;

    private String chatRoomId; //UUID 방번호

    private LocalDateTime outDate;

    private String sender;

    private String receiver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_member_id")
    private Member member;

    @Builder.Default
    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL)
    private List<ChatMessage> chatMessageList = new ArrayList<>();

    public static ChatRoom create(ChatRoomRequestDto requestDto, Member member) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.chatRoomId = UUID.randomUUID().toString();
        chatRoom.title = requestDto.getTitle();
        chatRoom.receiver = requestDto.getReceiver();
        chatRoom.sender = member.getNickname();

        return chatRoom;
    }

    public ChatRoom(ChatRoomRequestDto requestDto) {
        this.chatRoomId = UUID.randomUUID().toString();
        this.title = requestDto.getTitle();
        this.receiver = requestDto.getReceiver();
    }
}
