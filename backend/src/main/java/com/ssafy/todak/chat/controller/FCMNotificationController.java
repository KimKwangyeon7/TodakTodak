package com.ssafy.todak.chat.controller;


import com.ssafy.todak.fcm.FCMRequestDto;
import com.ssafy.todak.fcm.FCMService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FCMNotificationController {
    private final FCMService fcmService;

    @PostMapping("/notification")
    public ResponseEntity sendNotificationByToken(@RequestBody FCMRequestDto requestDto) {
        fcmService.sendMessage(requestDto);
        return ResponseEntity.ok().build();
    }

}
