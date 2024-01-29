package com.ssafy.todak;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing // BaseEntity클래스의 AuditingEntityListener를 활성화
public class TodakApplication {

    public static void main(String[] args) {
        SpringApplication.run(TodakApplication.class, args);
    }

}
