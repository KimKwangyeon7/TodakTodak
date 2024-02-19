package com.ssafy.todak.member.service;

import com.ssafy.todak.exception.CustomException;
import com.ssafy.todak.exception.ErrorCode;
import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.member.domain.RefreshToken;
import com.ssafy.todak.member.dto.request.MemberModifyRequestDto;
import com.ssafy.todak.member.dto.request.MemberRegisterRequestDto;
import com.ssafy.todak.member.repository.MemberRepository;
import com.ssafy.todak.member.repository.RefreshTokenRepository;
import com.ssafy.todak.member.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;

    @Override
    public Member register(MemberRegisterRequestDto requestDto) {

        //이메일 중복검사

        Member member = Member.builder()
                .email(requestDto.getEmail())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .name(requestDto.getName())
                .nickname(requestDto.getNickname())
                .birthDate(requestDto.getBirthDate())
                .sex(requestDto.getSex())
                .phoneNumber(requestDto.getPhoneNumber())
                .isAlarmAgreed(requestDto.isAgreedAlarm())
                .isLocationAgreed(requestDto.isAgreedLocation())
                .profileUrl(requestDto.getProfileUrl())
                .build();

        return memberRepository.save(member);

    }

    public void dupleEmailCheck(String email) {
        if (memberRepository.findMemberByEmail(email).isPresent()) {

        }
    }


    @Override
    public Member getMemberByEmail(String email) {
        Member member = memberRepository.findMemberByEmail(email).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );
        return member;
    }


    @Override
    public Member getMemberById(int memberId) {
        Member member = memberRepository.findMemberById(memberId).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );
        return member;
    }

    /**
     * 액세스 토큰 재발급(리프레시 토큰을 이용해서)
     *
     * @param memberId     : 현재 접속한 멤버 PK
     * @param refreshToken
     * @return
     */
    @Override
    public String createAccessToken(int memberId, String refreshToken) {
        //Redis에 저장된 리프레시 토큰 가져오기
        RefreshToken refreshToken1 = refreshTokenRepository.findRefreshTokenByMemberId(memberId);
        String rt = refreshToken1.getRefreshToken();
        Member member = memberRepository.findMemberById(memberId).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );

        //request 리프레시 토큰과 Redis에 있는 리프레시 토큰이 같다면
        if (rt.equals(refreshToken)) {
            //리프레시 토큰의 유효시간이 남아있다면
            if (!jwtTokenUtil.isRefreshTokenExpired(String.valueOf(memberId))) {
                return jwtTokenUtil.createAccessToken(member);
            }
        }
        return null;
    }

    /**
     * 리프레시 토큰 재발급
     *
     * @param memberId
     * @return
     */
    public String createRefreshToken(int memberId) {
        Member member = memberRepository.findMemberById(memberId).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );

        //리프레시 토큰의 유효시간이 남아있다면
        if (!jwtTokenUtil.isRefreshTokenExpired(String.valueOf(memberId))) {
            return jwtTokenUtil.createRefreshToken(member);
        }
        return null;
    }

    @Override
    public String logout(int memberId) {
        // refreshToken 테이블의 refreshToken 삭제
        refreshTokenRepository.deleteRefreshTokenByMemberId(memberId);

        return "로그아웃 완료";
    }

    @Override
    public Member getMemberByNickname(String nickname) {
        Member member = memberRepository.findMemberByNickname(nickname).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );
        return member;
    }

    // 기존에 존재하는 Fcm 토큰 삭제
    // Redis에 사용자 아이디를 Key로 Fcm 토큰 저장
//    private void deleteAndSaveFCMToken(String fcmToken, Long memberId) {
////        fcmTokenManager.deleteAndSaveFCMToken(String.valueOf(memberId), fcmToken);
//    }

    @Override
    public void modifyMember(MemberModifyRequestDto requestDto) {
        Member member = memberRepository.findMemberByNickname(requestDto.getNickname()).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );
        member.setName(requestDto.getName());
        member.setName(requestDto.getNickname());
        member.setMemo(requestDto.getMemo());
        member.setProfileUrl(requestDto.getProfileUrl());

        memberRepository.save(member);
    }

}
