package com.ssafy.todak.record.domain;

import com.ssafy.todak.common.BaseEntity;
import com.ssafy.todak.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
@Builder
public class Record extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_id")
    private int id;

    @Column(nullable = false)
    private String name;

    private String memo;

    @Column(columnDefinition = "boolean default false")
    private boolean isUsed; // 사용 여부

    @Column(columnDefinition = "boolean default false")
    private boolean isAvailable; // 가능 여부 (학습 다 됐는지)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
}
