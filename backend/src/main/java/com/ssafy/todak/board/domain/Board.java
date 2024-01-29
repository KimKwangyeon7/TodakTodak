package com.ssafy.todak.board.domain;


import com.ssafy.todak.common.BaseEntity;
import com.ssafy.todak.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Board extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private int id;

    @Column(name = "board_title", nullable = false)
    private String title;

    @Column(name = "board_content", nullable = false, columnDefinition = "TEXT")
    private String content;

    private String category;

    private int likeCnt; // 좋아요 수

    private int favoriteCnt; // 즐찾 수

    private int viewCnt; // 조회수

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", referencedColumnName = "member_id")
    private Member member; // 작성자

    @Builder.Default
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<Comment> commentList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<Favorite> favoriteList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<Like> likeList = new ArrayList<>();

}
