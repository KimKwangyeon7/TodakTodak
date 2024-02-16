package com.ssafy.todak.meeting.dto.response;

import com.ssafy.todak.meeting.domain.Meeting;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Yeseul Kim on 2021.07.05
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MeetingResponseDto {
    private int id;

    private int memberId; // 방장

    private String title;

    private String content;

    private List<String> meetingParticipantList; // 참가한 회원들의 memberId 리스트

    public MeetingResponseDto(Meeting meeting){
        this.id = meeting.getId();
        this.memberId = meeting.getMember().getId();
        this.title = meeting.getTitle();
        this.content = meeting.getContent();
        List<String> list = new ArrayList<>();
        if (meeting.getMeetingParticipantList() == null){
            this.meetingParticipantList = null;
        } else {
            for (int i = 0; i < meeting.getMeetingParticipantList().size(); i++){
                if (meeting.getMeetingParticipantList().get(i).getMeeting().getId() == meeting.getId()){
                    list.add(meeting.getMeetingParticipantList().get(i).getMember().getNickname());
                }
            }
            this.meetingParticipantList = list;
        }
    }
}