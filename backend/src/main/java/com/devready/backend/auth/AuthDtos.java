package com.devready.backend.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public final class AuthDtos {

    private AuthDtos() {}

    public record RegisterRequest(
            @NotBlank @Email @Size(max = 255) String email,
            // BCrypt only uses the first 72 bytes
            @NotBlank @Size(min = 8, max = 72) String password,
            @NotBlank @Size(max = 150) String fullName,
            @Min(1) @Max(4) Integer yearOfStudy) {}

    public record LoginRequest(
            @NotBlank String email,
            @NotBlank String password) {}

    public record AuthResponse(String token, String tokenType, long expiresInSec) {}

    public record UserResponse(Long id, String email, String fullName, String role, Integer yearOfStudy) {
        public static UserResponse from(User u) {
            Integer year = u.getYearOfStudy() == null ? null : u.getYearOfStudy().intValue();
            return new UserResponse(u.getId(), u.getEmail(), u.getFullName(), u.getRole(), year);
        }
    }
}
