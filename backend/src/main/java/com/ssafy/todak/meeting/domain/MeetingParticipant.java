package com.ssafy.todak.meeting.domain;

import com.ssafy.todak.goal.domain.Goal;
import com.ssafy.todak.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MeetingParticipant {

    @EmbeddedId
    private Participant participant;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("memberId")
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("meetingId")
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;
}
