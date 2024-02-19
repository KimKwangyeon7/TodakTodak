package com.ssafy.todak.file.service;

import java.io.IOException;
import java.util.HashMap;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.todak.member.common.MemberLoader;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
@Log4j2
public class FileService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Resource
    private  RedisTemplate<String, Map<String, String>> redisTemplate;
    private final MemberLoader memberLoader;
    private final AmazonS3 amazonS3;


    // 레디스에 녹음 파일 저장하기
    public void addFileUrl(int memberId, String fileName, String fileUrl) {
        HashOperations<String, String, String> hashOperations = redisTemplate.opsForHash();
        String key = "record:" + memberId;

        Map<String, String> memberMap = hashOperations.entries(key);

        // 기존 맵이 없으면 새로운 맵을 생성
        if (memberMap == null) {
            memberMap = new HashMap<>();
        }
        // 맵에 파일 이름과 URL 추가
        memberMap.put(fileName, fileUrl);
        // 맵을 다시 레디스에 저장
        hashOperations.putAll(key, memberMap);
    }


    // 레디스에서 특정 회원의 녹음 파일들 가져오기
    public Map<String, String> getFile(){
        HashOperations<String, String, String> hashOperations = redisTemplate.opsForHash();
        int memberId = memberLoader.getId();
        String key = "record:" + memberId;

        Map<String, String> memberMap = hashOperations.entries(key);
        return memberMap;
    }

    public String uploadS3(String fileName, MultipartFile file){
        try {
            ObjectMetadata metadata= new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            amazonS3.putObject(bucket,fileName,file.getInputStream(),metadata);
            String fileUrl= amazonS3.getUrl(bucket, fileName).toString();

            // 레디스에 저장
            addFileUrl(memberLoader.getId(), fileName, fileUrl);

            return fileUrl;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

}
