package com.example.backend.board.controller;

import com.example.backend.board.domain.Post;
import com.example.backend.board.dto.PostDto;
import com.example.backend.board.service.PostService;
import com.example.backend.exception.ProfanityDetectedException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    
    @GetMapping
    public List<Post> list() {
        return postService.findAll();
    }

    @GetMapping("/{id}")
    public Post get(@PathVariable Long id) {
        return postService.findById(id);
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody PostDto dto) {
        Post post = postService.create(dto);
        return new ResponseEntity<>(post, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public Post update(@PathVariable Long id, @RequestBody PostDto dto) {
        return postService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        postService.delete(id);
    }
    
    @ExceptionHandler(ProfanityDetectedException.class)
    public ResponseEntity<Map<String, String>> handleProfanityDetectedException(ProfanityDetectedException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Profanity Detected");
        errorResponse.put("message", ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
