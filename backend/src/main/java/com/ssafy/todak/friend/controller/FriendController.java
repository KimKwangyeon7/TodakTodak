package com.ssafy.todak.friend.controller;

import com.ssafy.todak.friend.dto.request.FriendRequestDto;
import com.ssafy.todak.friend.service.FriendService;
import com.ssafy.todak.goal.dto.response.GoalTodoResponseDto;
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
    @DeleteMapping("/reject/{friendNickname}")
    public ResponseEntity<String> rejectFriend(@PathVariable String friendNickname) {
        Member member = memberLoader.getMember();
        friendService.rejectFriend(member.getId(), friendNickname);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(new MediaType("applicaton", "text", StandardCharsets.UTF_8))
                .body("요청을 거절했습니다.");
    }

    //친구 삭제하기
    @DeleteMapping("/delete/{friendNickname}")
    public ResponseEntity<String> deleteFriend(@PathVariable String friendNickname) {
        Member member = memberLoader.getMember();
        friendService.deleteFriend(member.getId(), friendNickname);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(new MediaType("applicaton", "text", StandardCharsets.UTF_8))
                .body("친구가 삭제됐습니다.");
    }

    //친구 프로필 보기
    @GetMapping("/{nickname}")
    public ResponseEntity<List<GoalTodoResponseDto>> getFriendPage(@PathVariable String nickname) {
        Member member = memberLoader.getMember();
        List<GoalTodoResponseDto> friendPage = friendService.getFriendPage(member.getId(), nickname);

        return ResponseEntity.status(HttpStatus.OK).body(friendPage);
    }

    // 친구 추천
    @GetMapping("/recommend")
    public ResponseEntity<List<String>> recommendFriend(){
        int memberId = memberLoader.getId();
        return ResponseEntity.ok(friendService.recommendFriend(memberId));
    }

}
