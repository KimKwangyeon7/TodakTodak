package com.ssafy.todak.goal.domain;


import com.ssafy.todak.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;
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
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "todo_id")
    private int id;

    @Column(name = "todo_title", nullable = false)
    private String title;

    @Column(name = "todo_content", nullable = false)
    private String content;

    private String todoDate;

    @Column(columnDefinition = "boolean default false")
    private boolean isImportant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goal_id")
    private Goal goal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    //알람리스트
    @Builder.Default
    @OneToMany(mappedBy = "todo", cascade = CascadeType.ALL)
    private List<Alarm> alarmList = new ArrayList<>();
}
