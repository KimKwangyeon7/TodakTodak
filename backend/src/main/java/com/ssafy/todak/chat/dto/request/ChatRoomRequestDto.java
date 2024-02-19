package com.ssafy.todak.chat.dto.request;

import lombok.*;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatRoomRequestDto {

    private String title; //방 제목

    private String receiver; //받은사람

}
