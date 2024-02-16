package com.ssafy.todak.goal.domain;


import com.ssafy.todak.friend.domain.Friend;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GoalFriend {

    @EmbeddedId
    private GoalFriendId goalFriendId;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("friendId")
    @JoinColumn(name = "friend_id")
    private Friend friend;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("goalId")
    @JoinColumn(name = "goal_id")
    private Goal goal;


}
