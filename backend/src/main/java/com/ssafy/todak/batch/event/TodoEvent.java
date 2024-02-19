package com.ssafy.todak.batch.event;

import com.ssafy.todak.goal.domain.Todo;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class TodoEvent extends ApplicationEvent {

    private Todo todo;

    public TodoEvent(Object source, Todo todo) {
        super(source);
        this.todo = todo;
    }

}

