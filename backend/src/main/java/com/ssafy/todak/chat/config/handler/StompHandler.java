//package com.ssafy.todak.chat.config.handler;
//
//import com.ssafy.todak.chat.dto.request.MessageRequestDto;
//import com.ssafy.todak.chat.service.ChatRoomService;
//import com.ssafy.todak.chat.service.ChatService;
//import com.ssafy.todak.member.util.JwtTokenUtil;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Lazy;
//import org.springframework.messaging.Message;
//import org.springframework.messaging.MessageChannel;
//import org.springframework.messaging.simp.stomp.StompCommand;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.messaging.support.ChannelInterceptor;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//
//import java.security.Principal;
//import java.util.Collections;
//import java.util.List;
//import java.util.Optional;
//
//@Log4j2
//@Component
//@RequiredArgsConstructor
//public class StompHandler implements ChannelInterceptor {
//
//    private final JwtTokenUtil jwtTokenProvider;
//
//    private final ChatService chatService;
//
//    private final ChatRoomService chatRoomService;
//
//    int memberId = 0;
//
//    // websocket을 통해 들어온 요청이 처리 되기전 실행된다.
//    public Message<?> preSend(Message<?> message, MessageChannel channel) {
//        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
//
//        if (StompCommand.CONNECT == accessor.getCommand()) { // websocket 연결요청
//            String authorizationHeader  = accessor.getFirstNativeHeader("Authorization");
//            log.info("CONNECT {}", authorizationHeader);
//            if(authorizationHeader == null) { //예외처리
//
//            }
//            // Header의 jwt token 검증
//            jwtTokenProvider.validateToken(authorizationHeader);
//            String token = authorizationHeader.replace("Bearer ", "");
//            memberId = jwtTokenProvider.getMemberId(token);
//
//        } else if (StompCommand.SUBSCRIBE == accessor.getCommand()) { // 채팅룸 구독요청
//            // header정보에서 구독 destination정보를 얻고, roomId를 추출한다.
//            String roomId = chatService.getChatRoomId(Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("InvalidRoomId"));
//
//            // 채팅방에 들어온 클라이언트 sessionId를 roomId와 맵핑해 놓는다.(나중에 특정 세션이 어떤 채팅방에 들어가 있는지 알기 위함)
//            String sessionId = (String) message.getHeaders().get("simpSessionId");
//            chatRoomService.setUserEnterInfo(sessionId, roomId);
//            System.out.println("=====================================");
//            System.out.println(message.getHeaders());
//
//            // 클라이언트 입장 메시지를 채팅방에 발송한다.(redis publish)
//            String name = Optional.ofNullable((Principal) message.getHeaders().get("simpUser")).map(Principal::getName).orElse("UnknownUser");
////            chatService.sendChatMessage(MessageRequestDto.builder().messageType(MessageType.ENTER).chatRoomId(roomId).sender(name).build());
//            log.info("SUBSCRIBED {}, {}", name, roomId);
//
//        } else if (StompCommand.DISCONNECT == accessor.getCommand()) { // Websocket 연결 종료
//            // 연결이 종료된 클라이언트 sesssionId로 채팅방 id를 얻는다.
//            String sessionId = (String) message.getHeaders().get("simpSessionId");
//            String roomId = chatRoomService.getUserEnterRoomId(sessionId);
//
//            // 클라이언트 퇴장 메시지를 채팅방에 발송한다.(redis publish)
////            String name = Optional.ofNullable((Principal) message.getHeaders().get("simpUser")).map(Principal::getName).orElse("UnknownUser");
////            chatService.sendChatMessage(MessageRequestDto.builder().messageType(MessageType.QUIT).chatRoomId(roomId).sender(name).build());
//
//            // 퇴장한 클라이언트의 roomId 맵핑 정보를 삭제한다.
//            chatRoomService.removeUserEnterInfo(sessionId);
//            log.info("DISCONNECTED {}, {}", sessionId, roomId);
//        }
//        return message;
//    }
////    private void setAuthentication(Message<?> message, StompHeaderAccessor headerAccessor) {
////        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
////
////        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(memberId, null, authorities);
////        SecurityContextHolder.getContext().setAuthentication(authentication);
////        headerAccessor.setUser(authentication);
////    }
//
//}