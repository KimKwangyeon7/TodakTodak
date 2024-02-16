package com.ssafy.todak.notification.domain;


import com.ssafy.todak.common.BaseEntity;
import com.ssafy.todak.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private int id;

    @Column(nullable = false)
    private int type; //0:친구요청 / 1:댓글 / 2:채팅

    @Column(columnDefinition = "boolean default false")
    private boolean isChecked; //알람 확인 여부

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

}
