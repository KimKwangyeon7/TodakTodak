package com.ssafy.todak.notification.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FCMNotificationRequestDto {
    private int receiveId;
    private String title;
    private String body;
    private String type;

    @Builder
    public FCMNotificationRequestDto(int receiveId, String title, String body, String type) {
        this.receiveId = receiveId;
        this.title = title;
        this.body = body;
        this.type = type;
    }

}
