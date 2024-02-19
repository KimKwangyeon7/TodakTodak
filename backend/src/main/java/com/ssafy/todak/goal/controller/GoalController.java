package com.ssafy.todak.goal.controller;

import com.ssafy.todak.common.WeatherLoader;
import com.ssafy.todak.goal.domain.Alarm;
import com.ssafy.todak.goal.domain.Goal;
import com.ssafy.todak.goal.domain.Habit;
import com.ssafy.todak.goal.domain.Todo;
import com.ssafy.todak.goal.dto.request.*;
import com.ssafy.todak.goal.dto.response.AlarmResponseDto;
import com.ssafy.todak.goal.dto.response.GoalResponseDto;
import com.ssafy.todak.goal.dto.response.HabitResponseDto;
import com.ssafy.todak.goal.dto.response.TodoResponseDto;
import com.ssafy.todak.goal.repository.GoalRepository;
import com.ssafy.todak.goal.repository.HabitRepository;
import com.ssafy.todak.goal.repository.TodoRepository;
import com.ssafy.todak.goal.service.GoalService;
import com.ssafy.todak.member.common.MemberLoader;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.text.ParseException;
import java.time.LocalDate;

import java.time.format.DateTimeFormatter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/goals")
@RequiredArgsConstructor
@Log4j2
public class GoalController {
    private final GoalService goalService;
    private final MemberLoader memberLoader;
    private final TodoRepository todoRepository;
    private final GoalRepository goalRepository;
    private final HabitRepository habitRepository;
    private final WeatherLoader weatherLoader;

    @PostMapping("")
    public ResponseEntity<String> createGoal(@RequestBody GoalCreateRequestDto goalCreateInfo) {
        int memberId = memberLoader.getId();
        log.info("goalCreateInfo {}", goalCreateInfo);
        goalService.createGoal(memberId, goalCreateInfo);
        goalService.createGoalFriend(memberId, goalCreateInfo);
        return ResponseEntity.status(200).body("Success");
    }

    @GetMapping("")
    public ResponseEntity<List<GoalResponseDto>> getGoalList() {

        int memberId = memberLoader.getId();

        List<GoalResponseDto> goals = new ArrayList<>();
        List<Goal> goalList = goalService.getGoalList(memberId);

        for (Goal goal : goalList) {
            GoalResponseDto goalResponseDto = new GoalResponseDto(memberLoader.getMember().getNickname(), goal.getId(), goal.getContent(), goal.getColor(), goal.getGoalFriendList(), goal.getStatus());
            goals.add(goalResponseDto);
        }
//        List<GoalResponseDto> goals = goalService.getGoalList(memberId)
//                .stream()
//                .map(GoalResponseDto::new)
//                .collect(Collectors.toList());
        return ResponseEntity.ok(goals);
    }

    @GetMapping("/{goalId}")
    public ResponseEntity<GoalResponseDto> getGoalDetail(@PathVariable int goalId) {
        Goal goal = goalService.getGoalDetail(goalId);
        GoalResponseDto goalResponseDto = new GoalResponseDto(memberLoader.getNickname(), goal.getId(), goal.getContent(), goal.getColor(), goal.getGoalFriendList(), goal.getStatus());

        return ResponseEntity.ok(goalResponseDto);
    }

    @PutMapping("/{goalId}")
    public ResponseEntity<GoalResponseDto> modifyGoal(@PathVariable int goalId, @RequestBody GoalModifyRequestDto goalModifyInfo) {
        Goal goal = goalService.modifyGoal(goalId, goalModifyInfo);
        GoalResponseDto goalResponseDto = new GoalResponseDto(memberLoader.getNickname(), goal.getId(), goal.getContent(), goal.getColor(), goal.getGoalFriendList(), goal.getStatus());
        return ResponseEntity.ok(goalResponseDto);
    }

    @DeleteMapping("/{goalId}")
    public ResponseEntity<String> deleteGoal(@PathVariable int goalId) {
        goalService.deleteGoal(goalId);
        return ResponseEntity.status(200).body("Success");
    }

    @PostMapping("/{goalId}/todos")
    public ResponseEntity<String> createTodo(@PathVariable int goalId, @RequestParam  String todoDate, @RequestBody TodoCreateRequestDto todoCreateRequestDto) throws ParseException {
        int memberId = memberLoader.getId();

        goalService.createTodo(memberId, goalId, todoDate, todoCreateRequestDto);
        goalService.createTodoAlarm(memberId, todoCreateRequestDto);
        return ResponseEntity.status(200).body("Success");
    }

