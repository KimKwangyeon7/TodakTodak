package com.ssafy.todak.meeting.controller;

import com.ssafy.todak.meeting.domain.Meeting;
import com.ssafy.todak.meeting.dto.request.CreateMeetingRequestDto;
import com.ssafy.todak.meeting.dto.request.FindMeetingRequestDto;
import com.ssafy.todak.meeting.dto.response.MeetingResponseDto;
import com.ssafy.todak.meeting.service.MeetingService;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@RestController
@RequiredArgsConstructor
@RequestMapping("/meetings")
public class MeetingController {
    private final int LIMIT = 6;
    private final MeetingService meetingService;
    private final int memberId = 1;

    // 오픈비두 객체 SDK
    private final OpenVidu openVidu;

    // 방 관리
    private Map<Object, SessionInfo> mapSessionInfos = new ConcurrentHashMap<>();

    // 오픈비두 서버 관련 변수
    private String OPENVIDU_URL;
    private String SECRET;

    // RoomController에 접근할 때마다 오픈비두 서버 관련 변수를 얻어옴
    @Autowired
    public MeetingController(MeetingService meetingService, @Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl) {
        this.meetingService = meetingService;
        this.SECRET = secret;
        this.OPENVIDU_URL = openviduUrl;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
    }

    @PostMapping("")
    //@ApiOperation(value = "방을 만들 때 사용", notes = "<strong>방 만들기</strong>을 통해 세션과 토큰을 생성 후 토큰, 방이름, 방설명, 최대인원, 최대시간 => password 없을시, 빈문자열 넣기")
    //@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<MeetingResponseDto> createMeeting(@RequestBody CreateMeetingRequestDto createMeetingInfo) {
        // DB 저장 및 세션에 현재 인원, 종료 시간(1시간 후) 저장
        int meetingId =  meetingService.createMeeting(memberId, createMeetingInfo);
        SessionInfo sessionInfo = new SessionInfo(LocalDateTime.now().plusHours(1), 1);
        mapSessionInfos.put(meetingId, sessionInfo);

