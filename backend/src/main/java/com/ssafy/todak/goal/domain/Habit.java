package com.ssafy.todak.goal.domain;


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
public class Habit extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "habit_id")
    private int id;

    @Column(name = "habit_content", nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    //알람리스트
    @Builder.Default
    @OneToMany(mappedBy = "habit", cascade = CascadeType.ALL)
    private List<Alarm> alarmList = new ArrayList<>();

}

