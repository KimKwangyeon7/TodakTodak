package com.ssafy.todak.goal.dto.response;

import com.ssafy.todak.friend.domain.Friend;
import com.ssafy.todak.goal.domain.Goal;
import com.ssafy.todak.goal.domain.Todo;
import com.ssafy.todak.member.domain.Member;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GoalTodoResponseDto {

    private int memberId;

    private int goalId;

    private String nickname;

    private String memo;

    private String goalContent;

    private String color;

    private List<TodoResponseDto> todoList;

    public GoalTodoResponseDto(String nickname, String memo) {
        this.nickname = nickname;
        this.memo = memo;
    }
    public GoalTodoResponseDto(Goal goal, List<TodoResponseDto> todoResponseList) {
        this.goalId = goal.getId();
        this.goalContent = goal.getContent();
        this.todoList = todoResponseList;
    }

}