        return ResponseEntity.ok(meetingService.getMeetingResult(meetingId));
    }


    @GetMapping("")
    public ResponseEntity<List<MeetingResponseDto>> getMeetingList(){
        return ResponseEntity.ok(meetingService.getMeetingList());
    }

    @PostMapping("/search")
    public ResponseEntity<List<MeetingResponseDto>> findMeeting(@RequestBody FindMeetingRequestDto findMeetingRequestInfo) throws OpenViduJavaClientException, OpenViduHttpException {
        // 검색할 방이 존재하는지 확인
        List<MeetingResponseDto> meetingList = meetingService.findMeeting(findMeetingRequestInfo);
        return ResponseEntity.ok(meetingList);
    }

    @PutMapping("/{meetingId}/enter")
    public ResponseEntity<MeetingResponseDto> enterMeeting(@PathVariable int meetingId, @RequestParam String password) { // 미팅 입장
        System.out.println("모임 아이디: " + meetingId + "로그인한 멤버 아이디: " + memberId + "입력한 비번: " + password);
        System.out.println("맵 세션: " + mapSessionInfos.toString());
        int cnt = 0;
        if (mapSessionInfos.get(meetingId) == null){
            MeetingResponseDto meetingInfo = meetingService.getMeetingResult(meetingId);
            if (meetingInfo.getMeetingParticipantList() == null){
                cnt = 1;
            } else{
                cnt = meetingInfo.getMeetingParticipantList().size()+1;
            }
            SessionInfo sessionInfo = new SessionInfo(LocalDateTime.now().plusHours(1), cnt);
            mapSessionInfos.put(meetingId, sessionInfo);
        } else {
            cnt = this.mapSessionInfos.get(meetingId).getMemberCnt();
        }

        // 이미 다 찼다면
        if (cnt == 6) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // 방 관리 map에서 인원수 갱신
        this.mapSessionInfos.get(meetingId).upMemberCnt();

        if (meetingService.enterMeeting(meetingId, memberId, password) == 1){ // 모임에 들어가면

        } else { // 못 들어가면
            mapSessionInfos.get(meetingId).downMemberCnt(); // 다시 인원수 낮추기
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok(meetingService.getMeetingResult(meetingId));
    }


    @PutMapping("/{meetingId}/leave")
    public ResponseEntity leaveMeeting(@PathVariable int meetingId) { // 미팅 떠나기
        int cnt = 0;
        if (mapSessionInfos.get(meetingId) == null){
            MeetingResponseDto meetingInfo = meetingService.getMeetingResult(meetingId);
            if (meetingInfo.getMeetingParticipantList() == null){
                cnt = 1;
            } else{
                cnt = meetingInfo.getMeetingParticipantList().size()+1;
            }
            SessionInfo sessionInfo = new SessionInfo(LocalDateTime.now().plusHours(1), cnt);
            mapSessionInfos.put(meetingId, sessionInfo);
        }

        // 마지막 참가자라면
        if (cnt == 1) {
            // 방 관리 map에서 삭제
            this.mapSessionInfos.remove(meetingId);
            // DB에서 삭제
            meetingService.deleteMeeting(meetingId);
        } else {
            // 방 관리 map에서 인원수 갱신
            this.mapSessionInfos.get(meetingId).downMemberCnt();
            int c = meetingService.leaveMeeting(meetingId, memberId);

            if (c >= 1){ // 목록에서 삭제
                mapSessionInfos.get(meetingId).downMemberCnt();
            } else if (c == -1) {
                mapSessionInfos.remove(meetingId);
            }
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{meetingId}")
    public ResponseEntity<MeetingResponseDto> updateMeeting(@PathVariable int meetingId, @RequestBody CreateMeetingRequestDto createMeetingInfo) { // 미팅 수정
        meetingService.updateMeeting(meetingId, createMeetingInfo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private static class SessionInfo {
        private LocalDateTime endTime;
        private int memberCnt;

        public SessionInfo(LocalDateTime endTime, int memberCnt) {
            this.endTime = endTime;
            this.memberCnt =memberCnt;
        }

        public LocalDateTime getEndTime() {
            return endTime;
        }

        public int getMemberCnt() {
            return memberCnt;
        }

        public void upMemberCnt() {
            memberCnt++;
        }

        public void downMemberCnt() {
            if (memberCnt > 0) {
                memberCnt--;
            }
        }

        public boolean isMeetingOver() {
            // 현재 시간과 endTime 비교, 특정 조건에 도달하면 true 반환
            if (this.endTime.isAfter(LocalDateTime.now())){ // 현재보다 끝나는 시간이 이후면 false
                return false;
            }
            return true;
        }
    }
}

//   @PostMapping("/search")
//    @ApiOperation(value = "방을 검색할 때 사용", notes = "<strong>방 검색</strong>을 통해 검색하는 방이 존재한다면 토큰, 방이름, 게임종류, 닉네임을 반환 => password 없을시, 빈문자열 넣기")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "방 검색 성공"),
//            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
//            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
//            @ApiResponse(code = 404, message = "방 정보가 없습니다.", response = ErrorResponse.class),
//            @ApiResponse(code = 409, message = "방 접속 불가능 상태(GAME | FULL)", response = ErrorResponse.class),
//            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
//    })

//    @ApiOperation(value = "참가자가 방을 나갈 경우 사용", notes = "<strong>방 나가기</strong>를 통해 방 정보 OFF로 변경 및 방 관리 map에서 해당 정보 삭제")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "방 나가기 성공"),
//            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
//            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
//            @ApiResponse(code = 404, message = "방 정보가 없습니다.", response = ErrorResponse.class),
//            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
//    })
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")

//    @PostMapping("/quick")
//    @ApiOperation(value = "빠른 시작을 할 때 사용", notes = "<strong>빠른 시작</strong>을 통해 선택한 종목의 방이 있으면 반환하고 없다면 새로 생성 후 토큰, 방이름, 게임종류, 닉네임 반환")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "빠른 시작 성공"),
//            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
//            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
//            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
//    })
// @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
//    public ResponseEntity<RoomRes> quickRoom(@RequestBody QuickRoomReq quickRoomReq) throws OpenViduJavaClientException, OpenViduHttpException {
//        List<String> roomIds = roomService.quickRoom(quickRoomReq);
//
//        /************ 참가할 방이 존재한다면 ************/
//        if (!roomIds.isEmpty()) {
//            int min = LIMIT;
//            String minConnRoomId = null;
//
//            // 해당 종목의 방마다 참가할 수 있는지 확인
//            for (String roomId : roomIds) {
//                // 검색하는 방이 존재하지 않거나 인원초과일 경우
//                if (this.mapSessions.get(roomId) == null || this.mapSessions.get(roomId) >= LIMIT) continue;
//
//                if (min > mapSessions.get(roomId)) {
//                    min = mapSessions.get(roomId);
//                    minConnRoomId = roomId;
//                }
//            }
//
//            // 참가할 수 있다면
//            if (minConnRoomId != null) {
//                // 방 관리 map에 저장
//                this.mapSessions.put(minConnRoomId, this.mapSessions.get(minConnRoomId) + 1);
//
//                return ResponseEntity.ok(roomService.getRoomRes(minConnRoomId, quickRoomReq.getGameType()));
//            }
//        }
//        /************ 참가할 방이 존재하지 않다면 ************/
//        // 방 번호 난수 생성
//        String roomId = RandomNumberUtil.getRandomNumber();
//
//        // 방 관리 map에 저장
//        this.mapSessions.put(roomId, 1);
//
//        // DB 저장
//        roomService.makeRoom(roomId, quickRoomReq);
//
//        return ResponseEntity.ok(roomService.getRoomRes(roomId, quickRoomReq.getGameType()));
//    }