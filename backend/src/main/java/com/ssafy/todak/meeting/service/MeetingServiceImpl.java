package com.ssafy.todak.meeting.service;

import com.ssafy.todak.meeting.domain.Meeting;
import com.ssafy.todak.meeting.domain.MeetingParticipant;
import com.ssafy.todak.meeting.dto.request.CreateMeetingRequestDto;
import com.ssafy.todak.meeting.dto.request.FindMeetingRequestDto;
import com.ssafy.todak.meeting.dto.response.MeetingResponseDto;
import com.ssafy.todak.meeting.repository.MeetingParticipantRepository;
import com.ssafy.todak.meeting.repository.MeetingRepository;
import com.ssafy.todak.member.domain.Member;
import com.ssafy.todak.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 *
 * 방 관련 비즈니스 로직 처리를 위한 서비스 구현
 */
@Service
@RequiredArgsConstructor
public class MeetingServiceImpl implements MeetingService {

    private final MeetingRepository meetingRepository;
    private final MemberRepository memberRepository;
    private final MeetingParticipantRepository meetingParticipantRepository;

    @Transactional
    @Override
    public int createMeeting(int memberId, CreateMeetingRequestDto createMeetingInfo) {
        Meeting meeting = Meeting.builder()
                .title(createMeetingInfo.getTitle())
                .content(createMeetingInfo.getContent())
                .maxTime(createMeetingInfo.getMaxTime())
                .totalMemberCnt(createMeetingInfo.getTotalMemberCnt())
                .password(createMeetingInfo.getPassword())
                .memberCnt(1)
                .member(memberRepository.findById(memberId).get())
                .meetingParticipantList(null)
                .build();
        meetingRepository.save(meeting);
        return meeting.getId();
    }


//
@Transactional
@Override
public int enterMeeting(int meetingId, int memberId, String password) {
        if (!meetingRepository.findById(meetingId).get().getPassword().equals("") && meetingRepository.findById(meetingId).get().getPassword() != null){
            if (!meetingRepository.findById(meetingId).get().getPassword().equals(password)){
                System.out.println("비밀번호가 다릅니다");
                return 0;
            }
        }
        System.out.println(memberId);
        if (meetingParticipantRepository.findByMember(memberRepository.findById(memberId).get()) == null){
            MeetingParticipant meetingParticipant = new MeetingParticipant();
            meetingParticipant.setMeeting(meetingRepository.findById(meetingId).get());
            meetingParticipant.setMember(memberRepository.findById(memberId).get());

            meetingParticipantRepository.save(meetingParticipant);

            Meeting meeting = meetingRepository.findById(meetingId).get();
            int a = meeting.getMemberCnt();
            meeting.setMemberCnt(a+1);
            meeting.getMeetingParticipantList().add(meetingParticipant);

            meetingRepository.save(meeting);
            return 1;
        } else {
            System.out.println("모임에 2개 이상 참여 불가");
            return 0;
        }
}

    @Transactional
    @Override
    public int leaveMeeting(int meetingId, int memberId) {
        Meeting meeting = meetingRepository.findById(meetingId).get();
        Member member = memberRepository.findById(memberId).get();
        System.out.println(memberId);
        if (meeting.getMember().getId() == memberId){ // 방장이 나가면
            deleteMeeting(meetingId);
            return -1;
        }
        int c = meetingParticipantRepository.deleteByMeetingAndMember(meeting, member);
        if (c >= 1){
            List<MeetingParticipant> list = new ArrayList<>();
            for (int i = 0; i < meeting.getMeetingParticipantList().size(); i++){
                if (meeting.getMeetingParticipantList().get(i).getMember().getId() != memberId){
                    list.add(meeting.getMeetingParticipantList().get(i));
                }
            }
            meeting.setMeetingParticipantList(list);
            meeting.setMemberCnt(meeting.getMemberCnt()-1);

            meetingRepository.save(meeting);
        }
        return c;
    }


    @Transactional
    @Override
    public void updateMeeting(int meetingId, CreateMeetingRequestDto createMeetingInfo) {
        Meeting updateMeeting = meetingRepository.findById(meetingId).orElse(null);

//        if (updateMeeting == null) {
//            throw new RoomNotFoundException(roomId);
//        }

        updateMeeting.setTitle(createMeetingInfo.getTitle());
        updateMeeting.setContent(createMeetingInfo.getContent());
        updateMeeting.setPassword(createMeetingInfo.getPassword());

        meetingRepository.save(updateMeeting);
    }

    @Transactional(readOnly = true)
    @Override
    public MeetingResponseDto getMeetingResult(int meetingId) {
        Meeting meeting = meetingRepository.findById(meetingId).get();
        MeetingResponseDto meetingResponseDto = new MeetingResponseDto(meeting);

        return meetingResponseDto;
    }

    @Override
    public void deleteMeeting(int meetingId){
        // 미팅에 있던 참가자들 명단 저장 => 추천에 쓰기 위해
        meetingRepository.deleteById(meetingId);
    }

    public List<MeetingResponseDto> getMeetingList(){
        return meetingRepository.findAll().stream().map(MeetingResponseDto::new).collect(Collectors.toList());
    }
    public List<MeetingResponseDto> findMeeting(FindMeetingRequestDto findMeetingRequestInfo){
        List<Meeting> list = new ArrayList<>();

        if (findMeetingRequestInfo.getNickname() != null){ // 방장 닉넴으로 찾기
            Optional<Member> member = memberRepository.findMemberByNickname(findMeetingRequestInfo.getNickname());
            if (member.isPresent()) {
                list = meetingRepository.findByMember(member.get());
                return list.stream().map(MeetingResponseDto::new).collect(Collectors.toList());
            } else {
                return null;
            }
        } else { // 제목으로 찾기
            Optional<List<Meeting>> meetingList = meetingRepository.findByTitle(findMeetingRequestInfo.getTitle());
            if (meetingList.isPresent()) {
                return meetingList.get().stream().map(MeetingResponseDto::new).collect(Collectors.toList());
            } else {
                return null;
            }
        }
    }


//    public Meeitng findMeeting(final FindRoomReq findRoomReq) {
//        Room room = roomRepository.findByRoomId(findRoomReq.getRoomId());
//
//        if (room == null) {
//            throw new RoomNotFoundException(findRoomReq.getRoomId());
//        }
//
//        if (!room.getPassword().equals(findRoomReq.getPassword())) {
//            throw new RoomPasswordNotMatchException(room.getRoomId());
//        }
//
//        if (room.getStatus().equals("OFF")) {
//            throw new RoomNotFoundException(room.getStatus());
//        }
//
//        if (room.getStatus().equals("GAME")) {
//            throw new RoomStatusIsNotAvailableException(room.getStatus());
//        }
//
//        if (!room.getStatus().equals("ON")) {
//            throw new RoomStatusIsNotAvailableException(room.getStatus());
//        }
//
//        return roomRepository.findByRoomIdAndAndPasswordAndStatus(findRoomReq.getRoomId(), findRoomReq.getPassword(), "ON").orElse(null);
//    }

//    @Transactional
//    public List<String> quickRoom(final QuickRoomReq quickRoomReq) {
//        return roomRepository.findQuickRoomIds(quickRoomReq.getGameType(), true, "ON");
//    }

}