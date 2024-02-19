package com.ssafy.todak.batch.dto;

import com.ssafy.todak.goal.domain.Todo;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TodoScheduleDto {
    private String todoDate;
    private boolean isAlarmed;
    private boolean isImportant;
    private boolean isOutside;
    private boolean isChecked;
    private String time;
    private String content;
    private String title;
    private String text;

    public TodoScheduleDto(Todo todo){
        this.title = todo.getTitle();
        this.content = todo.getContent();
        this.time = todo.getAlarmList().get(0).getTime();
        this.isImportant = todo.isImportant();
        this.isAlarmed = todo.getAlarmList().get(0).isAlarmed();
        this.isOutside = todo.getAlarmList().get(0).isOutside();
        this.isChecked = todo.getAlarmList().get(0).isChecked();
        this.todoDate = todo.getTodoDate();
        this.text = todo.getAlarmList().get(0).getText();
    }

}
