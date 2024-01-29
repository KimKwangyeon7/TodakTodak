package com.ssafy.todak.member.controller;

import com.ssafy.todak.member.auth.MemberDetails;
import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.member.domain.RefreshToken;
import com.ssafy.todak.member.dto.request.MemberLoginRequestDto;
import com.ssafy.todak.member.dto.request.MemberRegisterRequestDto;
import com.ssafy.todak.member.dto.response.MemberLoginResponseDto;
import com.ssafy.todak.member.dto.response.MemberResponseDto;
import com.ssafy.todak.common.BaseResponseBody;
import com.ssafy.todak.member.repository.RefreshTokenRepository;
import com.ssafy.todak.member.service.MemberService;
import com.ssafy.todak.member.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/members")
@RequiredArgsConstructor
@Log4j2
public class MemberController {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;
    private final RefreshTokenRepository refreshTokenRepository;

    //회원가입
    @PostMapping("")
    public ResponseEntity<String> register(@RequestBody MemberRegisterRequestDto registerDto) {

        memberService.register(registerDto);

        return ResponseEntity.status(200).body("Success");
    }

    @PostMapping("/login")
    public ResponseEntity<MemberLoginResponseDto> login(@RequestBody MemberLoginRequestDto loginDto) {
        String email = loginDto.getEmail();
        String password = loginDto.getPassword();
        System.out.println("로그인한 유저정보: " + loginDto.toString());

        Member member = memberService.getMemberByEmail(email);
        String memberId = String.valueOf(member.getId());

        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        if (passwordEncoder.matches(password, member.getPassword())) {
            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
            String accessToken = jwtTokenUtil.createAccessToken(memberId);
            String refreshToken = jwtTokenUtil.createRefreshToken(memberId);
            RefreshToken redis = new RefreshToken(member.getId(), refreshToken);
            refreshTokenRepository.save(redis);

            return ResponseEntity.ok(MemberLoginResponseDto.of(200, "Success", accessToken, refreshToken));
        }

        // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
        return ResponseEntity.status(401).body(MemberLoginResponseDto.of(401, "Invalid Password", null, null));
    }


    @GetMapping("/{userId}")
    public ResponseEntity<BaseResponseBody> getUserInfoByUserId(@PathVariable String userId, Authentication authentication) {
        /**
         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
         */
        Member member = memberService.getMemberById(Integer.parseInt(userId));

        return ResponseEntity.status(409).body(BaseResponseBody.of(409, "이미 존재하는 사용자 ID 입니다."));
    }

    //로그인한 회원 본인의 정보를 조회
    @GetMapping("/me")
    public ResponseEntity<MemberResponseDto> getUserInfo(Authentication authentication) {
        /**
         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
         */
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        String userId = memberDetails.getUsername();
        Member member = memberService.getMemberById(Integer.parseInt(userId));

        return ResponseEntity.status(200).body(MemberResponseDto.of(member));
    }


    /**
     * 리프레시 토큰을 가지고 액세스 토큰 재발급
     *
     * @param refreshToken
     * @return
     */
    @PostMapping("/access-token")
    public ResponseEntity<?> generateAccessToken(@RequestBody RefreshToken refreshToken, Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        String memberId = memberDetails.getUsername();

        return ResponseEntity.status(200).body(memberService.createAccessToken(Integer.parseInt(memberId), refreshToken.getRefreshToken()));

    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> generateRefreshToken(Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        String memberId = memberDetails.getUsername();

        return ResponseEntity.status(200).body(memberService.createRefreshToken(Integer.parseInt(memberId)));
    }


    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<?> logout(Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        String memberId = memberDetails.getUsername();

        return ResponseEntity.ok(memberService.logout(Integer.parseInt(memberId)));
    }


}
