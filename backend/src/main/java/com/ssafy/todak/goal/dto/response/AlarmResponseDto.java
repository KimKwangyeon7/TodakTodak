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
    private boolean alarmed;
    private String time;
    private boolean outside;
    private boolean checked;

    public AlarmResponseDto(Alarm alarm){
        this.id = alarm.getId();
        this.alarmed = alarm.isAlarmed();
        this.checked = alarm.isChecked();
        this.outside = alarm.isOutside();
        this.time = alarm.getTime();
    }
}
