package com.ssafy.todak.goal.domain;

import com.ssafy.todak.friend.domain.Friend;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Embeddable
public class GoalFriendId implements Serializable {
    @Column(name = "friend_id")
    private int friendId; // 친구 관계 ID

    @Column(name = "goal_id")
    private int goalId; // 공유할 목표 ID
}