package com.ssafy.todak.batch.dto;

import com.ssafy.todak.goal.domain.Alarm;
import com.ssafy.todak.goal.domain.Habit;
import com.ssafy.todak.goal.dto.response.AlarmResponseDto;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HabitScheduleDto {
    private boolean isAlarmed;
    private boolean isOutside;
    private boolean isChecked;
    private String time;
    private int day;
    private String content;
    private String text;

    public HabitScheduleDto(Alarm alarm) {
        this.day = alarm.getDay();
        this.time = alarm.getTime();
        this.isChecked = alarm.isChecked();
        this.isAlarmed = alarm.isAlarmed();
        this.isOutside = alarm.isOutside();
        this.content = alarm.getHabit().getContent();
        this.text = alarm.getText();
    }
}
