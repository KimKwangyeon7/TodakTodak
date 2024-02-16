//package com.ssafy.todak.batch;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.batch.core.configuration.JobRegistry;
//import org.springframework.batch.core.launch.JobLauncher;
//import org.springframework.stereotype.Component;
//
//@Slf4j
//@Component
//public class HelloBatchScheduler extends BatchScheduler{
//
//    public HelloBatchScheduler(
//            JobLauncher jobLauncher,
//            JobRegistry jobRegistry,
//            HelloBatchJob helloBatchJob
//    ) {
//        super(jobLauncher, jobRegistry,helloBatchJob);
//        if(helloBatchJob.isJobEnabled()){
//            startScheduler();
//        }
//    }
//}