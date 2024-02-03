package com.ssafy.todak.goal.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlarmCreateRequestDto {

    private int day;

    private String time;
}
