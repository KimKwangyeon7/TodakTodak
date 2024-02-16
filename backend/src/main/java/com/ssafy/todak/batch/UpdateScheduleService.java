package com.ssafy.todak.batch;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@EnableScheduling
@Slf4j
public class UpdateScheduleService {
    private final DynamicBatchScheduler dynamicBatchScheduler;
    private final DynamicBatchJob dynamicBatchJob;

    @Scheduled(cron = "59 * * * * ?") // 59 초 마다 cron 업데이트 실행
    public void updateCronInDynamicBatch() {
        if (dynamicBatchJob.isJobEnabled()) {
            log.info("run update schedule service");
            String updatedCron = dynamicBatchJob.getRandomCronExpression();
            log.info("updated cron: {}", updatedCron);
            dynamicBatchScheduler.updateCronExpression(updatedCron);
        }
    }
}