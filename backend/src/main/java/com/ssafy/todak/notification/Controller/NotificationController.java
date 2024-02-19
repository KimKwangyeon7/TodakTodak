package com.ssafy.todak.notification.Controller;

import com.ssafy.todak.notification.dto.FCMNotificationRequestDto;
import com.ssafy.todak.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping("")
    public String sendNotificationByToken(@RequestBody FCMNotificationRequestDto requestDto){
        return notificationService.sendNotificationByToken(requestDto);
    }



}
