package com.ssafy.todak.member.dto.request;

import jakarta.persistence.Entity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class MemberRegisterRequestDto {
    /**
     * 회원가입
     */
    private String email;

    private String password;

    private String name;

    private String nickname;

    private String birthDate;

    private int sex;

    private String phoneNumber;

    private boolean isAgreedAlarm;

    private boolean isAgreedLocation;

    private String profileUrl;

}
