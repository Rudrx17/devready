package com.devready.backend.auth;

import static org.assertj.core.api.Assertions.assertThat;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import java.nio.charset.StandardCharsets;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import org.junit.jupiter.api.Test;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

class JwtServiceTest {

    private static final SecretKey KEY = new SecretKeySpec(
            "unit-test-secret-key-with-32-plus-chars!!".getBytes(StandardCharsets.UTF_8), "HmacSHA256");

    @Test
    void issuedTokenCarriesClaimsAndExpiry() {
        JwtService service = new JwtService(new NimbusJwtEncoder(new ImmutableSecret<>(KEY)), 30);

        JwtService.Token token = service.issue(42L, "a@b.com", "STUDENT");

        Jwt jwt = NimbusJwtDecoder.withSecretKey(KEY).macAlgorithm(MacAlgorithm.HS256).build()
                .decode(token.value());
        assertThat(jwt.getSubject()).isEqualTo("42");
        assertThat(jwt.<String>getClaim("email")).isEqualTo("a@b.com");
        assertThat(jwt.<String>getClaim("role")).isEqualTo("STUDENT");
        assertThat(token.expiresInSec()).isEqualTo(30 * 60);
        assertThat(jwt.getExpiresAt()).isAfter(jwt.getIssuedAt());
    }
}
