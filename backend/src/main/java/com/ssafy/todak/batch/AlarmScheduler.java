package com.ssafy.todak.batch;

import com.ssafy.todak.batch.dto.HabitScheduleDto;
import com.ssafy.todak.batch.dto.TodoScheduleDto;
import com.ssafy.todak.goal.domain.Alarm;
import com.ssafy.todak.goal.domain.Habit;
import com.ssafy.todak.goal.domain.Todo;
import com.ssafy.todak.goal.repository.AlarmRepository;
import com.ssafy.todak.goal.repository.TodoRepository;
import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.member.repository.MemberRepository;
import com.ssafy.todak.common.TTSLoader;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class AlarmScheduler {

    // 알람 리스트 예시
    private List<TodoScheduleDto> todoAlarmList = new ArrayList<>();
    private List<HabitScheduleDto> habitAlarmList = new ArrayList<>();
    private final MemberRepository memberRepository;
    private final TodoRepository todoRepository;
    private final AlarmRepository alarmRepository;
    private final TTSLoader ttsLoader;

    private boolean isSchedulerActive = true; // 스케줄러 활성화 여부

    private int memberId;
    private String ttsTodo = null;
    private String ttsHabit = null;
    private String todoText = null;
    private String habitText = null;

    private void addExampleAlarms() {
        todoAlarmList = getTodoAlarmList(LocalDateTime.now());
        habitAlarmList = getHabitAlarmList(LocalDateTime.now());
        if (!checkCnt(todoAlarmList, habitAlarmList)){
            System.out.println(("리스트 없다"));
            //System.out.println(memberId);
            isSchedulerActive = false;
            return;
        } else {
            isSchedulerActive = true;
//            for (int i = 0; i < todoAlarmList.size(); i++) {
//                System.out.println(todoAlarmList.get(i).getTitle() + " " + todoAlarmList.get(i).getTime());
//            }
        }
    }

    // 매일 자정마다 스케줄러가 실행되어 알람을 추가하고, 스케줄러가 비활성화되어 있으면 다시 활성화함
    @Scheduled(cron = "2 0 0 * * *")
    public void updateAlarmListAndActivateScheduler() {
        System.out.println(memberId + " 회원 아이디" );
        if (memberId == 0){
            todoAlarmList = null;
            habitAlarmList = null;
            isSchedulerActive = false;
            return;
        }
        todoAlarmList = getTodoAlarmList(LocalDateTime.now());
        //System.out.println(todoAlarmList.get(0));
        habitAlarmList = getHabitAlarmList(LocalDateTime.now());
        if (checkCnt(todoAlarmList, habitAlarmList)) {
            System.out.println("활성화!");
            isSchedulerActive = true;
            activateScheduler();
        } else {
            isSchedulerActive = false;
            return;
        }
    }

    private void activateScheduler() {
        scheduleAlarms();
    }

    // 특정 날의 투두 알람 리스트 받아오기
    private List<TodoScheduleDto> getTodoAlarmList(LocalDateTime time){
//        if (getId() == -1){
        if (memberId == 0){
            return null;
        }
        Member member = memberRepository.findById(memberId).get();
        String str = time.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String str2 = time.format(DateTimeFormatter.ofPattern("HHmm"));
        List<Todo> todos = todoRepository.findAlarmByTime(member, str, str2);
        List<TodoScheduleDto> list = new ArrayList<>();
        if (todos == null){
            return null;
        }
        for (int i = 0; i < todos.size(); i++){
            list.add(new TodoScheduleDto(todos.get(i)));
        }
        return list;
    }

    // 특정 날의 숩관 알람 리스트 받아오기
    private List<HabitScheduleDto> getHabitAlarmList(LocalDateTime time){
//        if (getId() == -1){
        if (memberId == 0){
            return null;
        }
        Member member = memberRepository.findById(memberId).get();
        int day = LocalDateTime.now().getDayOfWeek().getValue()-1;
        String timeStr = time.format(DateTimeFormatter.ofPattern("HHmm"));
        List<Alarm> alarms = alarmRepository.findAlarmByTime(member, day, timeStr);
        //System.out.println(alarms.get(0).getDay() + "  " + alarms.get(0).getTime());
        List<HabitScheduleDto> list = new ArrayList<>();
        if (alarms == null || alarms.isEmpty()){
            return null;
        }
        for (int i = 0; i < alarms.size(); i++){
            list.add(new HabitScheduleDto(alarms.get(i)));
        }
        return list;
    }


    // 매 분마다 실행되는 스케줄러 메서드
    @Scheduled(cron = "0 * * * * *")
    public void scheduleAlarms() {
        // System.out.println("알람보기");
        // System.out.println("활성화?" + isSchedulerActive);
        if (!isSchedulerActive) { // 스케줄러가 비활성화되어 있다면 메서드 실행 종료
            return;
        }

        addExampleAlarms();

        if (!checkCnt(todoAlarmList, habitAlarmList)){
            // 다음날까지 스케쥴러 가동 X
            isSchedulerActive = false;
            System.out.println("다음날까지 가동X. 업데이트 하기 전까지");
            return;
        }
        System.out.println("시간비교하기");
        // 알람 리스트가 비어있지 않으면 스케줄러 활성화 유지
        isSchedulerActive = true;

        // 알람 리스트를 순회하며 현재 시간과 비교하여 알람이 지나지 않았다면 알람을 실행함
        LocalDateTime plusMin = LocalDateTime.now().plusMinutes(1);
        // System.out.println(plusMin + "1분후 시간");
        LocalDateTime nowMin = LocalDateTime.now();
        // System.out.println(nowMin + "현재 시간");

        String pastStr = plusMin.format(DateTimeFormatter.ofPattern("HHmm"));
        // System.out.println(pastStr + "1분후 시간");
        String nowStr = nowMin.format(DateTimeFormatter.ofPattern("HHmm"));
        // System.out.println(nowStr + "현재 시간");

        //System.out.println(todoAlarmList.get(0).getTime() + "투두 시간");
        // 알람 시간이 되면 미리 합성한 음성 프론트로 보내주기
        if (todoAlarmList != null && !todoAlarmList.isEmpty() && nowStr.equals(todoAlarmList.get(0).getTime())) {
            if (ttsTodo != null){
                // ttsLoader.sendAudio(ttsTodo, todoText);
                System.out.println(ttsTodo + " 투두 알람!");
                ttsTodo = null;
            }

            // 알람이 실행되었으므로 리스트에서 제거
            todoAlarmList.remove(todoAlarmList.get(0));
        }
// -------------------------------------------------------------------------------------------------------------------
        // 알람 알리기 1분 전에 미리 음성 합성 후 저장
        if (todoAlarmList != null && !todoAlarmList.isEmpty() && pastStr.equals(todoAlarmList.get(0).getTime())) {
            // 알람 실행 코드를 여기에 추가 => 푸시알림 주기 : 외출 여부, 제목, 시간 등에 맞게
            System.out.println(todoAlarmList.get(0).getTitle() + " 투두 알림 미리 합성!");

            TodoScheduleDto dto = todoAlarmList.get(0);
            todoText = makeTodoText(dto);

            // 현재 시간 문자열로 저장
            String currentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));

            // 파일 이름 생성 (예: alarm:member_id_20220101_123456.wav)
            String fileName = String.format("%s_%s.wav", "Todo_"+memberId, currentDateTime);
            ttsTodo = fileName;


            File sourceFolder = new File("home/ubuntu/S10P12C210/src/main/resources/tts-server/wait");
            File[] files = sourceFolder.listFiles();
            if (files != null && files.length > 0) {
                File firstFile = files[0];

                // 대상 폴더로 파일 이동
                firstFile.renameTo(new File("home/ubuntu/S10P12C210/src/main/resources/tts-server/alarm" + File.separator + firstFile.getName()));

            }

            //ttsLoader.saveAudioLocally(todoText, memberId, fileName);
        }
// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------
        // 알람 시간이 되면 미리 합성한 음성 프론트로 보내주기
        if (habitAlarmList != null && !habitAlarmList.isEmpty() && nowStr.equals(habitAlarmList.get(0).getTime())) {
            if (ttsHabit != null){
                // ttsLoader.sendAudio(ttsHabit, habitText);
                System.out.println(ttsHabit + " 습관 알람!");
                ttsHabit = null;
            }
            // 알람이 실행되었으므로 리스트에서 제거
            habitAlarmList.remove(habitAlarmList.get(0));
        }
// -------------------------------------------------------------------------------------------------------------------
        // 습관 알람 리스트를 순회하며 알람 1분 전 미리 음성 합성
        if (habitAlarmList != null && !habitAlarmList.isEmpty() && pastStr.equals(habitAlarmList.get(0).getTime())) {
            // 알람 실행 코드를 여기에 추가 => 푸시알림 주기 : 외출 여부, 제목, 시간 등에 맞게
            System.out.println(habitAlarmList.get(0).getContent() + " 습관 음성 미리 합성!");

            HabitScheduleDto dto = habitAlarmList.get(0);
            habitText = makeHabitText(dto);

            // 현재 시간 문자열로 저장
            String currentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));

            // 파일 이름 생성 (예: member_id_20220101_123456.wav)
            String fileName = String.format("%s_%s.wav", "Habit_"+memberId, currentDateTime);
            ttsHabit = fileName;
            // ttsLoader.inferAndSave(habitText, memberId, fileName);

            File sourceFolder = new File("home/ubuntu/S10P12C210/src/main/resources/tts-server/wait");
            File[] files = sourceFolder.listFiles();
            if (files != null && files.length > 0) {
                File firstFile = files[0];

                // 대상 폴더로 파일 이동
                firstFile.renameTo(new File("home/ubuntu/S10P12C210/src/main/resources/tts-server/alarm" + File.separator + firstFile.getName()));

            }
        }
    }

    public int getId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof Member) {
            Member principal = (Member) authentication.getPrincipal();
            return principal.getId();
        } else {
            return -1;
        }
    }

    public void updateTodo(Todo todo) {
        System.out.println("투두아이디: " + todo.getId() + " 멤버아이디: " + todo.getMember().getId());
        memberId = todo.getMember().getId();
        isSchedulerActive = true;
        updateAlarmListAndActivateScheduler();
        //scheduleAlarms();
    }

    private boolean checkCnt (List<TodoScheduleDto> todos, List<HabitScheduleDto> habits){
        if ((todos == null || todos.isEmpty()) && (habits == null || habits.isEmpty())){ // 둘다 비었으면
            return false;
        }
        return true;
    }

    public void updateHabit(Habit habit) {
        System.out.println("습관아이디: " + habit.getId() + " 멤버아이디: " + habit.getMember().getId());
        memberId = habit.getMember().getId();
        isSchedulerActive = true;
        updateAlarmListAndActivateScheduler();
    }

    public String makeTodoText(TodoScheduleDto dto){
        String tts = "";
        Member member = memberRepository.findById(memberId).get();

        // tts 문구 따로 지정 X
        if (dto.getText() == null){
            // 외출해야하는 경우
            if (dto.isOutside()){
                if (member.getSex() == 0){
                    tts += "우리 아들 ";
                } else {
                    tts += "우리 딸 ";
                }
                tts += "이제 나갈 시간이야 오늘 비 온다니깐 우산 꼭 챙겨 조심히 다녀와";
            } else {
                tts += "이제 " + dto.getContent() + "할 시간이야 화이팅!";
            }
        } else { // tts 문구 커스텀
            tts = dto.getText();
        }
        return tts;
    }

    public String makeHabitText(HabitScheduleDto dto){
        String tts = "";
        Member member = memberRepository.findById(memberId).get();

        // 외출해야하는 경우
        if (dto.isOutside()){
            if (member.getSex() == 0){
                tts += "우리 아들 ";
            } else {
                tts += "우리 딸 ";
            }
            tts += "이제 나갈 시간이야 오늘 비 온다니깐 우산 꼭 챙겨 조심히 다녀와";
        } else {
            tts += "이제 " + dto.getContent() + "할 시간이야 화이팅!";
        }
        return tts;
    }
}
