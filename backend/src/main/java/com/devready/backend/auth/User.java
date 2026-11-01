package com.devready.backend.auth;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String role = "STUDENT";

    // SMALLINT in the schema, so Short (Integer fails ddl-auto=validate)
    @Column(name = "year_of_study")
    private Short yearOfStudy;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    protected User() {}

    public User(String email, String passwordHash, String fullName, Short yearOfStudy) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.fullName = fullName;
        this.yearOfStudy = yearOfStudy;
    }

    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getPasswordHash() { return passwordHash; }
    public String getFullName() { return fullName; }
    public String getRole() { return role; }
    public Short getYearOfStudy() { return yearOfStudy; }
    public Instant getCreatedAt() { return createdAt; }
}
