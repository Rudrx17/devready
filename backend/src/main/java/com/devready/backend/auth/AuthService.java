package com.devready.backend.auth;

import com.devready.backend.auth.AuthDtos.AuthResponse;
import com.devready.backend.auth.AuthDtos.LoginRequest;
import com.devready.backend.auth.AuthDtos.RegisterRequest;
import com.devready.backend.common.ApiException;
import java.util.Locale;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthService(UserRepository users, PasswordEncoder encoder, JwtService jwt) {
        this.users = users;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        String email = normalise(req.email());
        if (users.existsByEmail(email)) {
            throw new ApiException(HttpStatus.CONFLICT, "Email is already registered");
        }
        Short year = req.yearOfStudy() == null ? null : req.yearOfStudy().shortValue();
        User user;
        try {
            user = users.saveAndFlush(new User(email, encoder.encode(req.password()),
                    req.fullName().trim(), year));
        } catch (DataIntegrityViolationException e) {   // two registrations raced
            throw new ApiException(HttpStatus.CONFLICT, "Email is already registered");
        }
        return tokenFor(user);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest req) {
        User user = users.findByEmail(normalise(req.email()))
                .filter(u -> encoder.matches(req.password(), u.getPasswordHash()))
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));
        return tokenFor(user);
    }

    private AuthResponse tokenFor(User user) {
        JwtService.Token t = jwt.issue(user.getId(), user.getEmail(), user.getRole());
        return new AuthResponse(t.value(), "Bearer", t.expiresInSec());
    }

    private static String normalise(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }
}
