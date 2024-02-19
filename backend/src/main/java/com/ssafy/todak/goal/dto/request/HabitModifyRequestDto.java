package com.ssafy.todak.goal.dto.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HabitModifyRequestDto {
    private String content;

    private boolean isImportant;

    //private boolean isOutside; // 외출 여부

    //private boolean isAlarmed; // 알람 여부

    private List<AlarmModifyRequestDto> alarmDtoList;
}
