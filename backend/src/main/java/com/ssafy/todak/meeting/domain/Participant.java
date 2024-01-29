package com.ssafy.todak.meeting.domain;

import com.ssafy.todak.member.domain.Member;
import jakarta.persistence.Embeddable;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Embeddable
public class Participant implements Serializable {

    private int memberId;

    private int meetingId;
}
