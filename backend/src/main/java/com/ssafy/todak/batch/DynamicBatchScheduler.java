package com.ssafy.todak.batch;

import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.configuration.JobRegistry;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class DynamicBatchScheduler extends BatchScheduler {

    public DynamicBatchScheduler(JobLauncher jobLauncher, JobRegistry jobRegistry, DynamicBatchJob dynamicBatchJob) {
        super(jobLauncher, jobRegistry, dynamicBatchJob);
        String cron = dynamicBatchJob.getRandomCronExpression();
        dynamicBatchJob.setCronExpression(cron);
        if (dynamicBatchJob.isJobEnabled()) {
            startScheduler();
        }
    }
}