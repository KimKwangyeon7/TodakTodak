package com.ssafy.todak.friend.controller;

import com.ssafy.todak.friend.dto.request.FriendRequestDto;
import com.ssafy.todak.friend.service.FriendService;
import com.ssafy.todak.member.common.MemberLoader;
import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.member.dto.response.MemberResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/friends")
public class FriendController {

    private final FriendService friendService;
    private final MemberLoader memberLoader;

    //친구 목록 조회
    @GetMapping("")
    public ResponseEntity<List<MemberResponseDto>> getFriendList() {
        Member member = memberLoader.getMember();
        List<MemberResponseDto> responseDtoList = friendService.getFriendList(member.getId());

        return ResponseEntity.status(HttpStatus.OK).body(responseDtoList);
    }

    //친구 요청 목록
    @GetMapping("/request")
    public ResponseEntity<List<MemberResponseDto>> getRequestList() {
        Member member = memberLoader.getMember();
        List<MemberResponseDto> responseDtoList = friendService.getRequestList(member.getId());

        return ResponseEntity.status(HttpStatus.OK).body(responseDtoList);
    }

    //친구 요청 보내기
    @PostMapping("/request")
    public ResponseEntity<String> requestFriend(@RequestBody FriendRequestDto friendRequestDto) {
        friendService.requestFriend(memberLoader.getId(), friendRequestDto);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(new MediaType("applicaton", "text", StandardCharsets.UTF_8))
                .body("요청을 보냈습니다.");
    }


    //친구 요청 받기
    @PostMapping("/accept")
    public ResponseEntity<String> acceptFriend(@RequestBody FriendRequestDto friendRequestDto) {
        Member member = memberLoader.getMember();
        friendService.acceptFriend(member.getId(), friendRequestDto.getNickname());

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(new MediaType("applicaton", "text", StandardCharsets.UTF_8))
                .body("요청을 수락했습니다.");
    }

    //친구 요청 거절하기
    @DeleteMapping("/reject")
    public ResponseEntity<String> rejectFriend(@RequestBody FriendRequestDto friendRequestDto) {
        Member member = memberLoader.getMember();
        friendService.rejectFriend(member.getId(), friendRequestDto);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(new MediaType("applicaton", "text", StandardCharsets.UTF_8))
                .body("요청을 거절했습니다.");
    }

    //친구 상세보기(친구 프로필)


    //친구 삭제하기
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteFriend(@RequestBody FriendRequestDto friendRequestDto) {
        Member member = memberLoader.getMember();
        friendService.rejectFriend(member.getId(), friendRequestDto);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(new MediaType("applicaton", "text", StandardCharsets.UTF_8))
                .body("요청을 거절했습니다.");
    }
}
