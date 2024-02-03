package com.ssafy.todak.meeting.repository;

import com.ssafy.todak.meeting.domain.Meeting;
import com.ssafy.todak.member.domain.Member;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Integer> {
    @Query("select m from Meeting m where m.member = :member")
    List<Meeting> findByMember(Member member);

    @Query("select m from Meeting m where m.title like %:title%")
    Optional<List<Meeting>> findByTitle(@Param("title") String title);
}
