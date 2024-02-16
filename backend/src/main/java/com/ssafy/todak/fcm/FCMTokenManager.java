package com.ssafy.todak.fcm;

import com.google.api.client.util.Value;
import jakarta.annotation.Resource;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class FCMTokenManager {
    @Value("${fcm.certification}")
    private String FIREBASE_CONFIG_PATH;

    @Resource
    private RedisTemplate<String, String> redisTemplate;

    // 레디스에 토큰 저장
    private void set(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }

    // userId를 이용해 사용자 토큰 조회
    private String get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    // userId를 이용해 사용자 토큰 삭제
    private void del(String key) {
        redisTemplate.delete(key);
    }

    public void saveToken(String memberId, String token) {
        set(memberId, token);
    }

    public String getToken(String memberId) {
        return get(memberId);
    }

    public void deleteToken(String memberId) {
        del(memberId);
    }

    @Async
    public void deleteAndSaveFCMToken(String memberId, String token) {
        del(memberId);
        set(memberId, token);
    }
}
