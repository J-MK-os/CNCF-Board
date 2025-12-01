package com.example.backend.exception;

public class ProfanityDetectedException extends RuntimeException {
    public ProfanityDetectedException(String message) {
        super(message);
    }
}
