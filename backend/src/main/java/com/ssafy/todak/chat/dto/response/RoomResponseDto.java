package com.ssafy.todak.chat.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import opennlp.tools.util.model.SerializableArtifact;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoomResponseDto implements Serializable {
    private static final long serialVersionUID = 6494678977089006639L;      // 역직렬화 위한 serialVersionUID 세팅

    private String chatRoomId;

    private String title;

    private String sender;

    private String receiver;

}
