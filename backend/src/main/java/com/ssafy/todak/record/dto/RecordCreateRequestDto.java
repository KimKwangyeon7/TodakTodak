package com.ssafy.todak.record.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecordCreateRequestDto {
    private String name;

    private String memo;

}
