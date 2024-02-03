package com.ssafy.todak.goal.repository;

import com.ssafy.todak.goal.domain.Goal;
import com.ssafy.todak.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Integer>{
        Goal findByColor(String color);

        List<Goal> findByMember(Member member);

    }
