package com.devready.backend.common;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.devready.backend.ability.AbilityController;
import com.devready.backend.anticheat.AntiCheatController;
import com.devready.backend.assessment.SessionController;
import com.devready.backend.judge.CodeController;
import com.devready.backend.profile.ProfileController;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

class StubControllersTest {

    private static void assertStub(Runnable call) {
        assertThatThrownBy(call::run)
                .isInstanceOfSatisfying(ApiException.class,
                        e -> assertThat(e.getStatus()).isEqualTo(HttpStatus.NOT_IMPLEMENTED));
    }

    @Test
    void everyStubReturnsNotImplemented() {
        SessionController sessions = new SessionController();
        ProfileController profiles = new ProfileController();

        assertStub(sessions::start);
        assertStub(() -> sessions.next(1L));
        assertStub(() -> sessions.answer(1L));
        assertStub(() -> sessions.finish(1L));
        assertStub(() -> sessions.report(1L));
        assertStub(() -> new CodeController().run());
        assertStub(() -> new AbilityController().list());
        assertStub(() -> new AntiCheatController().events(1L));
        assertStub(profiles::githubConnect);
        assertStub(profiles::githubCallback);
        assertStub(profiles::leetcode);
        assertStub(profiles::codeforces);
        assertStub(profiles::selfReport);
        assertStub(profiles::summary);
        assertStub(() -> profiles.disconnect("GITHUB"));
    }
}
