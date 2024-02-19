//package com.ssafy.todak.notification;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.ssafy.todak.member.domain.Member;
//import com.ssafy.todak.member.repository.MemberRepository;
//import com.ssafy.todak.notification.domain.Notification;
//import com.ssafy.todak.notification.repository.NotificationRepository;
//import io.netty.util.HashedWheelTimer;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Component;
//import org.springframework.util.StringUtils;
//import org.springframework.web.socket.CloseStatus;
//import org.springframework.web.socket.TextMessage;
//import org.springframework.web.socket.WebSocketSession;
//import org.springframework.web.socket.handler.TextWebSocketHandler;
//
//import java.util.*;
//
//@Component
//@Slf4j
//@RequiredArgsConstructor
//public class NotificationHandler extends TextWebSocketHandler {
//
//    private final ObjectMapper mapper;
//    private final MemberRepository memberRepository;
//    private final NotificationRepository notificationRepository;
//
//    // 전체 로그인 유저
//    private Set<WebSocketSession> sessions = new HashSet<>();
//
//    // 1대1 매핑
//    private Map<Integer, List<WebSocketSession>> userSessionMap = new HashMap<>();
//    private int receiveId;
//
////    @Override
////    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
////        log.info("Socket 연결");
////        sessions.add(session);
////        log.info(sendPushUsername(session));				//현재 접속한 사람의 nickname이 출력됨
////        String senderNickname = sendPushUsername(session);
////        userSessionMap.put(senderNickname, session);
////    }
//
//    /**
//     *
//     *          chats.value.push({
//     *             roomId: chat.roomId,
//     *             message: chat.message,
//     *             sender: chat.nickname,
//     *             messageType: chat.messageType,
//     *           });
//     */
//
//    @Override
//    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
//        log.info("session = " + sendPushUsername(session));
//        String payload = message.getPayload();				//js에서 넘어온 메세지
//        log.info("payload = " + payload);
//
//        // 메시지 형식: str[0]: 타입 - 채팅 / 친구 요청, str[1]: 보낸 유저 , str[2]: 알림 받을 유저, str[3]: chatroomId / friendId
//        if (!StringUtils.isEmpty(payload)) { // 메시지가 null이 아닌 경우
//            String[] strs = payload.split(",");
//            if (strs != null && strs.length == 3) {
//                // 친구 요청 보낸 유저
//                String requestMember = strs[0];
//                // 친구 요청 받은 유저
//                String receiveMember = strs[1];
//
//                receiveId = memberRepository.findByNickname(receiveMember);
//                TextMessage textMsg = new TextMessage(requestMember + "님이 친구 요청을 보냈습니다.");
//                // 알림 받을 사람이 로그인 상태일 때 보내기
//                // 알림 받을 사람이 로그인 X
//                if (!userSessionMap.containsKey(receiveId)) {
//                    Notification notification = new Notification(0, false, textMsg.toString(), memberRepository.findById(receiveId).get());
//                    notificationRepository.save(notification);
//                    return;
//                }
//                // 알림 받을 유저가 로그인 O
//                List<WebSocketSession> receiveSession = userSessionMap.get(receiveId);
//
//                // 비었으면
//                if (receiveSession.isEmpty()){
//                    userSessionMap.put(receiveId, new ArrayList<>());
//                }
//
//                // DB에서 알림 리스트 가져오기
//                List<Notification> notiList = notificationRepository.findAllById(receiveId);
//
//                for (int i = 0; i < notiList.size(); i++){
//                    session.sendMessage(new TextMessage(notiList.get(i).getMsg()));
//                    notificationRepository.delete(notiList.get(i));
//                }
////                // 채팅
////                if ("chat".equals(pushCategory) && receiveSession != null) {
////                    TextMessage textMsg = new TextMessage(requestMember + " 님이 메시지를 보냈습니다.");
////                    receiveSession.sendMessage(textMsg);
////                }
//
//
//
////                //자식댓글
////                else if ("reReply".equals(pushCategory) && sendedPushSession != null) {
////                    TextMessage textMsg = new TextMessage(replyWriter + " 님이 " + "<a href='/porfolDetail/" + boardId + "' style=\"color:black\"><strong>" + title + "</strong> 글의 회원님 댓글에 답글을 남겼습니다.</a>");
////                    sendedPushSession.sendMessage(textMsg);
////                }
//            }
//        }
//    }
//
//    @Override
//    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
//        log.info("Socket 연결 해제");
//        sessions.remove(session);
//        userSessionMap.remove(receiveId);
//    }
//
//    //알림을 보내는 유저(친구 요청, 채팅 보내는 유저)
//    private String sendPushUsername(WebSocketSession session) {
//        String userNickname;
//
//        if (session.getPrincipal() == null) {
//            userNickname = null;
//        } else {
//            userNickname = session.getPrincipal().getName();
//        }
//        return userNickname;
//    }
//}