package com.ssafy.todak.goal.dto.request;

import com.ssafy.todak.goal.domain.Alarm;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HabitCreateRequestDto {
    private String content;

    private boolean isOutside; // 외출 여부

    private boolean isAlarmed; // 알람 여부

    private List<AlarmCreateRequestDto> alarmDtoList;

}
