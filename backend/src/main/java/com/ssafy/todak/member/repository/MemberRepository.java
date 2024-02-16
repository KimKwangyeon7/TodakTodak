package com.ssafy.todak.member.repository;

import com.ssafy.todak.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

    Optional<Member> findById(int memberId); //이메일로 유저찾기

    Optional<Member> findByEmail(String email); //이메일로 유저찾기

    Optional<Member> findByNickname(String nickname); //닉네임으로 유저찾기


}
