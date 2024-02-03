package com.ssafy.todak.meeting.service;

import com.ssafy.todak.meeting.dto.request.CreateMeetingRequestDto;
import com.ssafy.todak.meeting.dto.request.FindMeetingRequestDto;
import com.ssafy.todak.meeting.dto.response.MeetingResponseDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MeetingService {
    int createMeeting(int memberId, CreateMeetingRequestDto createMeetingInfo);

    @Transactional
    int enterMeeting(int meetingId, int memberId, String password);

    @Transactional
    int leaveMeeting(int meetingId, int memberId);

    @Transactional
    void updateMeeting(int meetingId, CreateMeetingRequestDto createMeetingInfo);

    @Transactional(readOnly = true)
    MeetingResponseDto getMeetingResult(int meetingId);

    void deleteMeeting(int meetingId);

    List<MeetingResponseDto> findMeeting(FindMeetingRequestDto findMeetingRequestInfo);

    List<MeetingResponseDto> getMeetingList();
}