    @GetMapping("/todos/date/{todoDate}")
    public ResponseEntity<List<TodoResponseDto>> getTodoListByDate(@PathVariable String todoDate) {
        int memberId = memberLoader.getId();
        //LocalDateTime todoDateTime = LocalDateTime.parse(todoDate, DateTimeFormatter.ofPattern("yyyyMMdd"));
        List<Todo> todoList = goalService.getTodoListByDate(memberId, todoDate);
        List<TodoResponseDto> todoResponseList = todoList.stream().map(TodoResponseDto::new).collect(Collectors.toList());
        return ResponseEntity.ok(todoResponseList);
    }

    @GetMapping("/todos/color/{goalId}")
    public ResponseEntity<List<TodoResponseDto>> getTodoListByGoal(@PathVariable int goalId) {
        int memberId = memberLoader.getId();
        List<Todo> todoList = goalService.getTodoListByGoal(memberId, goalId);
        List<TodoResponseDto> todoResponseList = todoList.stream().map(TodoResponseDto::new).collect(Collectors.toList());
        return ResponseEntity.ok(todoResponseList);
    }

    @GetMapping("/todos/month/{month}")
    public ResponseEntity<List<TodoResponseDto>> getTodoListByMonth(@PathVariable int month) {
        int memberId = memberLoader.getId();
        List<Todo> todoList = goalService.getTodoListByMonth(memberId, month);
        List<TodoResponseDto> todoResponseList = todoList.stream().map(TodoResponseDto::new).collect(Collectors.toList());
        return ResponseEntity.ok(todoResponseList);
    }


    // 미완성 투두리스트만 가져오기,
    @PatchMapping("/todos/{todoId}/complete")
    public ResponseEntity<TodoResponseDto> isTodoCompleted(@PathVariable int todoId) {
        goalService.isTodoCompleted(todoId);
        Todo todo = todoRepository.findById(todoId).get();

        TodoResponseDto todoResponseDto = TodoResponseDto.builder()
                .id(todo.getId())
                .title(todo.getTitle())
                .content(todo.getContent())
                .time(todo.getAlarmList().get(0).getTime())
                .isImportant(todo.isImportant())
                .isAlarmed(todo.getAlarmList().get(0).isAlarmed())
                .isOutside(todo.getAlarmList().get(0).isOutside())
                .isChecked(todo.getAlarmList().get(0).isChecked())
                .todoDate(todo.getTodoDate())
                .build();

        return ResponseEntity.ok(todoResponseDto);
    }


    @GetMapping("/todos/{todoId}")
    public ResponseEntity<TodoResponseDto> getTodoDetail(@PathVariable int todoId) {
        Todo todo = goalService.getTodoDetail(todoId);
        TodoResponseDto todoResponseDto = new TodoResponseDto(todo);
        return ResponseEntity.ok(todoResponseDto);
    }

    @PutMapping("/todos/{todoId}")
    public ResponseEntity<TodoResponseDto> modifyTodo(@PathVariable int todoId, @RequestBody TodoCreateRequestDto todoCreateInfo) {
        Todo modifiedTodo = todoRepository.findById(goalService.modifyTodo(todoId, todoCreateInfo)).get();
        TodoResponseDto todoResponseDto = new TodoResponseDto(modifiedTodo);
        return ResponseEntity.ok(todoResponseDto);
    }

    @DeleteMapping("/todos/{todoId}")
    public ResponseEntity<String> deleteTodo(@PathVariable int todoId) {
        goalService.deleteGoal(todoId);
        return ResponseEntity.status(200).body("Success");
    }

    @PostMapping("/habits")
    public ResponseEntity<List<HabitResponseDto>> createHabit(@RequestBody HabitCreateRequestDto habitCreateInfo) {
        int memberId = memberLoader.getId();

        // 습관 생성
        goalService.createHabit(memberId, habitCreateInfo);
        goalService.createHabitAlarm(memberId, habitCreateInfo);


        // 습관 목록 반환
        List<Habit> habitList = goalService.getHabitList(memberId);
        List<HabitResponseDto> habitResponseList = habitList.stream().map(HabitResponseDto::new).collect(Collectors.toList());

        return ResponseEntity.ok(habitResponseList);
    }


    @GetMapping("/habits")
    public ResponseEntity<List<HabitResponseDto>> getHabitList() {
        int memberId = memberLoader.getId();
        List<Habit> habitList = goalService.getHabitList(memberId);
        List<HabitResponseDto> habitResponseList = habitList.stream().map(HabitResponseDto::new).collect(Collectors.toList());
        return ResponseEntity.ok(habitResponseList);
    }

