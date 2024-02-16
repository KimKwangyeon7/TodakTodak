package com.ssafy.todak;

import com.ssafy.todak.member.common.MemberLoader;
import com.ssafy.todak.member.domain.Member;
import org.springframework.boot.DefaultPropertiesPropertySource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.core.env.StandardEnvironment;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
@EnableJpaAuditing // BaseEntity클래스의 AuditingEntityListener를 활성화
@EnableScheduling //스케줄링
public class TodakApplication {

    public static void main(String[] args) {
        SpringApplication.run(TodakApplication.class, args);
    }


}
