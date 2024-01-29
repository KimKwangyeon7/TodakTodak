package com.ssafy.todak.goal.dto.response;

import com.ssafy.todak.goal.domain.Goal;
import com.ssafy.todak.friend.domain.Friend;
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
    private List<String> friendList; // 목표 공개할 친구 리스트
    private int status;

    public GoalResponseDto(Goal goal) {
        this.id = goal.getId();
        this.content = goal.getContent();
        this.color = goal.getColor();

        List<String> goalFriendList = new ArrayList<>();
        for (int i = 0; i < goal.getGoalFriendList().size(); i++){
            Friend friend = goal.getGoalFriendList().get(i).getFriend();
            if (friend.isFriend()){
                if (friend.getFromMember().getId() == goal.getMember().getId()){
                    goalFriendList.add(friend.getToMember().getNickname());
                } else{
                    goalFriendList.add(friend.getFromMember().getNickname());
                }
            }
        }
        this.friendList = goalFriendList;
        this.status = goal.getStatus();
    }
}
