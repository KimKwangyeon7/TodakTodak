package com.ssafy.todak.chat.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageRequestDto {

    private String chatRoomId;

    private String sender;

    private String message;

    private String messageType;

}
