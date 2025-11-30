package com.example.backend.board.controller;

import com.example.backend.board.domain.Post;
import com.example.backend.board.dto.PostDto;
import com.example.backend.board.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity; // Test

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    // Test
    @GetMapping("/")
    public ResponseEntity<String> healthCheck() {
        // Load Balancer가 헬스 체크를 할 때 200 OK 응답을 반환
        return ResponseEntity.ok("Backend is Running");
    }
    // Test End
    
    @GetMapping
    public List<Post> list() {
        return postService.findAll();
    }

    @GetMapping("/{id}")
    public Post get(@PathVariable Long id) {
        return postService.findById(id);
    }

    @PostMapping
    public Post create(@RequestBody PostDto dto) {
        return postService.create(dto);
    }

    @PutMapping("/{id}")
    public Post update(@PathVariable Long id, @RequestBody PostDto dto) {
        return postService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        postService.delete(id);
    }
}
