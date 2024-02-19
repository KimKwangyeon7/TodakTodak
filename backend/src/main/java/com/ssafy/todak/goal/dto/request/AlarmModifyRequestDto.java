package com.ssafy.todak.goal.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlarmModifyRequestDto {

    private int day;

    private String time;

    private boolean isAlarmed;

    private boolean isChecked;

    private boolean isCompleted;

    private boolean isOutside;

    // 음성 알림용 문구
    private String text;
}
