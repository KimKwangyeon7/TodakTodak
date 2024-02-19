package com.ssafy.todak.goal.repository;

import com.ssafy.todak.batch.dto.HabitScheduleDto;
import com.ssafy.todak.goal.domain.Alarm;
import com.ssafy.todak.goal.domain.Habit;
import com.ssafy.todak.member.domain.Member;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Integer> {

    Optional<Alarm> findAlarmByTodo_Id(int todoId);

    @Query("select a from Alarm a where a.habit = :habit")
    List<Alarm> findAlarmByHabit(Habit habit);

    @Query("select a " +
            "from Alarm a " +
            "join fetch a.habit h " +
            "where a.member = :member " +
            "and a.day = :day " +
            "and a.time >= :timeStr " +
            "and a.isAlarmed = true " +
            "and a.id is not null " +
            "order by a.time")
    List<Alarm> findAlarmByTime(@Param("member") Member member, @Param("day") int day, @Param("timeStr") String timeStr);
}
