package com.ssafy.todak.notification.service;


import com.ssafy.todak.goal.repository.AlarmRepository;
import com.ssafy.todak.goal.repository.HabitRepository;
import com.ssafy.todak.goal.repository.TodoRepository;
import com.ssafy.todak.member.common.MemberLoader;
import com.ssafy.todak.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {
//아침, 점심, 저녁, 기상

    private final AlarmRepository alarmRepository;
    private final MemberLoader memberLoader;

    /**
     * 아침
     */
    @Scheduled(cron = "0 0 08 * * ?")
    public void pushMorningAlarm() {
//        String token = memberLoader.getMember();

//        FCMRequestDto fcmRequestDto = FCMRequestDto.builder()
//                .title("GOOD MORNING")
//                .body("굿모닝")
//                .firebaseToken()
    }

    /**
     * 점심
     */
    @Scheduled(cron = "0 0 12 * * ?")
    public void pushLunchAlarm() {

    }

    /**
     * 저녁
     */
    @Scheduled(cron = "0 0 18 * * ?")
    public void pushDinnerAlarm() {

    }



}
