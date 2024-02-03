package com.ssafy.todak.friend.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.ssafy.todak.exception.CustomException;
import com.ssafy.todak.exception.ErrorCode;
import com.ssafy.todak.fcm.FCMService;
import com.ssafy.todak.fcm.FCMTokenManager;
import com.ssafy.todak.friend.domain.Friend;
import com.ssafy.todak.friend.dto.request.FriendRequestDto;
import com.ssafy.todak.friend.repository.FriendRepository;
import com.ssafy.todak.goal.domain.Goal;
import com.ssafy.todak.goal.domain.GoalFriend;
import com.ssafy.todak.goal.domain.GoalFriendId;
import com.ssafy.todak.goal.domain.Todo;
import com.ssafy.todak.goal.dto.response.GoalTodoResponseDto;
import com.ssafy.todak.goal.dto.response.TodoResponseDto;
import com.ssafy.todak.goal.repository.GoalFriendRepository;
import com.ssafy.todak.goal.repository.GoalRepository;
import com.ssafy.todak.goal.repository.TodoRepository;
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
    private final GoalRepository goalRepository;
    private final GoalFriendRepository goalFriendRepository;
    private final TodoRepository todoRepository;

    private final FCMTokenManager fcmTokenManager;
    private final FCMService fcmService;

    /**
     * 친구 프로필 조회
     *
     * @param memberId
     * @param nickname
     * @return
     */
    @Override
    public List<GoalTodoResponseDto> getFriendPage(int memberId, String nickname) {
        //사용자가 존재하는지
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );
        Member friend = memberRepository.findByNickname(nickname).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );
        //나 <-> 친구 관계가 맞는지 확인 (친구 아니면 기본 프로필)
        //친구 PK로 목표 가져오기 -> 목표 PK로 목표 친구 조회
        //친구 PK로 내가 친구의 공개범위에 속해있는지 확인

        Optional<Friend> friendRelationResult = friendRepository.findBothRelation(friend, member);
        List<GoalTodoResponseDto> goalTodoResponseDtoList = new ArrayList<>();

        if (friendRelationResult.isPresent()) { //친구 관계라면
            Friend friendRelation = friendRelationResult.get();
            if (!friendRelation.isFriend()) { //친구 아님 요청 상태만 있음
                throw new CustomException(ErrorCode.NOT_FRIEND);
            }
            //친구의 목표
            List<Goal> goalList = goalRepository.findByMember(friend);
            List<TodoResponseDto> todoList = new ArrayList<>();

            for (Goal goal : goalList) {
                List<GoalFriend> goalFriendList = goalFriendRepository.findByGoal(goal).get();
                //해당 목표에 공개된 친구 테이블의 PK
                for (GoalFriend goalFriend : goalFriendList) {
                    //해당 목표에 공개된 친구
                    Friend friend1 = friendRepository.findById(goalFriend.getGoalFriendId().getFriendId()).get();
                    if (friend1.getToMember() == friend) {
                        Member m = friend1.getFromMember();
                        if (m.getId() == memberId) { //공개그룹에 내가 속해있다면
                            GoalTodoResponseDto goalTodoResponseDto = new GoalTodoResponseDto();
                            goalTodoResponseDto.setMemberId(friend.getId());
                            goalTodoResponseDto.setGoalId(goal.getId()); //목표 set
                            goalTodoResponseDto.setMemo(friend.getMemo());
                            goalTodoResponseDto.setGoalContent(goal.getContent());
                            goalTodoResponseDto.setColor(goal.getColor());

                            for (Todo todo : todoRepository.findTodosByGoal(goal)) {
                                TodoResponseDto todoResponseDto = new TodoResponseDto();

                                todoResponseDto.setId(todo.getId());
                                todoResponseDto.setTitle(todo.getTitle());
                                todoResponseDto.setContent(todo.getContent());
                                todoResponseDto.setImportant(todo.isImportant());
                                todoResponseDto.setTime(todo.getAlarmList().get(0).getTime());
                                todoResponseDto.setOutside(todo.getAlarmList().get(0).isOutside());
                                todoResponseDto.setAlarmed(todo.getAlarmList().get(0).isAlarmed());

                                todoList.add(todoResponseDto);
                            }
                            goalTodoResponseDto.setTodoList(todoList);
                            goalTodoResponseDtoList.add(goalTodoResponseDto); //전체 리스트에 한 목표에 따른 투두리스트 저장
                        }
                    } else if (friend1.getFromMember() == friend) { //보낸사람이 친구라면
                        Member m = friend1.getToMember(); //나
                        if (m.getId() == memberId) { //공개그룹에 내가 속해있다면
                            GoalTodoResponseDto goalTodoResponseDto = new GoalTodoResponseDto();
                            goalTodoResponseDto.setMemberId(friend.getId());
                            goalTodoResponseDto.setGoalId(goal.getId()); //목표 set
                            goalTodoResponseDto.setMemo(friend.getMemo());
                            goalTodoResponseDto.setGoalContent(goal.getContent());
                            goalTodoResponseDto.setColor(goal.getColor());

                            for (Todo todo : todoRepository.findTodosByGoal(goal)) {
                                TodoResponseDto todoResponseDto = new TodoResponseDto();
                                todoResponseDto.setId(todo.getId());
                                todoResponseDto.setTitle(todo.getTitle());
                                todoResponseDto.setContent(todo.getContent());
                                todoResponseDto.setImportant(todo.isImportant());
                                todoResponseDto.setTime(todo.getTodoDate());
                                todoResponseDto.setOutside(todo.getAlarmList().get(0).isOutside());
                                todoResponseDto.setAlarmed(todo.getAlarmList().get(0).isAlarmed());

                                todoList.add(todoResponseDto);
                            }
                            goalTodoResponseDto.setTodoList(todoList);
                            goalTodoResponseDtoList.add(goalTodoResponseDto); //전체 리스트에 한 목표에 따른 투두리스트 저장
                        }
                    }
                }
            }
        } else { //친구 관계 X -> 닉네임이랑 메모
            GoalTodoResponseDto goalTodoResponseDto = new GoalTodoResponseDto();
            goalTodoResponseDto.setMemberId(friend.getId());
            goalTodoResponseDto.setNickname(friend.getNickname());
            goalTodoResponseDto.setMemo(friend.getMemo());

            goalTodoResponseDtoList.add(goalTodoResponseDto);
        }

        return goalTodoResponseDtoList;
    }

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
        String targetUserToken = fcmTokenManager.getToken(String.valueOf(friend.getId()));

        Optional.ofNullable(targetUserToken).ifPresent(token -> fcmService.sendMessage(
                token,
                "친구 요청!",
                member.getNickname() + "님이 친구 신청을 보냈습니다")
        );

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

        //친구가 나에게 친구 요청
        for (Friend friendRequest : friendRepository.findAllByFromMember_Id(friend.getId())) {
            if (friendRequest.getToMember() == member && !friendRequest.isFriend()) {
                friendRequest.setFriend(true); //친구 상태 TRUE

                //내가 친구의 요청을 승낙 -> 친구에게 친구됐다고 알림
                String targetUserToken = fcmTokenManager.getToken(String.valueOf(friend.getId()));

                Optional.ofNullable(targetUserToken).ifPresent(token -> fcmService.sendMessage(
                        token,
                        "친구 승낙!",
                        member.getNickname() + "님과 친구입니다.")
                );
            }
        }

    }

    /**
     * 친구 거절
     *
     * @param memberId
     * @param friendId
     */
    @Override
    public void rejectFriend(int memberId, int friendId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );
        Member friend = memberRepository.findById(friendId).orElseThrow(
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
     * @param friendId
     */
    @Override
    public void deleteFriend(int memberId, int friendId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );
        Member friend = memberRepository.findById(friendId).orElseThrow(
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
                } else if (friendRequest.getToMember().getId() == memberId) { //내가 받은 요청이라면
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
