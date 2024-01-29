package com.ssafy.todak.goal.service;

import com.ssafy.todak.goal.domain.*;
import com.ssafy.todak.goal.dto.request.GoalCreateRequestDto;
import com.ssafy.todak.goal.dto.request.GoalModifyRequestDto;
import com.ssafy.todak.goal.dto.request.HabitCreateRequestDto;
import com.ssafy.todak.goal.dto.request.TodoCreateRequestDto;
import com.ssafy.todak.goal.repository.*;
import com.ssafy.todak.friend.domain.Friend;
import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.friend.repository.FriendRepository;
import com.ssafy.todak.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalServiceImpl implements GoalService {
    private final GoalRepository goalRepository;
    private final FriendRepository friendRepository;
    private final MemberRepository memberRepository;
    private final TodoRepository todoRepository;
    private final HabitRepository habitRepository;

    private int goalId;
    private int todoId;
    private int habitId;


    // 1. 목표
    @Override
    public void createGoal(int memberId, GoalCreateRequestDto goalCreateInfo){
        Goal goal = new Goal();
        System.out.println("목표정보: " + goalCreateInfo.toString());
        goal.setContent(goalCreateInfo.getContent());
        goal.setColor(goalCreateInfo.getColor());

        Member member = memberRepository.findById(memberId).get();
        goal.setMember(member);

        goalRepository.save(goal);
        goalId = goal.getId();
    }

    @Transactional
    @Override
    public Goal createGoalFriend(int memberId, GoalCreateRequestDto goalCreateInfo){
        List<GoalFriend> goalFriendList = new ArrayList<>();

        for (int i = 0; i < goalCreateInfo.getFriendList().size(); i++) {
            String friendNickname = goalCreateInfo.getFriendList().get(i);
            Member friendMember = memberRepository.findByNickname(friendNickname).get();

            List<Friend> friendList = friendRepository.findByFromMember_IdOrToMember_Id(memberId, friendMember.getId());

            if (!friendList.isEmpty() && friendList.get(0).isFriend()) {
                GoalFriendId goalFriendId = new GoalFriendId();
                goalFriendId.setFriendId(friendList.get(0).getId());
                goalFriendId.setGoalId(goalId);

                GoalFriend goalFriend = new GoalFriend();
                goalFriend.setGoalFriendId(goalFriendId);
                goalFriendList.add(goalFriend);
            }
        }

        Goal goal = goalRepository.findById(goalId).get();
        goal.setGoalFriendList(goalFriendList);

        return goalRepository.save(goal);
    }

    @Transactional
    @Override
    public List<Goal> getGoalList(int memberId){ // 전체 목표 리스트 가져오기
        Member member = memberRepository.findById(memberId).get();
        return goalRepository.findByMember(member);
    }

    @Override
    public Goal getGoalDetail(int goalId){ // 목표 상세보기
        return goalRepository.findById(goalId).get();
    }

    @Override
    public Goal modifyGoal(int goalId, GoalModifyRequestDto goalModifyRequestDto){ // 목표 수정하기
        Goal goal = goalRepository.findById(goalId).get();
        goal.setColor(goalModifyRequestDto.getColor());
        goal.setStatus(goalModifyRequestDto.getStatus());
        goal.setContent(goalModifyRequestDto.getContent());

        List<GoalFriend> goalFriendList = new ArrayList<>();
        List<String> nicknameList = goalModifyRequestDto.getFriendList();
        for (int i = 0; i < nicknameList.size(); i++){
            int nicknameId = memberRepository.findByNickname(nicknameList.get(i)).get().getId();
            List<Friend> friendList = friendRepository.findByFromMember_IdOrToMember_Id(goal.getMember().getId(), nicknameId);
            int friendId = friendList.get(0).getId();

            GoalFriendId goalFriendId = new GoalFriendId();
            goalFriendId.setFriendId(friendId);
            goalFriendId.setGoalId(goalId);

            GoalFriend goalFriend = new GoalFriend();
            goalFriend.setGoalFriendId(goalFriendId);
            goalFriendList.add(goalFriend);
        }
        goal.setGoalFriendList(goalFriendList);

        return goalRepository.save(goal);
    }

    @Transactional
    @Override
    public void deleteGoal(int goalId){
        goalRepository.deleteById(goalId);
    }

    // ------------------------------------------------------------------------------------------------------
    // 2. 투두

    @Transactional
    @Override
    public void createTodo(int memberId, LocalDateTime todoDate, TodoCreateRequestDto todoCreateInfo){
        Todo todo = new Todo();
        System.out.println("투두정보: " + todoCreateInfo.toString());

        todo.setTitle(todoCreateInfo.getTitle());
        todo.setContent(todoCreateInfo.getContent());
        String customTodoDate = todoDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        todo.setTodoDate(customTodoDate);
        todo.setGoal(goalRepository.findByColor(todoCreateInfo.getColor()));
        todo.setImportant(todoCreateInfo.isImportant());

        Member member = memberRepository.findById(memberId).get();
        todo.setMember(member);


        todoRepository.save(todo);

        todoId = todo.getId();
    }

    @Transactional
    @Override
    public Todo createTodoAlarm(int memberId, TodoCreateRequestDto todoCreateInfo){
        List<Alarm> alarmList = new ArrayList<>();

        Alarm alarm = new Alarm();
        alarm.setAlarmed(todoCreateInfo.isAlarmed());
        alarm.setTodo(todoRepository.findById(todoId).get());
        alarm.setTime(todoCreateInfo.getTime());
        alarm.setOutside(todoCreateInfo.isOutside());

        Member member = memberRepository.findById(memberId).get();
        alarm.setMember(member);

        Todo todo = todoRepository.findById(todoId).get();
        alarm.setTodo(todo);
        alarmList.add(alarm);

        todo.setAlarmList(alarmList);
        return todoRepository.save(todo);
    }

    @Override
    public List<Todo> getTodoListByDate(int memberId, LocalDateTime todoDate){ // 날짜별 투두리스트 목록
        Member member = memberRepository.findById(memberId).get();
        String customTodoDate = todoDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        return todoRepository.findByTodoDate(member, customTodoDate);
    }

    @Override
    public List<Todo> getTodoListByGoal(int memberId, int goalId){ // 목표별 투두리스트 목록
        Member member = memberRepository.findById(memberId).get();
        Goal goal = goalRepository.findById(goalId).get();
        return todoRepository.findByGoal(member, goal);
    }

    @Override
    public List<Todo> getTodoListByMonth(int memberId, int month){ // 월별 투두리스트 목록
        List<Todo> todoMonthList = new ArrayList<>();

        Member member = memberRepository.findById(memberId).get();
        List<Todo> todoList = todoRepository.findByMember(member);
        String str = String.valueOf(month);
        if (month < 10){
            str = "0" + str;
        }

        for (int i = 0; i < todoList.size(); i++){
            if (todoList.get(i).getTodoDate().substring(3, 5).equals(str)){
                todoMonthList.add(todoList.get(i));
            }
        }
        return todoMonthList;
    }

    @Override
    public void isTodoCompleted(int todoId){ // 투두 완료 여부 체크시 => 완료(T) -> 미완료(F) / 미완료 -> 완료
        Todo todo = todoRepository.findById(todoId).get();
        boolean a = todo.getAlarmList().get(0).isChecked();
        todo.getAlarmList().get(0).setChecked(!a);
        todoRepository.save(todo);
    }

    @Override
    public Todo getTodoDetail(int todoId){ // 투두 상세보기
        return todoRepository.findById(todoId).get();
    }

    @Override
    public Todo modifyTodo(int todoId, TodoCreateRequestDto todoCreateInfo){ // 투두 수정하기
        Todo todo = todoRepository.findById(todoId).get();
        todo.setTitle(todoCreateInfo.getTitle());
        todo.setContent(todoCreateInfo.getContent());
        todo.setImportant(todoCreateInfo.isImportant());
        todo.getAlarmList().get(0).setAlarmed(todoCreateInfo.isAlarmed());
        todo.getAlarmList().get(0).setOutside(todoCreateInfo.isOutside());
        todo.getAlarmList().get(0).setTime(todoCreateInfo.getTime());

        return todoRepository.save(todo);
    }

    @Transactional
    @Override
    public void deleteTodo(int todoId){ // 투두 삭제하기
        todoRepository.deleteById(todoId);
    }

    // ------------------------------------------------------------------------------------------------------
    // 3. 습관
    @Transactional
    @Override
    public void createHabit(int memberId, HabitCreateRequestDto habitCreateInfo){
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
    public Habit createHabitAlarm(int memberId, HabitCreateRequestDto habitCreateInfo){

        List<Alarm> alarmList = habitCreateInfo.getAlarmList();
        Habit habit = habitRepository.findById(habitId).get();
        habit.setAlarmList(alarmList);

        return habitRepository.save(habit);
    }

    @Override
    public List<Habit> getHabitList(int memberId){ // 모든 습관 목록
        Member member = memberRepository.findById(memberId).get();
        return habitRepository.findByMember(member);
    }

    @Override
    public Habit isHabitCompleted(int habitId, int alarmId){ // 습관 완료 여부 체크시 => 완료(T) -> 미완료(F) / 미완료 -> 완료
        Habit habit = habitRepository.findById(habitId).get();
        for (int i = 0; i < habit.getAlarmList().size(); i++){
            if (habit.getAlarmList().get(i).getId() == alarmId){
                boolean a = habit.getAlarmList().get(i).isChecked();
                habit.getAlarmList().get(i).setChecked(!a);

                break;
            }
        }
        return habitRepository.save(habit);
    }

    @Override
    public Habit getHabitDetail(int habitId){ // 습관 상세보기
        return habitRepository.findById(habitId).get();
    }

    @Override
    public Habit modifyHabit(int habitId, HabitCreateRequestDto habitCreateInfo){ // 습관 수정하기
        Habit habit = habitRepository.findById(habitId).get();

        habit.setContent(habitCreateInfo.getContent());
        habit.setAlarmList(habitCreateInfo.getAlarmList());

        return habitRepository.save(habit);
    }

    @Override
    public void deleteHabit(int habitId){
        habitRepository.deleteById(habitId);
    }

}
