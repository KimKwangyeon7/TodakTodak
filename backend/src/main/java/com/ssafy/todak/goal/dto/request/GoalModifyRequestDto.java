package com.ssafy.todak.goal.dto.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GoalModifyRequestDto{
    private String content;

    private String color;

    private List<String> friendList; // 목표 공개할 친구 리스트

    private int status;
}
