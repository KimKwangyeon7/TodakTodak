package com.ssafy.todak.goal.domain;


import com.ssafy.todak.chat.domain.ChatMessage;
import com.ssafy.todak.common.BaseEntity;
import com.ssafy.todak.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Goal extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goal_id")
    private int id;

    @Column(name = "goal_content", nullable = false)
    private String content; //내용

    @Column(nullable = false)
    private String color;

    private int status; //0:진행, 1:완료

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder.Default
    @OneToMany(mappedBy = "goal", cascade = CascadeType.ALL)
    private List<GoalFriend> goalFriendList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "goal", cascade = CascadeType.ALL)
    private List<Todo> todoList = new ArrayList<>();
}
