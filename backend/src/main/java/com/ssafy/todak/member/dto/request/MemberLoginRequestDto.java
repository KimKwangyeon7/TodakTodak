package com.ssafy.todak.member.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class MemberLoginRequestDto {

    private String email;

    private String password;
}
