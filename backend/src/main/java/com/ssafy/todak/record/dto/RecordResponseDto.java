package com.ssafy.todak.record.dto;

import com.ssafy.todak.goal.domain.Alarm;
import com.ssafy.todak.record.domain.Record;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecordResponseDto {
    private int id;
    private String name;
    private String memo;
    private boolean isAvailable;
    private boolean isUsed;

    public RecordResponseDto(Record record){
        this.id = record.getId();
        this.name = record.getName();
        this.memo = record.getMemo();
        this.isAvailable = record.isAvailable();
        this.isUsed = record.isUsed();
    }
}
