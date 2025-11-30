package com.example.backend.board.repository;

import com.example.backend.board.domain.Post;

import com.example.backend.board.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