    @GetMapping("/habits/day/{day}")
    public ResponseEntity<List<HabitResponseDto>> getHabitListByDay(@PathVariable int day) {
        int memberId = memberLoader.getId();
        return ResponseEntity.ok(goalService.getHabitListByDay(memberId, day));
    }

    @PatchMapping("/habits/{alarmId}/complete")
    public ResponseEntity<List<HabitResponseDto>> isHabitCompleted(@PathVariable int alarmId) {
        goalService.isHabitCompleted(alarmId);

        int memberId = memberLoader.getId();
        List<Habit> habitList = goalService.getHabitList(memberId);
        List<HabitResponseDto> habitResponseList = habitList.stream().map(HabitResponseDto::new).collect(Collectors.toList());
        return ResponseEntity.ok(habitResponseList);
    }

    @GetMapping("/habits/{habitId}")
    public ResponseEntity<HabitResponseDto> getHabitDetail(@PathVariable int habitId) {
        Habit habit = goalService.getHabitDetail(habitId);
        HabitResponseDto habitResponseDto = new HabitResponseDto(habit);
        return ResponseEntity.ok(habitResponseDto);
    }

    @GetMapping("/habits/alarms/{alarmId}")
    public ResponseEntity<AlarmResponseDto> getHabitAlarmDetail(@PathVariable int alarmId) {
        Alarm alarm = goalService.getHabitAlarmDetail(alarmId);
        AlarmResponseDto alarmResponseDto = new AlarmResponseDto(alarm);
        return ResponseEntity.ok(alarmResponseDto);
    }

    @PutMapping("/habits/{habitId}")
    public ResponseEntity<HabitResponseDto> modifyHabit(@PathVariable int habitId, @RequestBody HabitModifyRequestDto habitDto) {
        int memberId = memberLoader.getId();
        Habit modifiedHabit = habitRepository.findById(goalService.modifyHabit(memberId, habitId, habitDto)).get();
        HabitResponseDto habitResponseDto = new HabitResponseDto(modifiedHabit);
        return ResponseEntity.ok(habitResponseDto);
    }

    @DeleteMapping("/habits/{habitId}")
    public ResponseEntity<String> deleteHabit(@PathVariable int habitId) {
        goalService.deleteHabit(habitId);
        return ResponseEntity.status(200).body("Success");
    }

    // ----------------------------------------------------------------------------------------------
    // 마이페이지 - 성취율
    // 1. 일 단위 투두리스트 성취율 => 특정 월의 매일 성취율 map에 담음 + 해당 날에 투두리스트가 없다면 -1 반환
    @GetMapping("/todos/achievement/day/{month}")
    public ResponseEntity<Map<Integer, Double>> getTodoAchievementRateDay(@PathVariable int month) {
        int memberId = memberLoader.getId();
        Map<Integer, Double> map = new HashMap<>();

        // 입력받은 월의 첫날부터 시작
        LocalDate startDate = LocalDate.of(LocalDate.now().getYear(), month, 1);

        // 입력받은 월의 마지막 날까지 반복
        while (startDate.getMonthValue() == month) {
            List<Todo> todoList = goalService.getTodoListByDate(memberId, startDate.format(DateTimeFormatter.ofPattern("yyyyMMdd")));

            int N = 0;
            if (todoList != null) {
                N = todoList.size();
                int completedCount = 0;
                for (int i = 0; i < N; i++){
                    if (todoList.get(0).getAlarmList().get(0).isChecked()){
                        completedCount++;
                    }
                }

                double achievementRate = N > 0 ? (double) completedCount / N * 100 : -1.0;
                map.put(startDate.getDayOfMonth(), achievementRate);
            } else {
                // 특정 날짜에 투두리스트가 없는 경우
                map.put(startDate.getDayOfMonth(), -1.0);
            }
            // 다음 날짜로 이동
            startDate = startDate.plusDays(1);
        }
        return ResponseEntity.ok(map);
    }


