package com.ssafy.todak.board.domain;


import com.ssafy.todak.common.BaseEntity;
import com.ssafy.todak.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private int id;

    @Column(name = "comment_content", nullable = false)
    private String content;

    @Column(nullable = false)
    private int depth; // 대댓글 깊이

    @Column(nullable = false)
    private int step; // 대댓글 중 순서 (같은 부모ID끼리)

    @Column(nullable = false)
    private int parentId; // 부모 댓글

    @Column(nullable = false)
    private int childCnt; // 해당 댓글의 총 자식 댓글 수

    @Column(nullable = true)
    private int brotherId; // 해당 댓글이 대상으로 하는 댓글ID

    @Column(columnDefinition = "boolean default false")
    private boolean isDeleted; // 삭제 여부

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", referencedColumnName = "member_id")
    private Member member; // 댓글 작성자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", referencedColumnName = "board_id")
    private Board board; // 댓글이 작성된 게시글ID

}
