package com.ssafy.todak.goal.dto.response;

import com.ssafy.todak.goal.domain.Alarm;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlarmResponseDto {
    private int id;
    private String time;
    private int day;
    private boolean isAlarmed;
    private boolean isOutside;
    private boolean isChecked;

    public AlarmResponseDto(Alarm alarm){
        this.id = alarm.getId();
        this.time = alarm.getTime();
        this.day = alarm.getDay();
        this.isAlarmed = alarm.isAlarmed();
        this.isChecked = alarm.isChecked();
        this.isOutside = alarm.isOutside();
    }
}
