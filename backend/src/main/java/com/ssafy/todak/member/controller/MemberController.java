package com.ssafy.todak.member.controller;

import com.ssafy.todak.common.QuoteLoader;
import com.ssafy.todak.fcm.FCMTokenManager;
import com.ssafy.todak.file.service.FileService;
import com.ssafy.todak.goal.dto.request.AlarmCreateRequestDto;
import com.ssafy.todak.goal.dto.request.HabitCreateRequestDto;
import com.ssafy.todak.goal.service.GoalService;
import com.ssafy.todak.member.auth.MemberDetails;
import com.ssafy.todak.member.common.MemberLoader;
import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.member.domain.RefreshToken;
import com.ssafy.todak.member.dto.request.MemberLoginRequestDto;
import com.ssafy.todak.member.dto.request.MemberModifyRequestDto;
import com.ssafy.todak.member.dto.request.MemberRegisterRequestDto;
import com.ssafy.todak.member.dto.response.MemberLoginResponseDto;
import com.ssafy.todak.member.dto.response.MemberResponseDto;
import com.ssafy.todak.member.repository.MemberRepository;
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

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/members")
@RequiredArgsConstructor
@Log4j2
public class MemberController {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;
    private final RefreshTokenRepository refreshTokenRepository;
    private final FCMTokenManager fcmTokenManager;
    private final MemberLoader memberLoader;
    private final QuoteLoader quoteLoader;
    private final GoalService goalService;
    private final MemberRepository memberRepository;
    private final FileService fileService;
    //회원가입
    @PostMapping("")
    public ResponseEntity<String> register(@RequestBody MemberRegisterRequestDto registerDto) {
        log.info(registerDto);
        memberService.register(registerDto);
        Member member = memberRepository.findMemberByNickname(registerDto.getNickname()).get();
        int memberId = member.getId();
        // 아침 먹기
        List<AlarmCreateRequestDto> list = new ArrayList<>();
        for (int i = 0; i < 7; i++){
            list.add(new AlarmCreateRequestDto(i, "0700"));
        }
        HabitCreateRequestDto habit = new HabitCreateRequestDto("아침 먹기", false, true, list);
        goalService.createHabit(memberId, habit);
        goalService.createHabitAlarm(memberId, habit);

        // 점심 먹기
        list = new ArrayList<>();
        for (int i = 0; i < 7; i++){
            list.add(new AlarmCreateRequestDto(i, "1200"));
        }
        habit = new HabitCreateRequestDto("점심 먹기", false, true, list);
        goalService.createHabit(memberId, habit);
        goalService.createHabitAlarm(memberId, habit);

        // 저녁 먹기
        list = new ArrayList<>();
        for (int i = 0; i < 7; i++){
            list.add(new AlarmCreateRequestDto(i, "1800"));
        }
        habit = new HabitCreateRequestDto("저녁 먹기", false, true, list);
        goalService.createHabit(memberId, habit);
        goalService.createHabitAlarm(memberId, habit);

        return ResponseEntity.status(200).body("Success");
    }

    @PostMapping("/auth")
    public ResponseEntity<MemberLoginResponseDto> login(@RequestBody MemberLoginRequestDto loginDto) {
        String email = loginDto.getEmail();
        String password = loginDto.getPassword();
        String fcmToken = loginDto.getFirebaseToken();
        log.info(loginDto);

        Member member = memberService.getMemberByEmail(email);
        String memberId = String.valueOf(member.getId());

        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        if (passwordEncoder.matches(password, member.getPassword())) {
            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
            String accessToken = jwtTokenUtil.createAccessToken(member);
            String refreshToken = jwtTokenUtil.createRefreshToken(member);
            RefreshToken redis = new RefreshToken(member.getId(), refreshToken);
            refreshTokenRepository.save(redis);

            //FCM 토큰 발급
            deleteAndSaveFCMToken(memberId, fcmToken);

//            if (fcmRepository.findByMember(member).isEmpty()) {
//                fcmRepository.save(FCMToken.builder().member(member).fireBaseToken(fcmToken).build());
//            } else { //이미 fcm 토큰이 있는 유저라면
//                fcmRepository.findByMember(member).orElseThrow().update(fcmToken);
//            }
            return ResponseEntity.ok(MemberLoginResponseDto.of(200, "Success", accessToken, refreshToken, member.getNickname()));
        }

        // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
        return ResponseEntity.status(401).body(MemberLoginResponseDto.of(401, "Invalid Password", null, null, null));
    }

//    @PostMapping("/login")
//    public ResponseEntity<MemberLoginResponseDto> login(@RequestHeader(value = "FCM-TOKEN", required = false) String fcmToken, @RequestBody MemberLoginRequestDto loginDto) {
//        String email = loginDto.getEmail();
//        String password = loginDto.getPassword();
//        System.out.println("로그인한 유저정보: " + loginDto.toString());
//
//        Member member = memberService.getMemberByEmail(email);
//        String memberId = String.valueOf(member.getId());
//
//        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
//        if (passwordEncoder.matches(password, member.getPassword())) {
//            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
//            String accessToken = jwtTokenUtil.createAccessToken(memberId);
//            String refreshToken = jwtTokenUtil.createRefreshToken(memberId);
//            RefreshToken redis = new RefreshToken(member.getId(), refreshToken);
//            refreshTokenRepository.save(redis);
//
//            //FCM 토큰 발급
//            if (fcmRepository.findByMember(member).isEmpty()) {
//                fcmRepository.save(FCMToken.builder().member(member).fireBaseToken(fcmToken).build());
//            } else { //이미 fcm 토큰이 있는 유저라면
//                fcmRepository.findByMember(member).orElseThrow().update(fcmToken);
//            }
//            return ResponseEntity.ok(MemberLoginResponseDto.of(200, "Success", accessToken, refreshToken));
//        }
//
//        // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
//        return ResponseEntity.status(401).body(MemberLoginResponseDto.of(401, "Invalid Password", null, null));
//    }

    private void deleteAndSaveFCMToken(String memberId, String fcmToken) {
        fcmTokenManager.deleteAndSaveFCMToken(memberId, fcmToken);
    }

//    @GetMapping("/{userId}")
//    public ResponseEntity<BaseResponseBody> getUserInfoByUserId(@PathVariable String userId, Authentication authentication) {
//        /**
//         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
//         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
//         */
//        Member member = memberService.getMemberById(Integer.parseInt(userId));
//
//        return ResponseEntity.status(409).body(BaseResponseBody.of(409, "이미 존재하는 사용자 ID 입니다."));
//    }

    //로그인한 회원 본인의 정보를 조회
    //마이페이지
    @GetMapping("/me")
    public ResponseEntity<MemberResponseDto> getUserInfo() {
        Member member = memberLoader.getMember();
        return ResponseEntity.status(200).body(MemberResponseDto.of(member));
    }

    @GetMapping("/{nickname}")
    public ResponseEntity<MemberResponseDto> getMemberByNickname(@PathVariable String nickname) {
        Member member = memberService.getMemberByNickname(nickname);
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
        fcmTokenManager.deleteToken(memberId); //FCM 토큰 삭제

        return ResponseEntity.ok(memberService.logout(Integer.parseInt(memberId)));
    }

    @GetMapping("/quote")
    public ResponseEntity<String[]> getQuote(){
        return ResponseEntity.ok(quoteLoader.getRandomQuote());
    }

    @PutMapping("")
    public ResponseEntity<String> modifyMember(@RequestBody MemberModifyRequestDto requestDto) {

        memberService.modifyMember(requestDto);

        return ResponseEntity.status(200).body("Success");
    }

}
