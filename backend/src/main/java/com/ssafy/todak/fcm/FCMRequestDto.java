package com.ssafy.todak.fcm;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FCMRequestDto {

    private int memberId;

    private String title;

    private String body;

    @Builder
    public FCMRequestDto(int memberId, String title, String body) {
        this.memberId = memberId;
        this.title = title;
        this.body = body;
    }
}
