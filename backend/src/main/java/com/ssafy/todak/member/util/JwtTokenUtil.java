package com.ssafy.todak.member.util;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.*;
import com.auth0.jwt.interfaces.JWTVerifier;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.concurrent.TimeUnit;

/**
 * jwt 토큰 유틸 정의.
 */
@Component
@RequiredArgsConstructor
public class JwtTokenUtil {

    private final RedisTemplate<String, String> redisTemplate;

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.accessExpiration}")
    private long accessExpiration;

    @Value("${jwt.refreshExpiration}")
    private long refreshExpiration;

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String ISSUER = "ssafy.com";


    public JWTVerifier getVerifier() {
        return JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();
    }

    public String createAccessToken(String memberId) {
        Date now = new Date();
        Date expires = new Date(now.getTime() + accessExpiration);

        return JWT.create()
                .withSubject(memberId)
                .withExpiresAt(expires)
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

    public String createAccessToken(Instant expires, String memberId) {
        return JWT.create()
                .withSubject(memberId)
                .withExpiresAt(Date.from(expires))
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

    public String createRefreshToken(String memberId) {
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + refreshExpiration);

        String refreshToken = JWT.create()
                .withSubject(memberId)
                .withExpiresAt(expireDate)
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));

        // redis에 저장
        redisTemplate.opsForValue().set(
                memberId,
                refreshToken,
                refreshExpiration,
                TimeUnit.MILLISECONDS
        );

        return refreshToken;
    }

    public boolean isRefreshTokenExpired(String memberId) {
        String expireTimeString = redisTemplate.opsForValue().get(getRefreshTokenKey(memberId));
        if (expireTimeString == null) {
            // 만료 시간이 없는 경우 (리프레시 토큰이 없거나 만료되었음)
            return true;
        }

        long expireTime = Long.parseLong(expireTimeString);
        return System.currentTimeMillis() > expireTime;
    }

    private String getRefreshTokenKey(String memberId) {
        return "refreshToken:" + memberId;
    }

//    public Long getExpiration(String accessToken) {
//        // accessToken 남은 유효시간
//        Date expiration = JWT.
//                .setSigningKey(key)
//                .build()
//                .parseClaimsJws(accessToken)
//                .getBody()
//                .getExpiration();
//        // 현재 시간
//        Long now = new Date().getTime();
//        return (expiration.getTime() - now);
//    }


    public void handleError(String token) {
        JWTVerifier verifier = JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();

        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            throw ex;
        } catch (InvalidClaimException ex) {
            throw ex;
        } catch (SignatureGenerationException ex) {
            throw ex;
        } catch (SignatureVerificationException ex) {
            throw ex;
        } catch (TokenExpiredException ex) {
            throw ex;
        } catch (JWTCreationException ex) {
            throw ex;
        } catch (JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }

    public void handleError(JWTVerifier verifier, String token) {
        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            throw ex;
        } catch (InvalidClaimException ex) {
            throw ex;
        } catch (SignatureGenerationException ex) {
            throw ex;
        } catch (SignatureVerificationException ex) {
            throw ex;
        } catch (TokenExpiredException ex) {
            throw ex;
        } catch (JWTCreationException ex) {
            throw ex;
        } catch (JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }
}
