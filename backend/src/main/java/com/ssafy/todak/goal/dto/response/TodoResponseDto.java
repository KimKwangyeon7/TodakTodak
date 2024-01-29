package com.ssafy.todak.goal.dto.response;

import com.ssafy.todak.goal.domain.Todo;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TodoResponseDto {
    private int id;
    private String title;
    private String content;
    private boolean isImportant;
    private String color;
    private String time;
    private boolean isOutside;
    private boolean isAlarmed;

    public TodoResponseDto(Todo todo){
        this.id = todo.getId();
        this.title = todo.getTitle();
        this.content = todo.getContent();
        this.time = todo.getAlarmList().get(0).getTime();
        this.isImportant = todo.isImportant();
        this.isAlarmed = todo.getAlarmList().get(0).isAlarmed();
        this.isOutside = todo.getAlarmList().get(0).isOutside();
        this.color = todo.getGoal().getColor();
    }

}
