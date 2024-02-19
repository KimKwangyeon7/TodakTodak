package com.ssafy.todak.member.service;

import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.member.dto.request.MemberModifyRequestDto;
import com.ssafy.todak.member.dto.request.MemberRegisterRequestDto;

public interface MemberService {

    Member register(MemberRegisterRequestDto requestDto);

    Member getMemberByEmail(String email);

    Member getMemberById(int memberId);

    String createAccessToken(int memberId, String refreshToken);

    String createRefreshToken(int memberId);

    String logout(int memberId);

    Member getMemberByNickname(String nickname);

    void modifyMember(MemberModifyRequestDto requestDto);
}
