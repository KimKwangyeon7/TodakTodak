package com.ssafy.todak.record;

import com.google.api.client.util.Value;
import jakarta.annotation.Resource;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class RecordManager {
    @Resource
    private RedisTemplate<String, String> redisTemplate;

    // 레디스에 녹음 기록 저장
    private void set(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }

    // 사용자 UUID를 이용해 녹음 기록 조회
    private String get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    // 사용자 UUID를 이용해 녹음 기록 삭제
    private void del(String key) {
        redisTemplate.delete(key);
    }

    public void saveRecord(String key, String value) {
        set(key, value);
    }

    public String getRecord(String key) {
        return get(key);
    }

    public void deleteRecord(String key) {
        del(key);
    }

    @Async
    public void deleteAndSaveFCMToken(String key, String value) {
        del(key);
        set(key, value);
    }
}
