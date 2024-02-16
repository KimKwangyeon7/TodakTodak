package com.ssafy.todak.goal.repository;

import com.ssafy.todak.goal.domain.Alarm;
import com.ssafy.todak.goal.domain.Habit;
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
}
