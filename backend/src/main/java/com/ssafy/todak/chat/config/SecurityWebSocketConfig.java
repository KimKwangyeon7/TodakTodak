//package com.ssafy.todak.chat.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.messaging.Message;
//import org.springframework.security.authorization.AuthorizationManager;
//import org.springframework.security.config.annotation.SecurityBuilder;
//import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
//import org.springframework.security.config.annotation.web.builders.WebSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry;
//import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;
//import org.springframework.security.config.annotation.web.socket.EnableWebSocketSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.messaging.access.intercept.MessageMatcherDelegatingAuthorizationManager;
//
//import static org.springframework.messaging.simp.SimpMessageType.MESSAGE;
//import static org.springframework.messaging.simp.SimpMessageType.SUBSCRIBE;
//
//@Configuration
//@EnableWebSocketSecurity
//public class SecurityWebSocketConfig {
//
//    @Bean
//    AuthorizationManager<Message<?>> messageAuthorizationManager(MessageMatcherDelegatingAuthorizationManager.Builder messages) {
//        messages
//                .nullDestMatcher().permitAll()
//                .simpDestMatchers("/pub/**").permitAll()
//                .simpSubscribeDestMatchers("/sub/**").permitAll();
//
//        return messages.build();
//    }
//
//
//    protected boolean sameOriginDisabled() {
//        return true;
//    }
//}