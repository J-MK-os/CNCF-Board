package com.example.backend.board.service;

import com.example.backend.board.domain.Post;
import com.example.backend.board.dto.PostDto;
import com.example.backend.board.repository.PostRepository;
import com.example.backend.exception.ProfanityDetectedException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final RestTemplate restTemplate;

    @Value("${cloud.run.profanity-filter.url}")
    private String cloudRunFilterUrl;

    public List<Post> findAll() {
        return postRepository.findAll();
    }

    public Post findById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public Post create(PostDto dto) {

        Map<String, String> requestData = Collections.singletonMap("content", dto.getContent());

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    cloudRunFilterUrl,
                    requestData,
                    Map.class
            );

            String status = (String) response.getBody().get("status");
            String message = (String) response.getBody().get("message");

            if ("rejected".equals(status)) {
                throw new ProfanityDetectedException(message);
            }

        } catch (HttpClientErrorException e) {
            throw new RuntimeException("필터링 서비스 호출 중 클라이언트 오류 발생: " + e.getMessage(), e);
        } catch (ProfanityDetectedException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("게시글 처리 중 서버리스 통신 오류 발생: " + e.getMessage(), e);
        }

        Post post = Post.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .author(dto.getAuthor())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        return postRepository.save(post);
    }

    public Post update(Long id, PostDto dto) {
        Post post = findById(id);
        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setAuthor(dto.getAuthor());
        post.setUpdatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }

    public void delete(Long id) {
        postRepository.deleteById(id);
    }
}