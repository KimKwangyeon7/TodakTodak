package com.ssafy.todak.file.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileResultDto implements Serializable {
    private String fileName;
    private String uuid;
    private String url;
    private int memberId;
}
