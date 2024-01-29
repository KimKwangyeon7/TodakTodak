package com.ssafy.todak.goal.repository;

import com.ssafy.todak.goal.domain.GoalFriend;
import com.ssafy.todak.goal.domain.GoalFriendId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalFriendRepository extends JpaRepository<GoalFriend, GoalFriendId> {

}
