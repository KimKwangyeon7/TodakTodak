package com.ssafy.todak.goal.repository;

import com.ssafy.todak.goal.domain.Goal;
import com.ssafy.todak.goal.domain.Todo;
import com.ssafy.todak.member.domain.Member;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Integer> {

    @Query("select t from Todo t where t.member = :member and t.todoDate = :todoDate") // 투두 실행일로 해당일 투두 목록 찾기
    List<Todo> findByTodoDate(@Param("member") Member member, @Param("todoDate") String todoDate);

    @Query("select t from Todo t where t.member = :member and t.goal = :goal")
    List<Todo> findByGoal(@Param("member") Member member, @Param("goal") Goal goal);

    List<Todo> findByMember(Member member);
}
