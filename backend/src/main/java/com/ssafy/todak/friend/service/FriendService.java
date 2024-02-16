package com.ssafy.todak.friend.service;

import com.ssafy.todak.friend.dto.request.FriendRequestDto;
import com.ssafy.todak.goal.dto.response.GoalTodoResponseDto;
import com.ssafy.todak.member.dto.response.MemberResponseDto;

import java.util.List;

public interface FriendService {
    //친구 상세보기(친구 프로필)
    List<GoalTodoResponseDto> getFriendPage(int memberId, String nickname);

    //친구 요청 보내기
    void requestFriend(int memberId, FriendRequestDto requestDto);

    //친구 요청 받기
    void acceptFriend(int memberId, String nickname);

    //친구 요청 거절하기
    void rejectFriend(int memberId, int friendId);

    //친구 삭제하기
    void deleteFriend(int memberId, int friendId);

    //친구 목록
    List<MemberResponseDto> getFriendList(int memberId);

    //친구 요청 목록
    List<MemberResponseDto> getRequestList(int memberId);


}
