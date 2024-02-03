package com.ssafy.todak.meeting.domain;

import com.ssafy.todak.common.BaseEntity;
import com.ssafy.todak.goal.domain.Todo;
import com.ssafy.todak.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Meeting extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meeting_id")
    private int id;

    @Column(name = "meeting_title", nullable = false)
    private String title;

    @Column(name = "meeting_content")
    private String content;

    private int memberCnt; //현재인원

    private int totalMemberCnt; //최대인원

    private int maxTime; //최대시간

    private String password;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder.Default
    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL)
    private List<MeetingParticipant> meetingParticipantList = new ArrayList<>();

}
