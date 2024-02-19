package com.ssafy.todak.member.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberModifyRequestDto {

    /**
     * 이름, 닉네임, 메모, 프로필 이미지
     */

    private String name;

    private String nickname; //중복체크 필요함

    private String memo;

    private String profileUrl;

}
