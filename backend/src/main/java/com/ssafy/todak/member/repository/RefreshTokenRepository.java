package com.ssafy.todak.member.repository;

import com.ssafy.todak.member.domain.RefreshToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Integer> {

    RefreshToken findRefreshTokenByMemberId(int memberId);

    RefreshToken findByMemberIdAndRefreshToken(int memberId, String refreshToken);

    RefreshToken findByRefreshToken(String refreshToken);

    void deleteRefreshTokenByMemberId(int memberId);
}
