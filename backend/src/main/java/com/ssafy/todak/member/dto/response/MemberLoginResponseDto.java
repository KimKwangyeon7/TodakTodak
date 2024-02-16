package com.ssafy.todak.member.dto.response;

import com.ssafy.todak.common.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
public class MemberLoginResponseDto extends BaseResponseBody {

    String accessToken;
    String refreshToken;

    public static MemberLoginResponseDto of(Integer statusCode, String message, String accessToken, String refreshToken) {
        MemberLoginResponseDto res = new MemberLoginResponseDto();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        res.setRefreshToken(refreshToken);

        return res;
    }

    public static MemberResponseDto checkUser(Integer statusCode, String message) {
        MemberResponseDto res = new MemberResponseDto();
        res.setMessage(message);
        return res;
    }

}
