package com.ssafy.todak.goal.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TodoCreateRequestDto {
    private String title;

    private String content;

    private boolean isImportant; // 중요 여부

    private String color; // 목표 색깔

    private String time; // 알람 시간

    private boolean isOutside; // 외출 여부

    private boolean isAlarmed; // 알람 여부
}
