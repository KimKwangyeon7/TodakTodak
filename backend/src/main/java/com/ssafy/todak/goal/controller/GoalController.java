package com.ssafy.todak.goal.controller;

import com.ssafy.todak.goal.domain.Goal;
import com.ssafy.todak.goal.domain.Habit;
import com.ssafy.todak.goal.domain.Todo;
import com.ssafy.todak.goal.dto.request.GoalCreateRequestDto;
import com.ssafy.todak.goal.dto.request.GoalModifyRequestDto;
import com.ssafy.todak.goal.dto.request.HabitCreateRequestDto;
import com.ssafy.todak.goal.dto.request.TodoCreateRequestDto;
import com.ssafy.todak.goal.dto.response.GoalResponseDto;
import com.ssafy.todak.goal.dto.response.HabitResponseDto;
import com.ssafy.todak.goal.dto.response.TodoResponseDto;
import com.ssafy.todak.goal.service.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/goals")
@RequiredArgsConstructor
public class GoalController {
    private final GoalService goalService;
    private int memberId = 1;

    @PostMapping("")
    public ResponseEntity<String> createGoal(@RequestBody GoalCreateRequestDto goalCreateInfo) {
        goalService.createGoal(memberId, goalCreateInfo);
        goalService.createGoalFriend(memberId, goalCreateInfo);
        return ResponseEntity.status(200).body("Success");
    }

    @GetMapping("")
    public ResponseEntity<List<GoalResponseDto>> getGoalList() {
        List<GoalResponseDto> goals = goalService.getGoalList(memberId)
                .stream()
                .map(GoalResponseDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(goals);
    }

    @GetMapping("/{goalId}")
    public ResponseEntity<GoalResponseDto> getGoalDetail(@PathVariable int goalId) {
        Goal goal = goalService.getGoalDetail(goalId);
        GoalResponseDto goalResponseDto = new GoalResponseDto(goal);

        return ResponseEntity.ok(goalResponseDto);
    }

    @PutMapping("/{goalId}")
    public ResponseEntity<GoalResponseDto> modifyGoal(@PathVariable int goalId, @RequestBody GoalModifyRequestDto goalModifyInfo) {
        Goal goal = goalService.modifyGoal(goalId, goalModifyInfo);
        GoalResponseDto goalResponseDto = new GoalResponseDto(goal);
        return ResponseEntity.ok(goalResponseDto);
    }

    @DeleteMapping("/{goalId}")
    public ResponseEntity<String> deleteGoal(@PathVariable int goalId) {
        goalService.deleteGoal(goalId);
        return ResponseEntity.status(200).body("Success");
    }

    @PostMapping("/todos")
    public ResponseEntity<String> createTodo(@RequestParam LocalDateTime todoDate, @RequestBody TodoCreateRequestDto todoCreateInfo) {
        goalService.createTodo(memberId, todoDate, todoCreateInfo);
        goalService.createTodoAlarm(memberId, todoCreateInfo);
        return ResponseEntity.status(200).body("Success");
    }

    @GetMapping("/todos/date/{todoDate}")
    public ResponseEntity<List<TodoResponseDto>> getTodoListByDate(@PathVariable String todoDate) {
        LocalDateTime todoDateTime = LocalDateTime.parse(todoDate, DateTimeFormatter.ofPattern("yyyyMMdd"));
        List<Todo> todoList = goalService.getTodoListByDate(memberId, todoDateTime);
        List<TodoResponseDto> todoResponseList = todoList.stream().map(TodoResponseDto::new).collect(Collectors.toList());
        return ResponseEntity.ok(todoResponseList);
    }

    @GetMapping("/todos/color/{goalId}")
    public ResponseEntity<List<TodoResponseDto>> getTodoListByGoal(@PathVariable int goalId) {
        List<Todo> todoList = goalService.getTodoListByGoal(memberId, goalId);
        List<TodoResponseDto> todoResponseList = todoList.stream().map(TodoResponseDto::new).collect(Collectors.toList());
        return ResponseEntity.ok(todoResponseList);
    }

    @GetMapping("/todos/month/{month}")
    public ResponseEntity<List<TodoResponseDto>> getTodoListByMonth(@PathVariable int month) {
        List<Todo> todoList = goalService.getTodoListByMonth(memberId, month);
        List<TodoResponseDto> todoResponseList = todoList.stream().map(TodoResponseDto::new).collect(Collectors.toList());
        return ResponseEntity.ok(todoResponseList);
    }

    @PatchMapping("/todos/{todoId}/complete")
    public ResponseEntity<String> isTodoCompleted(@PathVariable int todoId) {
        // Toggle the completion status of the specified TODO
        goalService.isTodoCompleted(todoId);
        return ResponseEntity.status(200).body("Success");
    }

    @GetMapping("/todos/{todoId}")
    public ResponseEntity<TodoResponseDto> getTodoDetail(@PathVariable int todoId) {
        Todo todo = goalService.getTodoDetail(todoId);
        TodoResponseDto todoResponseDto = new TodoResponseDto(todo);
        return ResponseEntity.ok(todoResponseDto);
    }

    @PutMapping("/todos/{todoId}")
    public ResponseEntity<TodoResponseDto> modifyTodo(@PathVariable int todoId, @RequestBody TodoCreateRequestDto todoCreateInfo) {
        Todo modifiedTodo = goalService.modifyTodo(todoId, todoCreateInfo);
        TodoResponseDto todoResponseDto = new TodoResponseDto(modifiedTodo);
        return ResponseEntity.ok(todoResponseDto);
    }

    @DeleteMapping("/todos/{todoId}")
    public ResponseEntity<String> deleteTodo(@PathVariable int todoId) {
        goalService.deleteGoal(todoId);
        return ResponseEntity.status(200).body("Success");
    }


    @PostMapping("/habits")
    public ResponseEntity<List<HabitResponseDto>> getHabitList() {
        List<Habit> habitList = goalService.getHabitList(memberId);
        List<HabitResponseDto> habitResponseList = habitList.stream().map(HabitResponseDto::new).collect(Collectors.toList());
        return ResponseEntity.ok(habitResponseList);
    }

    @PatchMapping("/habits/{habitId}/{alarmId}/complete")
    public ResponseEntity<String> isHabitCompleted(@PathVariable int habitId, @PathVariable int alarmId) {
        goalService.isHabitCompleted(habitId, alarmId);
        return ResponseEntity.status(200).body("Success");
    }

    @GetMapping("/habits/{habitId}")
    public ResponseEntity<HabitResponseDto> getHabitDetail(@PathVariable int habitId) {
        Habit habit = goalService.getHabitDetail(habitId);
        HabitResponseDto habitResponseDto = new HabitResponseDto(habit);
        return ResponseEntity.ok(habitResponseDto);
    }

    @PutMapping("/habits/{habitId}")
    public ResponseEntity<HabitResponseDto> modifyHabit(@PathVariable int habitId, @RequestBody HabitCreateRequestDto habitCreateInfo) {
        Habit modifiedHabit = goalService.modifyHabit(habitId, habitCreateInfo);
        HabitResponseDto habitResponseDto = new HabitResponseDto(modifiedHabit);
        return ResponseEntity.ok(habitResponseDto);
    }

    @DeleteMapping("/habits/{habitId}")
    public ResponseEntity<String> deleteHabit(@PathVariable int habitId) {
        goalService.deleteHabit(habitId);
        return ResponseEntity.status(200).body("Success");
    }
}
