package com.ssafy.todak.notification.repository;

import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.notification.domain.Notification;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    @Query("select n from Notification n where n.member.id = :memberId" )
    List<Notification> findAllById(@Param("memberId") int memberId);

}
