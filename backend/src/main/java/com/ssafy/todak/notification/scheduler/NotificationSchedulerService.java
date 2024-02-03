package com.ssafy.todak.notification.scheduler;

import com.ssafy.todak.exception.CustomException;
import com.ssafy.todak.exception.ErrorCode;
import com.ssafy.todak.fcm.FCMService;
import com.ssafy.todak.fcm.FCMTokenManager;
import com.ssafy.todak.goal.domain.Alarm;
import com.ssafy.todak.goal.repository.AlarmRepository;
import com.ssafy.todak.member.common.MemberLoader;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationSchedulerService {

    private final AlarmRepository alarmRepository;
    private final FCMTokenManager fcmTokenManager;
    private final FCMService fcmService;
    private final MemberLoader memberLoader;

    private String dynamicCronExpression = "0 0/10 * * * ?"; // 초기에는 10분마다
    private int alarmId2 = 0;

//    @Scheduled(cron = "${notificationSchedulerService.dynamicCronExpression}")
//    public void scheduledTaskUsingDynamicCron() {
//        sendPushTodoAlarm();
//    }
//
//    public void sendPushTodoAlarm() {
//        String targetUserToken = fcmTokenManager.getToken(String.valueOf(memberLoader.getId()));
//        Alarm alarm = alarmRepository.findById(alarmId2).orElseThrow(
//                () -> new CustomException(ErrorCode.NO_ALARM_SET)
//        );
//
//        Optional.ofNullable(targetUserToken).ifPresent(token -> fcmService.sendMessage(
//                token,
//                alarm.getTodo().getTitle(),
//                alarm.getTodo().getContent())
//        );
//    }
//
//    public String dynamicCronExpression() {
//        return dynamicCronExpression;
//    }
//
//    public void updateAlarm(int alarmId) {
//        Alarm alarm = alarmRepository.findAlarmByTodo_Id(alarmId).orElseThrow(
//                () -> new CustomException(ErrorCode.NO_ALARM_SET)
//        );
//
//        String day = String.valueOf(alarm.getDay());
//        String time = alarm.getTime();
//
//        int hour = Integer.parseInt(time.substring(0, 2));
//        int minute =  Integer.parseInt(time.substring(2));
//
//        dynamicCronExpression = "0 " + minute + " " + hour + " ? * " + day;
//        alarmId2 = alarmId;
//    }
}
