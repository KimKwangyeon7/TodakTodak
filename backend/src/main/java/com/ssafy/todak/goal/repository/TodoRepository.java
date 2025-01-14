package com.ssafy.todak.goal.repository;

import com.ssafy.todak.batch.dto.TodoScheduleDto;
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

    List<Todo> findTodosByGoal(Goal goal);

    List<Todo> findByMember(Member member);

    @Query("select t from Todo t where t.goal = :goal and t.todoDate = :todoDate")
    List<Todo> findTodosByGoalAndTodoDate(@Param("goal") Goal goal, @Param("todoDate") String todoDate);

    @Query("select t from Todo t where t.goal = :goal and  substring(t.todoDate, 5, 2) = :month")
    List<Todo> findTodosByGoalAndMonth(@Param("goal") Goal goal, @Param("month") String month);

    @Query("select t from Todo t where t.goal = :goal and  t.todoDate = :todoDate")
    List<Todo> findTodosByGoalAndDay(@Param("goal") Goal goal, @Param("todoDate") String todoDate);


    @Query("select distinct  t " +
            "from Todo t " +
            "join fetch t.alarmList al " +  // alarmList를 쿼리에서 함께 가져옴(fetch join)
            "where t.member = :member " +
            "and t.todoDate = :str " +
            "and al.time >= :str2 " +
            "and al.isAlarmed = true " +
            "order by al.time")
    List<Todo> findAlarmByTime(@Param("member") Member member, @Param("str") String str, @Param("str2") String str2);
}
