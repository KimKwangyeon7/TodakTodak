package com.ssafy.todak.goal.domain;


import com.ssafy.todak.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Builder
public class Alarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_id")
    private int id;

    private int day; // 월~일 - 0~6

    private String time; // 시간 hhmm 형식

    @Column(columnDefinition = "boolean default false")
    private boolean isOutside; // 외출 여부

    @Column(columnDefinition = "boolean default false")
    private boolean isAlarmed; // 알람 여부

    @Column(columnDefinition = "boolean default false")
    private boolean isChecked; // 알람 확인 여부

    @Column(columnDefinition = "boolean default false")
    private boolean isCompleted; // 완료 여부

    private String text; // tts 음성 문구

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "todo_id")
    private Todo todo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "habit_id")
    private Habit habit;
}
