package com.ssafy.todak.batch.event;

import com.ssafy.todak.batch.AlarmScheduler;
import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.member.repository.MemberRepository;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
public class UserEventListener {

    private final AlarmScheduler alarmScheduler;
    private final MemberRepository memberRepository;

    public UserEventListener(AlarmScheduler alarmScheduler, MemberRepository memberRepository) {
        this.alarmScheduler = alarmScheduler;
        this.memberRepository = memberRepository;
    }

    // 로그인 성공 이벤트를 감지하여 알람 스케줄러를 활성화하는 리스너
    @EventListener
    public void handleAuthenticationSuccess(AuthenticationSuccessEvent event) {
        if (event.getAuthentication().getPrincipal() instanceof Member) {
            alarmScheduler.updateAlarmListAndActivateScheduler();
        }
    }

    // 투두 추가 이벤트를 감지하여 알람 스케줄러를 활성화하는 리스너
    @TransactionalEventListener
    public void handleTodoUpdated(TodoEvent event) {
        System.out.println("투두 변화 감지" + event.getTodo().getId());
        alarmScheduler.updateTodo(event.getTodo());
    }
//
//    @TransactionalEventListener
//    public void handleTodoModified(TodoEvent event) {
//        System.out.println("투두 변화 감지" + event.getTodo().getId());
//        alarmScheduler.updateTodo(event.getTodo());
//    }
//
//    @TransactionalEventListener
//    public void handleTodoDeleted(TodoEvent event) {
//        System.out.println("투두 삭제 감지" + event.getTodo().getId());
//        alarmScheduler.updateTodo(event.getTodo());
//    }

    // 습관 추가 이벤트를 감지하여 알람 스케줄러를 활성화하는 리스너
    @TransactionalEventListener
    public void handleHabitUpdated(HabitEvent event) {
        System.out.println("습관 변화 감지" + event.getHabit().getId());
        alarmScheduler.updateHabit(event.getHabit());
    }

//    @TransactionalEventListener
//    public void handleHabitModified(HabitEvent event) {
//        System.out.println("습관 수정 감지" + event.getHabit().getId());
//        alarmScheduler.updateHabit(event.getHabit());
//    }
//
//    @TransactionalEventListener
//    public void handleHabitDeleted(HabitEvent event) {
//        System.out.println("습관 삭제 감지" + event.getHabit().getId());
//        alarmScheduler.updateHabit(event.getHabit());
//    }

//    // 사용자 정보 업데이트 이벤트를 감지하여 알람 스케줄러를 활성화하는 리스너
//    @TransactionalEventListener
//    public void handleUserUpdated(UserUpdatedEvent event) {
//        alarmScheduler.updateAlarmListAndActivateScheduler();
//    }
}
