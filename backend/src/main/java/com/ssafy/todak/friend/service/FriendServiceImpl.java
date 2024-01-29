package com.ssafy.todak.friend.service;

import com.ssafy.todak.exception.CustomException;
import com.ssafy.todak.exception.ErrorCode;
import com.ssafy.todak.friend.domain.Friend;
import com.ssafy.todak.friend.dto.request.FriendRequestDto;
import com.ssafy.todak.friend.repository.FriendRepository;
import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.member.dto.response.MemberResponseDto;
import com.ssafy.todak.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService {

    private final FriendRepository friendRepository;
    private final MemberRepository memberRepository;


    /**
     * 친구 요청
     *
     * @param memberId
     * @param requestDto
     */
    @Override
    public void requestFriend(int memberId, FriendRequestDto requestDto) {
        //사용자가 존재하는지
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );
        Member friend = memberRepository.findByNickname(requestDto.getNickname()).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );
        Optional<Friend> result = friendRepository.findRelation(member, friend);

        if (result.isPresent()) {
            Friend friendRelation = result.get();
            if (friendRelation.isFriend()) { //이미 친구
                throw new CustomException(ErrorCode.EXISTING_FRIEND);
            } else if (!friendRelation.isFriend()) { //이미 내가 요청 보낸적 있음, 아직 친구 X
                throw new CustomException(ErrorCode.EXISTING_REQUEST);
            }
        }
        Optional<Friend> result2 = friendRepository.findReverseRelation(member, friend);
        //내가 요청을 보낸 유저가 이미 나한테 요청을 보낸 경우
        if (result2.isPresent()) {
            throw new CustomException(ErrorCode.EXISTING_REQUEST_IN_REQUEST_LIST);
        }

        friendRepository.save(new Friend(member, friend));

    }

    /**
     * 친구 요청 승낙
     *
     * @param memberId
     * @param nickname
     */
    @Transactional
    @Override
    public void acceptFriend(int memberId, String nickname) {
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );
        Member friend = memberRepository.findByNickname(nickname).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );
        //요청 오지 않음 (친구 -> 나)
        Friend friendRelation = friendRepository.findRelation(friend, member).orElseThrow(
                () -> new CustomException(ErrorCode.NO_FRIEND_REQUEST_FROM)
        );
        //이미 친구라면
        if (friendRelation.isFriend()) {
            throw new CustomException(ErrorCode.EXISTING_FRIEND);
        }

        for (Friend friendRequest : friendRepository.findAllByFromMember_Id(friend.getId())) {
            if (friendRequest.getToMember() == member && !friendRequest.isFriend()) {
                friendRequest.setFriend(true);
            }
        }

    }

    /**
     * 친구 거절
     *
     * @param memberId
     * @param requestDto
     */
    @Override
    public void rejectFriend(int memberId, FriendRequestDto requestDto) {
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );
        Member friend = memberRepository.findByNickname(requestDto.getNickname()).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );

        Friend friendRelation = friendRepository.findRelation(friend, member).orElseThrow(
                () -> new CustomException(ErrorCode.NO_FRIEND_REQUEST_FROM)
        );
        //이미 친구라면
        if (friendRelation.isFriend()) {
            throw new CustomException(ErrorCode.EXISTING_FRIEND);
        }
        //친구 요청 삭제
        for (Friend friendRequest : friendRepository.findAllByFromMember_Id(friend.getId())) {
            if (friendRequest.getToMember() == member) {
                friendRepository.delete(friendRequest);
                break;
            }
        }
    }

    /**
     * 친구 삭제
     *
     * @param memberId
     * @param requestDto
     */
    @Override
    public void deleteFriend(int memberId, FriendRequestDto requestDto) {
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );
        Member friend = memberRepository.findByNickname(requestDto.getNickname()).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );

        //친구 -> 나 요청 보낸 경우
        Optional<Friend> friendRelation = friendRepository.findRelation(friend, member);

        if (friendRelation.isPresent()) {
            if (!friendRelation.get().isFriend()) { //친구 X
                throw new CustomException(ErrorCode.NOT_FRIEND);
            } else { //친구 O
                friendRepository.delete(friendRelation.get());
            }
        } else { // 친구 -> 나 요청 X
            // 나 -> 친구 요청 보낸 경우
            Optional<Friend> friendReverseRelation = friendRepository.findReverseRelation(friend, member);
            if (friendReverseRelation.isPresent()) {
                if (!friendReverseRelation.get().isFriend()) { //친구 X
                    throw new CustomException(ErrorCode.NOT_FRIEND);
                } else { //친구 O
                    friendRepository.delete(friendReverseRelation.get());
                }
            } else { //요청 X
                throw new CustomException(ErrorCode.NO_FRIEND_REQUEST_FROM);
            }
        }

    }

    /**
     * 친구 목록
     *
     * @param memberId
     * @return
     */
    public List<MemberResponseDto> getFriendList(int memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );
        List<MemberResponseDto> responseDtoList = new ArrayList<>();

        for (Friend friendRequest : friendRepository.findAllFriend(member)) {
            //친구 여부
            if (friendRequest.isFriend()) {
                //내가 보낸 요청이라면
                if (friendRequest.getFromMember().getId() == memberId) {
                    Member friend = friendRequest.getToMember(); //친구
                    MemberResponseDto responseDto = MemberResponseDto.of(friend);
                    responseDtoList.add(responseDto);
                }
                else if (friendRequest.getToMember().getId() == memberId) { //내가 받은 요청이라면
                    Member friend = friendRequest.getFromMember(); //친구
                    MemberResponseDto responseDto = MemberResponseDto.of(friend);
                    responseDtoList.add(responseDto);
                }

            }
        }
        return responseDtoList;
    }

    /**
     * 친구 요청 목록
     *
     * @param memberId
     * @return
     */
    @Override
    public List<MemberResponseDto> getRequestList(int memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );
        List<MemberResponseDto> responseDtoList = new ArrayList<>();

        for (Friend friend : friendRepository.findAllByToMember_Id(memberId)) {
            //해당 회원으로 요청 보낸 회원들
            MemberResponseDto responseDto = MemberResponseDto.of(friend.getFromMember());
            responseDtoList.add(responseDto);
        }
        return responseDtoList;
    }
}
