package com.ssafy.todak.goal.service;

import com.ssafy.todak.goal.domain.Alarm;
import com.ssafy.todak.goal.domain.Goal;
import com.ssafy.todak.goal.domain.Habit;
import com.ssafy.todak.goal.domain.Todo;
import com.ssafy.todak.goal.dto.request.GoalCreateRequestDto;
import com.ssafy.todak.goal.dto.request.GoalModifyRequestDto;
import com.ssafy.todak.goal.dto.request.HabitCreateRequestDto;
import com.ssafy.todak.goal.dto.request.TodoCreateRequestDto;
import com.ssafy.todak.goal.dto.response.HabitResponseDto;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.List;

public interface GoalService {
    void createGoal(int memberId, GoalCreateRequestDto goalCreateInfo); // 목표 생성

    Goal createGoalFriend(int memberId, GoalCreateRequestDto goalCreateInfo);

    List<Goal> getGoalList(int memberId);

    Goal getGoalDetail(int goalId);

    Goal modifyGoal(int goalId, GoalModifyRequestDto goalModifyRequestDto);

    void deleteGoal(int goalId);

    void createTodo(int memberId, int goalId, String todoDate, TodoCreateRequestDto todoCreateInfo);

    Todo createTodoAlarm(int memberId, TodoCreateRequestDto todoCreateInfo) throws ParseException;

    List<Todo> getTodoListByDate(int memberId, String todoDate);

    List<Todo> getTodoListByGoal(int memberId, int goalId);

    List<Todo> getTodoListByMonth(int memberId, int month);

    void isTodoCompleted(int todoId);

    Todo getTodoDetail(int todoId);

    Todo modifyTodo(int todoId, TodoCreateRequestDto todoCreateInfo);

    void deleteTodo(int todoId);

    void createHabit(int memberId, HabitCreateRequestDto habitCreateInfo); // 습관 생성

    Habit createHabitAlarm(int memberId, HabitCreateRequestDto habitCreateInfo);

    List<Habit> getHabitList(int memberId);

    List<HabitResponseDto> getHabitListByDay(int memberId, int day);

    Habit isHabitCompleted(int habitId, int alarmId);

    Habit getHabitDetail(int habitId);

    Alarm getHabitAlarmDetail(int alarmId);

    Habit modifyHabit(int habitId, HabitCreateRequestDto habitCreateInfo);

    void deleteHabit(int habitId);
}