    // 2. 월 단위 투두리스트 성취율 = > 1 ~ 12 월 성취율 map에 담음 + 해당 월에 투두리스트가 없다면 -1 반환
    @GetMapping("/todos/achievement/month")
    public ResponseEntity<Map<Integer, Double>> getTodoAchievementRateByMonth() {
        int memberId = memberLoader.getId();
        Map<Integer, Double> map = new HashMap<>();

        for (int month = 1; month <= 12; month++) { // 월별로 성취율 구하기
            List<Todo> todoList = goalService.getTodoListByMonth(memberId, month);
            int N = 0;
            if (todoList == null || todoList.isEmpty()) {
                // 특정 월에 투두리스트가 없는 경우
                map.put(month, -1.0); // 성취율을 -1로 설정하여 표시
                continue;
            }

            int completedCount = 0;
            for (Todo todo : todoList) {
                if (todo.getAlarmList() != null && todo.getAlarmList().get(0).isChecked()) {
                    completedCount++;
                }
            }
            double achievementRate = (double) completedCount / todoList.size() * 100;
            map.put(month, achievementRate);
        }
        return ResponseEntity.ok(map);
    }

    // 3 . 특정 목표의 투두리스트의 매일 성취율 구하기
    @GetMapping("/todos/achievement/day/{goalId}/{month}")
    public ResponseEntity<Map<Integer, Double>> getGoalTodoAchievementRateDaily(@PathVariable int goalId, @PathVariable int month) {
        int memberId = memberLoader.getId();
        Map<Integer, Double> map = new HashMap<>();

        // 입력받은 월의 첫날부터 시작
        LocalDate startDate = LocalDate.of(LocalDate.now().getYear(), month, 1);

        // 입력받은 월의 마지막 날까지 반복
        while (startDate.getMonthValue() == month) {
            String str = startDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
            List<Todo> todoList = todoRepository.findTodosByGoalAndDay(goalRepository.findById(goalId).get(), str);

            int N = 0;
            if (todoList != null) {
                N = todoList.size();
                int completedCount = 0;
                for (int i = 0; i < N; i++){
                    if (todoList.get(0).getAlarmList().get(0).isChecked()){
                        completedCount++;
                    }
                }

                double achievementRate = N > 0 ? (double) completedCount / N * 100 : -1.0;
                map.put(startDate.getDayOfMonth(), achievementRate);
            } else {
                // 특정 날짜에 투두리스트가 없는 경우
                map.put(startDate.getDayOfMonth(), -1.0);
            }
            // 다음 날짜로 이동
            startDate = startDate.plusDays(1);
        }
        return ResponseEntity.ok(map);
    }

    // 4. 특정 목표의 투두리스트의 월별 성취율 구하기
    @GetMapping("/todos/achievement/month/{goalId}")
    public ResponseEntity<Map<Integer, Double>> getGoalTodoAchievementRateByMonth(@PathVariable int goalId) {
        int memberId = memberLoader.getId();
        Map<Integer, Double> map = new HashMap<>();

        for (int month = 1; month <= 12; month++) {
            String str = String.valueOf(month);
            if (month < 10) {
                str = "0" + str;
            }
            List<Todo> todoList = todoRepository.findTodosByGoalAndMonth(goalRepository.findById(goalId).get(), str);
            int N = 0;
            if (todoList == null || todoList.isEmpty()) {
                // 특정 월에 투두리스트가 없는 경우
                map.put(month, -1.0); // 성취율을 -1로 설정하여 표시
                continue;
            }

            int completedCount = 0;
            for (Todo todo : todoList) {
                if (todo.getAlarmList() != null && todo.getAlarmList().get(0).isChecked()) {
                    completedCount++;
                }
            }
            double achievementRate = (double) completedCount / todoList.size() * 100;
            map.put(month, achievementRate);
        }
        return ResponseEntity.ok(map);
    }

    //5. 특정 날짜의 목표별 투두리스트 보여주기
//    @GetMapping("/todos/color/day/{goalId}")
//    public ResponseEntity<List<TodoResponseDto>> getGoalTodoListByDate(@PathVariable int goalId, @RequestParam String todoDate) {
//        int memberId = memberLoader.getId();
//        List<Todo> todoList =  todoRepository.findTodosByGoalAndTodoDate(goalRepository.findById(goalId).get(), todoDate);
//        List<TodoResponseDto> todoResponseList = todoList.stream().map(TodoResponseDto::new).collect(Collectors.toList());
//        return ResponseEntity.ok(todoResponseList);
//    }


    @PutMapping("/alarms/{alarmId}")
    public ResponseEntity<String> customizeTTS(@PathVariable int alarmId, @RequestParam String text){
        goalService.customizeTTS(alarmId, text);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/weather")
    public ResponseEntity<Map<String, Object>> getWeather(){
        String url = weatherLoader.getWeatherString();
        return ResponseEntity.ok(weatherLoader.parseWeather(url));
    }

}
