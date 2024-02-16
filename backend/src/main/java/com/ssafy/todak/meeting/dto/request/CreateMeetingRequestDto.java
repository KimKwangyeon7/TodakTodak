package com.ssafy.todak.meeting.dto.request;

import lombok.*;

/**
 * Created by Yeseul Kim on 2021-08-05
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateMeetingRequestDto {

    //@ApiModelProperty(name = "게임 타입", example="1")
    private String title;

    private String content;

    private int totalMemberCnt;

    private int maxTime;

    //@ApiModelProperty(name = "비밀번호", example="password")
    private String password;
}