package com.ssafy.todak.goal.dto.response;

import com.ssafy.todak.goal.domain.Habit;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HabitResponseDto {
    private int id;
    private String content;
    private List<AlarmResponseDto> alarmList;

    public HabitResponseDto(Habit habit) {
        this.id = habit.getId();
        this.content = habit.getContent();
        List<AlarmResponseDto> habitAlarmList = habit.getAlarmList().stream().map(AlarmResponseDto::new).collect(Collectors.toList());
        this.alarmList = habitAlarmList;
    }
}

