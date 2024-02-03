package com.ssafy.todak.goal.repository;

import com.ssafy.todak.goal.domain.Habit;
import com.ssafy.todak.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HabitRepository extends JpaRepository<Habit, Integer> {
    List<Habit> findByMember(Member member);
}
