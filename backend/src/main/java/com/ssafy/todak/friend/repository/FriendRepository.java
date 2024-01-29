package com.ssafy.todak.friend.repository;

import com.ssafy.todak.friend.domain.Friend;
import com.ssafy.todak.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Integer> {

    List<Friend> findAllByFromMember_Id(int memberId);

    @Query("select f from Friend f where f.fromMember = :member or f.toMember = :member")
    List<Friend> findAllFriend(Member member);

    List<Friend> findAllByToMember_Id(int memberId);

    @Query("select f from Friend f where f.fromMember = :fromMember and f.toMember = :toMember")
    Optional<Friend> findRelation(Member fromMember, Member toMember);

    @Query("select f from Friend f where f.fromMember = :toMember and f.toMember = :fromMember")
    Optional<Friend> findReverseRelation(Member fromMember, Member toMember);

    @Query("select f from Friend f " +
            "where (f.fromMember = :fromMember and f.toMember = :toMember) " +
            "or (f.fromMember = :toMember and f.toMember = :fromMember) ")
    Optional<Friend> findBothRelation(Member fromMember, Member toMember);

    List<Friend> findByFromMember_IdOrToMember_Id(int fromMemberId, int toMemberId);
}
