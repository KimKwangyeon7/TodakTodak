package com.ssafy.todak.meeting.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FindMeetingRequestDto {
    private String title;
    private String nickname;
}
