package com.ssafy.todak.member.dto.response;

import com.ssafy.todak.friend.domain.Friend;
import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.common.BaseResponseBody;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class MemberResponseDto extends BaseResponseBody {

    private String email;

    private String nickname;

    private String name;

    private String birthDate;

    private long mileage;

    private String phoneNumber;

    private String memo;

    private String profileUrl;

    public static MemberResponseDto of(Member member) {
        MemberResponseDto res = new MemberResponseDto();
        res.setEmail(member.getEmail());
        res.setNickname(member.getNickname());
        res.setName(member.getName());
        res.setBirthDate(member.getBirthDate());
        res.setMileage(member.getMileage());
        res.setPhoneNumber(member.getPhoneNumber());
        res.setMemo(member.getMemo());
        res.setProfileUrl(member.getProfileUrl());

        return res;
    }
    public static MemberResponseDto of(Member member, Friend friend) {
        MemberResponseDto res = new MemberResponseDto();
        res.setEmail(member.getEmail());
        res.setNickname(member.getNickname());
        res.setName(member.getName());
        res.setBirthDate(member.getBirthDate());
        res.setMileage(member.getMileage());
        res.setPhoneNumber(member.getPhoneNumber());
        res.setMemo(member.getMemo());
        res.setProfileUrl(member.getProfileUrl());

        return res;
    }

    public MemberResponseDto(Member member) {
        this.email = member.getEmail();
        this.nickname = member.getNickname();

    }

}
