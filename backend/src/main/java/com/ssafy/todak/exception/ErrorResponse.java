package com.ssafy.todak.exception;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@Builder
public class ErrorResponse {

    private HttpStatus httpStatus;
    private String message;
    private String errorCode;

    public static ResponseEntity<ErrorResponse> of(ErrorCode code) {
        return ResponseEntity
                .status(code.getHttpStatus())
                .body(
                        ErrorResponse.builder()
                                .message(code.getMessage())
                                .errorCode(code.getErrorCode())
                                .httpStatus(code.getHttpStatus())
                                .build()
                );
    }
}