package com.ssafy.todak.record.repository;

import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.record.domain.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecordRepository extends JpaRepository<Record, Integer> {
    List<Record> findByMember(Member member);
}

