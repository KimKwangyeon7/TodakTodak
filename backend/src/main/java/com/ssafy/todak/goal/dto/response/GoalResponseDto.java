package com.ssafy.todak.goal.dto.response;

import com.ssafy.todak.goal.domain.Goal;
import com.ssafy.todak.friend.domain.Friend;
import com.ssafy.todak.goal.domain.GoalFriend;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GoalResponseDto {
    private int id;
    private String content;
    private String color;
    private String writer;
    private List<String> friendList; // 목표 공개할 친구 리스트
    private int status;

    public GoalResponseDto(String writer, int id, String content, String color, List<GoalFriend> goalFriendList1, int status) {
        this.id = id;
        this.content = content;
        this.color = color;

        List<String> goalFriendList = new ArrayList<>();

        for (int i = 0; i < goalFriendList1.size(); i++) {
            Friend friend = goalFriendList1.get(i).getFriend();
            if (friend.isFriend()) {
                if (friend.getFromMember().getNickname().equals(writer)) {
                    goalFriendList.add(friend.getToMember().getNickname());
                } else {
                    goalFriendList.add(friend.getFromMember().getNickname());
                }
            }
        }
        this.friendList = goalFriendList;
        this.status = status;
    }
}
