package com.ssafy.todak.chat.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateRoomRequestDto {

    private String title; //방 제목

    private String toNickname; //받은사람

}
