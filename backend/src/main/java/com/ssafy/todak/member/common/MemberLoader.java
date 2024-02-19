package com.ssafy.todak.member.common;

import com.ssafy.todak.member.domain.Member;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class MemberLoader {

    public Member getMember() {
        Member principal = (Member) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal;
    }
    public String getEmail() {
        Member principal = (Member) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal.getEmail();
    }
    public int getId() {
        Member principal = (Member) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal.getId();
    }

    public String getNickname() {
        Member principal = (Member) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal.getNickname();
    }

}
