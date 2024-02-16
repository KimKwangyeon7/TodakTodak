package com.ssafy.todak.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ErrorCode {

    //사용자
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "404", "사용자를 찾을 수 없습니다."),
    //친구
    EXISTING_REQUEST(HttpStatus.BAD_REQUEST, "400", "이미 친구추가를 보낸 사용자 입니다"),
    EXISTING_REQUEST_IN_REQUEST_LIST(HttpStatus.BAD_REQUEST, "400", "해당 사용자에게 받은 친구 요청이 존재합니다."),
    EXISTING_FRIEND(HttpStatus.BAD_REQUEST, "400", "친구입니다"),
    NO_FRIEND_REQUEST_TO(HttpStatus.NOT_FOUND, "404", "친구 요청을 보낸 적이 없습니다"),
    NO_FRIEND_REQUEST_FROM(HttpStatus.NOT_FOUND, "404", "친구 요청을 받은 적이 없습니다"),
    NOT_FRIEND(HttpStatus.BAD_REQUEST, "400", "친구가 아닙니다"),

    NO_ALARM_SET(HttpStatus.BAD_REQUEST, "400", "설정한 알람이 없습니다."),

    //FCM
    NOT_FOUND_FCM_TOKEN(HttpStatus.NOT_FOUND, "404", "FCM 토큰이 없습니다"),


    //채팅
    NO_CHAT_ROOM(HttpStatus.NOT_FOUND, "404","채팅방을 찾을 수 없습니다."),
    EXISTING_ROOM(HttpStatus.BAD_REQUEST, "400", "이미 채팅방이 존재합니다."),

    ;




    private final HttpStatus httpStatus;
    private final String errorCode;
    private final String message;
}
