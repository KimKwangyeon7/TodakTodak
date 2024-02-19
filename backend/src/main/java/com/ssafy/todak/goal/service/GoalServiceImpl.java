package com.ssafy.todak.goal.service;

import com.ssafy.todak.batch.event.HabitEvent;
import com.ssafy.todak.batch.event.TodoEvent;
import com.ssafy.todak.goal.domain.*;
import com.ssafy.todak.goal.dto.request.*;
import com.ssafy.todak.goal.dto.response.AlarmResponseDto;
import com.ssafy.todak.goal.dto.response.HabitResponseDto;
import com.ssafy.todak.goal.repository.*;
import com.ssafy.todak.friend.domain.Friend;
import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.friend.repository.FriendRepository;
import com.ssafy.todak.member.repository.MemberRepository;
import com.ssafy.todak.notification.scheduler.NotificationSchedulerService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class GoalServiceImpl implements GoalService {
    private final GoalRepository goalRepository;
    private final FriendRepository friendRepository;
    private final MemberRepository memberRepository;
    private final TodoRepository todoRepository;
    private final HabitRepository habitRepository;
    private final GoalFriendRepository goalFriendRepository;
    private final AlarmRepository alarmRepository;
    private final NotificationSchedulerService schedulerService;
    private final ApplicationEventPublisher eventPublisher;

    private int goalId;
    private int todoId;
    private int habitId;


    // 1. 목표
    @Override
    @Transactional
    public void createGoal(int memberId, GoalCreateRequestDto goalCreateInfo) {
        Goal goal = new Goal();
        System.out.println("목표정보: " + goalCreateInfo.toString());
        goal.setContent(goalCreateInfo.getContent());
        goal.setColor(goalCreateInfo.getColor());

        Member member = memberRepository.findById(memberId).get();
        goal.setMember(member);

        goalRepository.save(goal);
        goalId = goal.getId();
        System.out.println("goalId: " + goalId);
    }

    @Transactional
    @Override
    public Goal createGoalFriend(int memberId, GoalCreateRequestDto goalCreateInfo) {
        List<GoalFriend> goalFriendList = new ArrayList<>();
        Goal goal = goalRepository.findById(goalId).get();

        if (goalCreateInfo.getFriendList() == null) {
            goal.setGoalFriendList(null);
            return goalRepository.save(goal);
        }

        for (int i = 0; i < goalCreateInfo.getFriendList().size(); i++) {
            String friendNickname = goalCreateInfo.getFriendList().get(i);
            Member friendMember = memberRepository.findMemberByNickname(friendNickname).get();
            Member member = memberRepository.findById(memberId).get();
            Optional<Friend> result = friendRepository.findBothRelation(member, friendMember);
            System.out.println("----------------------------------------------");
            System.out.println(result.get());

            if (result.isPresent()) {
                Friend friendList = result.get();
                System.out.println(friendList);

                if (friendList.isFriend()) {
                    GoalFriend goalFriend = new GoalFriend();
                    GoalFriendId id = new GoalFriendId();
                    id.setGoalId(goalId);
                    id.setFriendId(friendList.getId());
                    goalFriend.setGoalFriendId(id);
                    goalFriend.setGoal(goalRepository.findById(id.getGoalId()).get());
                    goalFriend.setFriend(friendRepository.findById(id.getFriendId()).get());
                    goalFriendRepository.save(goalFriend);
                    goalFriendList.add(goalFriend);
                }
            }

        }


        goal.setGoalFriendList(goalFriendList);

        return goalRepository.save(goal);
    }

    @Transactional
    @Override
    public List<Goal> getGoalList(int memberId) { // 전체 목표 리스트 가져오기
        Member member = memberRepository.findById(memberId).get();

        return goalRepository.findByMember(member);
    }

    @Override
    public Goal getGoalDetail(int goalId) { // 목표 상세보기
        return goalRepository.findById(goalId).get();
    }

    @Override
    public Goal modifyGoal(int goalId, GoalModifyRequestDto goalModifyRequestDto) { // 목표 수정하기
        Goal goal = goalRepository.findById(goalId).get();
        goal.setColor(goalModifyRequestDto.getColor());
        goal.setStatus(goalModifyRequestDto.getStatus());
        goal.setContent(goalModifyRequestDto.getContent());

        List<GoalFriend> goalFriendList = new ArrayList<>();
        List<String> nicknameList = goalModifyRequestDto.getFriendList();
        if (nicknameList == null) {
            goal.setGoalFriendList(null);
            return goalRepository.save(goal);
        }
        for (int i = 0; i < nicknameList.size(); i++) {
            int nicknameId = memberRepository.findMemberByNickname(nicknameList.get(i)).get().getId();
            List<Friend> friendList = friendRepository.findByFromMember_IdOrToMember_Id(goal.getMember().getId(), nicknameId);
            int friendId = friendList.get(0).getId();

            GoalFriendId goalFriendId = new GoalFriendId();
            goalFriendId.setFriendId(friendId);
            goalFriendId.setGoalId(goalId);

            GoalFriend goalFriend = new GoalFriend();
            goalFriend.setGoalFriendId(goalFriendId);
            goalFriendList.add(goalFriend);
            goalFriendRepository.save(goalFriend);
        }
        goal.setGoalFriendList(goalFriendList);

        return goalRepository.save(goal);
    }

    @Transactional
    @Override
    public void deleteGoal(int goalId) {
        goalRepository.deleteById(goalId);
    }

    // ------------------------------------------------------------------------------------------------------
    // 2. 투두

    @Transactional
    @Override
    public void createTodo(int memberId, int goalId, String todoDate, TodoCreateRequestDto todoCreateInfo) {
        Todo todo = new Todo();
        System.out.println("투두정보: " + todoCreateInfo.toString());

        todo.setTitle(todoCreateInfo.getTitle());
        todo.setContent(todoCreateInfo.getContent());
        todo.setTodoDate(todoDate);
        todo.setGoal(goalRepository.findById(goalId).get());
        todo.setImportant(todoCreateInfo.isImportant());

        Member member = memberRepository.findById(memberId).get();
        todo.setMember(member);

        todoRepository.save(todo);
        todoId = todo.getId();
    }

    @Transactional
    @Override
    public void createTodoAlarm(int memberId, TodoCreateRequestDto todoCreateRequestDto) throws ParseException {
        List<Alarm> alarmList = new ArrayList<>();

        Alarm alarm = new Alarm();
        alarm.setAlarmed(todoCreateRequestDto.isAlarmed());
        alarm.setTodo(todoRepository.findById(todoId).get());
        alarm.setTime(todoCreateRequestDto.getTime());
        alarm.setOutside(todoCreateRequestDto.isOutside());

        Member member = memberRepository.findById(memberId).get();
        alarm.setMember(member);

        Todo todo = todoRepository.findById(todoId).get();
        alarm.setTodo(todo);
        alarmList.add(alarm);

//        schedulerService.updateAlarm(alarm.getId()); //스케줄링 알람

        alarmRepository.save(alarm);
        todo.setAlarmList(alarmList);
        todoRepository.save(todo);

        // TodoAddedEvent 발생
        TodoEvent todoEvent = new TodoEvent(this, todo);
        eventPublisher.publishEvent(todoEvent);
    }

    @Override
    public List<Todo> getTodoListByDate(int memberId, String todoDate) { // 날짜별 투두리스트 목록
        Member member = memberRepository.findById(memberId).get();
        //String customTodoDate = todoDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        return todoRepository.findByTodoDate(member, todoDate);
    }

    @Override
    public List<Todo> getTodoListByGoal(int memberId, int goalId) { // 목표별 투두리스트 목록
        Member member = memberRepository.findById(memberId).get();
        Goal goal = goalRepository.findById(goalId).get();
        return todoRepository.findByGoal(member, goal);
    }

    @Override
    public List<Todo> getTodoListByMonth(int memberId, int month) { // 월별 투두리스트 목록
        List<Todo> todoMonthList = new ArrayList<>();

        Member member = memberRepository.findById(memberId).get();
        List<Todo> todoList = todoRepository.findByMember(member);
        //System.out.println(todoList.stream().toList());

        String str = String.valueOf(month);
        if (month < 10) {
            str = "0" + str;
           // System.out.println(str);
        }

        if (todoList == null) {
            return null;
        }
        for (int i = 0; i < todoList.size(); i++) {
            if (todoList.get(i).getTodoDate().substring(4, 6).equals(str)) {
                todoMonthList.add(todoList.get(i));
            }
        }
        return todoMonthList;
    }

    @Override
    public void isTodoCompleted(int todoId) { // 투두 완료 여부 체크시 => 완료(T) -> 미완료(F) / 미완료 -> 완료
        Todo todo = todoRepository.findById(todoId).get();
        boolean a = todo.getAlarmList().get(0).isChecked();
        todo.getAlarmList().get(0).setChecked(!a);
        todoRepository.save(todo);
    }

    @Override
    public Todo getTodoDetail(int todoId) { // 투두 상세보기
        return todoRepository.findById(todoId).get();
    }

    @Override
    @Transactional
    public int modifyTodo(int todoId, TodoCreateRequestDto todoCreateInfo) { // 투두 수정하기
        Todo todo = todoRepository.findById(todoId).get();
        todo.setTitle(todoCreateInfo.getTitle());
        todo.setContent(todoCreateInfo.getContent());
        todo.setImportant(todoCreateInfo.isImportant());
        todo.getAlarmList().get(0).setAlarmed(todoCreateInfo.isAlarmed());
        todo.getAlarmList().get(0).setOutside(todoCreateInfo.isOutside());
        todo.getAlarmList().get(0).setTime(todoCreateInfo.getTime());

        todoRepository.save(todo);

        // TodoAddedEvent 발생
        TodoEvent todoAddedEvent = new TodoEvent(this, todo);
        eventPublisher.publishEvent(todoAddedEvent);
        eventPublisher.publishEvent(todo);

        return todoId;
    }

    //@Transactional
    @Override
    @Transactional
    public void deleteTodo(int todoId) { // 투두 삭제하기
//        Todo todo = todoRepository.findById(todoId).get();
//        Goal goal = goalRepository.findById(todo.getGoal().getId()).get();
//
//        List<Todo> todos = goal.getTodoList();
//        List<Todo> newTodos = new ArrayList<>();
//        if (todos != null){
//            for (int i = 0;i < todos.size(); i++){
//                if (todos.get(i).getId() != todoId){
//                    newTodos.add(todos.get(i));
//                }
//            }
//        }
//        todo.setGoal(null);
//        goal.setTodoList(newTodos);
        todoRepository.deleteById(todoId);
//        // TodoAddedEvent 발생
//        TodoEvent todoAddedEvent = new TodoEvent(this, todoRepository.findById(todoId).get());
//        eventPublisher.publishEvent(todoAddedEvent);
    }


//    @Scheduled(cron = "0 0 08 * * ?")
//    public void pushTodoAlarm(int todoId) {
//        //해당 투두에 알람이 설정되지 않았을 때
//        Alarm alarm = alarmRepository.findAlarmByTodo_Id(todoId).orElseThrow(
//                () -> new CustomException(ErrorCode.NO_ALARM_SET)
//        );
//        //알람 요일, 시간
//        int day = alarm.getDay();
//        String time = alarm.getTime();
//    }

    // ------------------------------------------------------------------------------------------------------
    // 3. 습관
    @Transactional
    @Override
    public void createHabit(int memberId, HabitCreateRequestDto habitCreateInfo) {
        Habit habit = new Habit();
        System.out.println("습관정보: " + habitCreateInfo.toString());

        habit.setContent(habitCreateInfo.getContent());

        Member member = memberRepository.findById(memberId).get();
        habit.setMember(member);

        habitRepository.save(habit);

        habitId = habit.getId();
    }

    @Transactional
    @Override
    public void createHabitAlarm(int memberId, HabitCreateRequestDto habitCreateInfo) {

        List<AlarmCreateRequestDto> alarmDtoList = habitCreateInfo.getAlarmDtoList();
        Habit habit = habitRepository.findById(habitId).get();

        List<Alarm> list = new ArrayList<>();
        if (alarmDtoList != null){
            for (int i = 0; i < alarmDtoList.size(); i++){
                Alarm alarm = new Alarm();
                alarm.setDay(alarmDtoList.get(i).getDay());
                alarm.setTime(alarmDtoList.get(i).getTime());
                alarm.setHabit(habitRepository.findById(habitId).get());
                alarm.setAlarmed(habitCreateInfo.isAlarmed());
                alarm.setOutside(habitCreateInfo.isOutside());

                Member member = memberRepository.findById(memberId).get();
                alarm.setMember(member);

                list.add(alarm);
                alarmRepository.save(alarm);
            }
        }
        habit.setAlarmList(list);
        habitRepository.save(habit);

        // Habit 생성 이벤트 발생
        HabitEvent habitEvent = new HabitEvent(this, habit);
        eventPublisher.publishEvent(habitEvent);
    }

    @Override
    public List<Habit> getHabitList(int memberId) { // 모든 습관 목록
        Member member = memberRepository.findById(memberId).get();
        return habitRepository.findByMember(member);
    }

    @Override
    public List<HabitResponseDto> getHabitListByDay(int memberId, int day) {
        Member member = memberRepository.findById(memberId).get();

        List<Habit> habitList = habitRepository.findByMember(member);

        List<HabitResponseDto> habitResponseList = new ArrayList<>();
        for (Habit habit : habitList) {
            List<Alarm> alarmList = habit.getAlarmList();
            if (alarmList != null) {
                List<AlarmResponseDto> alarmResponseList = alarmList.stream()
                        .filter(alarm -> alarm.getDay() == day)
                        .map(AlarmResponseDto::new)
                        .collect(Collectors.toList());
                if (!alarmResponseList.isEmpty()){
                    HabitResponseDto habitResponseDto = new HabitResponseDto(habit.getId(), habit.getContent(), alarmResponseList);
                    habitResponseList.add(habitResponseDto);
                }
            }
        }
        return habitResponseList;
    }


    @Override
    public Habit isHabitCompleted(int alarmId) { // 습관 완료 여부 체크시 => 완료(T) -> 미완료(F) / 미완료 -> 완료
        Alarm alarm = alarmRepository.findById(alarmId).get();
        boolean a = alarm.isCompleted();
        alarm.setCompleted(!a);
        alarmRepository.save(alarm);
        Habit habit = alarm.getHabit();
//        for (int i = 0; i < habit.getAlarmList().size(); i++){
//            System.out.println("알람 확인: " + habit.getAlarmList().get(i).getId() + " " + habit.getAlarmList().get(i).isCompleted());
//        }
        return habit;
    }

    @Override
    public Habit getHabitDetail(int habitId) { // 습관 상세보기
        return habitRepository.findById(habitId).get();
    }

    @Override
    public Alarm getHabitAlarmDetail(int alarmId) { // 습관 상세보기
        return alarmRepository.findById(alarmId).get();
    }

    @Override
    @Transactional
    public int modifyHabit(int memberId,int habitId, HabitModifyRequestDto habitDto) {
        Habit habit = habitRepository.findById(habitId).get();
        Member member = memberRepository.findById(memberId).get();
        // 기존 알람 리스트를 가져옴
        List<Alarm> oldAlarmList = habit.getAlarmList();

        // 새로운 알람 리스트를 만듦
        List<AlarmModifyRequestDto> newAlarmDtoList = habitDto.getAlarmDtoList();
        List<Alarm> newAlarmList = new ArrayList<>();

        // 새로운 알람 리스트에 새로운 알람을 추가 ******************************* 수정필요
        for (AlarmModifyRequestDto alarmDto : newAlarmDtoList) {
            Alarm newAlarm = new Alarm();
            newAlarm.setOutside(alarmDto.isOutside());
            newAlarm.setCompleted(alarmDto.isCompleted());
            newAlarm.setDay(alarmDto.getDay());
            newAlarm.setTime(alarmDto.getTime());
            newAlarm.setHabit(habit);
            newAlarm.setAlarmed(alarmDto.isAlarmed());
            newAlarm.setMember(member);
            newAlarmList.add(newAlarm);
        }

        // 기존 알람 리스트와 새로운 알람 리스트를 교체
        habit.setAlarmList(newAlarmList);

        // 기존 알람 리스트를 삭제 (옵션)
        if (oldAlarmList != null) {
            alarmRepository.deleteAll(oldAlarmList);
        }

        // 습관의 내용을 업데이트
        habit.setContent(habitDto.getContent());

        // 습관을 저장
        habitRepository.save(habit);

        // Habit 생성 이벤트 발생
        HabitEvent habitEvent = new HabitEvent(this, habit);
        eventPublisher.publishEvent(habitEvent);

        return habitId;
    }

//    public int modifyHabitAlarm(int alarmId, AlarmModifyRequestDto alarmDto) {
//
//    }



    @Override
    @Transactional
    public void deleteHabit(int habitId) {

        habitRepository.deleteById(habitId);

//        // Habit 생성 이벤트 발생
//        HabitEvent habitEvent = new HabitEvent(this, habitRepository.findById(habitId).get());
//        eventPublisher.publishEvent(habitEvent);
    }

    // TTS 문구 바꾸기
    @Override
    @Transactional
    public void customizeTTS(int alarmId, String text){
        Alarm alarm = alarmRepository.findById(alarmId).get();
        alarm.setText(text);
        alarmRepository.save(alarm);

        // 알람 생성 이벤트 발생
        if (alarm.getTodo() == null) {
            HabitEvent habitEvent = new HabitEvent(this, alarmRepository.findById(alarmId).get().getHabit());
            eventPublisher.publishEvent(habitEvent);
        } else {
            TodoEvent todoEvent = new TodoEvent(this, alarmRepository.findById(alarmId).get().getTodo());
            eventPublisher.publishEvent(todoEvent);
        }

    }

}
