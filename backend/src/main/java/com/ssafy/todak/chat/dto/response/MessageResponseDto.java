package com.ssafy.todak.chat.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.todak.chat.domain.ChatMessage;
import com.ssafy.todak.chat.domain.ChatRoom;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MessageResponseDto {

    private int roomId;

    private String chatRoomId;

    private String title;

    private String sender;

    private String messageType;

    private String message;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdDate;

    private String profileImageUrl;

    public MessageResponseDto(String messageType, String chatRoomId, String sender, String message, LocalDateTime createdDate, String profileImageUrl) {
        this.chatRoomId = chatRoomId;
        this.messageType = messageType;
        this.sender = sender;
        this.message = message;
        this.createdDate = createdDate;
        if (sender != null) {
            this.profileImageUrl = profileImageUrl;
        }
    }

    public MessageResponseDto(ChatRoom chatRoom) {
        this.roomId = chatRoom.getId();
        this.chatRoomId = chatRoom.getChatRoomId();
        this.title = chatRoom.getTitle();
        this.sender = chatRoom.getSender();
    }

    public MessageResponseDto(int roomId) {
        this.roomId = roomId;
    }

    public MessageResponseDto(int roomId, String title, String sender, String receiver) {
        this.title = title;
        this.roomId = roomId;
        this.sender = sender;
    }

}
