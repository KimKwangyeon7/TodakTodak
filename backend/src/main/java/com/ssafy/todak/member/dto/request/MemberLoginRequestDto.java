package com.ssafy.todak.member.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class MemberLoginRequestDto {

    private String email;

    private String password;

    private String firebaseToken;

    @Builder
    public MemberLoginRequestDto(String email, String password, String fcmToken) {
        this.email = email;
        this.password = password;
        this.firebaseToken = fcmToken;
    }
}
