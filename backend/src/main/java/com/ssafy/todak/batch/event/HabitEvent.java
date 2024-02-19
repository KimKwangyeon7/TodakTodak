package com.ssafy.todak.batch.event;

import com.ssafy.todak.goal.domain.Habit;
import com.ssafy.todak.goal.domain.Todo;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class HabitEvent extends ApplicationEvent {
    private Habit habit;

    public HabitEvent(Object source, Habit habit) {
        super(source);
        this.habit = habit;
    }
}
