package com.ssafy.todak.chat.dto.response;

import com.ssafy.todak.chat.domain.ChatRoom;
import com.ssafy.todak.member.domain.Member;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ChatRoomResponseDto {

    private int roomId;

    private String title;

    private String senderNickname;

    private String receiverNickname;

    public ChatRoomResponseDto(ChatRoom room, Member sender, Member receiver) {
        this.roomId = room.getId();
        this.title = room.getTitle();
        this.senderNickname = sender.getNickname();
        this.receiverNickname = receiver.getNickname();
    }
}
