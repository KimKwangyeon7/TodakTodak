package com.ssafy.todak.member.domain;

import com.ssafy.todak.record.domain.Record;
import com.ssafy.todak.board.domain.Favorite;
import com.ssafy.todak.board.domain.Like;
import com.ssafy.todak.common.BaseEntity;
import com.ssafy.todak.friend.domain.Friend;
import com.ssafy.todak.goal.domain.Goal;
import com.ssafy.todak.goal.domain.Habit;
import com.ssafy.todak.meeting.domain.MeetingParticipant;
import com.ssafy.todak.notification.domain.Notification;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
@Builder
public class Member extends BaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(columnDefinition = "varchar(10) default 'USER'")
    private String role;

    private long mileage;

    @Column(nullable = false)
    private int sex;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String birthDate;

    private String memo; //자기소개

    @Column(columnDefinition = "boolean default false")
    private boolean isAlarmAgreed; //알람 동의 여부

    @Column(columnDefinition = "boolean default false")
    private boolean isLocationAgreed; //위치 동의 여부

    @Column(columnDefinition = "boolean default false")
    private boolean isFriendNotified; //친구요청 알림 여부

    @Column(columnDefinition = "boolean default false")
    private boolean isReplyNotified; //댓글 알림 여부

    @Column(columnDefinition = "boolean default false")
    private boolean isChatNotified; //채팅 알림 여부

    //OAuth2
    private String provider; //공급자

    private String providerId;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Like> likeList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Goal> goalList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Notification> notificationList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Habit> habitList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Favorite> favoriteList = new ArrayList<>();

    @OneToMany(mappedBy = "fromMember", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Friend> fromFriendList = new ArrayList<>();

    @OneToMany(mappedBy = "toMember", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Friend> toFriendList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<MeetingParticipant> meetingParticipantList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Record> recordList = new ArrayList<>();
}
