package com.ssafy.todak.friend.domain;


import com.ssafy.todak.common.BaseEntity;
import com.ssafy.todak.goal.domain.GoalFriend;
import com.ssafy.todak.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Builder
public class Friend extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "friend_id")
    private int id;

    @Column(columnDefinition = "boolean default false")
    private boolean isFriend; // 친구 여부 - 요청할 때는 false / 요청을 수락하면 true로, 거절하면 레코드 삭제

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_member_id")
    private Member fromMember; // 요청 보낸 회원

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_member_id")
    private Member toMember; // 요청 받은 회원

    @Builder.Default
    @OneToMany(mappedBy = "friend", cascade = CascadeType.ALL)
    private List<GoalFriend> goalFriendList = new ArrayList<>();

    public Friend(Member member, Member friend) {
        this.fromMember = member;
        this.toMember = friend;
        this.isFriend = false;
    }
    public Friend(Member member, Member friend, boolean isFriend) {
        this.fromMember = member;
        this.toMember = friend;
        this.isFriend = true;
    }
}
