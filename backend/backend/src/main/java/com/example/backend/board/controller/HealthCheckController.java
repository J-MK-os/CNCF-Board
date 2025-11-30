package com.example.backend.board.controller; 

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    @GetMapping("/")
    public ResponseEntity<String> rootHealthCheck() {
        return ResponseEntity.ok("Backend Service is fully operational");
    }
}
