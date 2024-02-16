package com.ssafy.todak.exception;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Log4j2
public class ApiExceptionHandler extends RuntimeException {

    @ExceptionHandler(MethodArgumentNotValidException.class) //예외가 발생한 요청을 처리하기 위해
    public ResponseEntity<ErrorResponse> handleMethodNotValidException(MethodArgumentNotValidException e) {
        final String[] message = {""};

        e.getBindingResult().getAllErrors()
                .forEach(c -> message[0] = c.getDefaultMessage());

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.builder()
                        .message(message[0])
                        .errorCode("400")
                        .httpStatus(HttpStatus.BAD_REQUEST)
                        .build()
                );
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException e) {
        ErrorCode code = e.getCode();
        return ErrorResponse.of(code);

    }
}
