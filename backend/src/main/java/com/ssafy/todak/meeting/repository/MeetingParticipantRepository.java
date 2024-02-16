package com.ssafy.todak.meeting.repository;

import com.ssafy.todak.meeting.domain.Meeting;
import com.ssafy.todak.meeting.domain.MeetingParticipant;
import com.ssafy.todak.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;


public interface MeetingParticipantRepository extends JpaRepository<MeetingParticipant, Integer> {
    MeetingParticipant findByMember(Member member);

    @Modifying
    @Query("delete from MeetingParticipant m where m.meeting = :meeting and m.member = :member")
    int deleteByMeetingAndMember(Meeting meeting, Member member);
}
