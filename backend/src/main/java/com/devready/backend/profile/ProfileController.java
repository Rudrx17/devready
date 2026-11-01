package com.devready.backend.profile;

import com.devready.backend.common.Stub;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    // TODO Month 6: start the GitHub OAuth flow (public data only, do not persist the token)
    @PostMapping("/github/connect")
    public void githubConnect() {
        throw Stub.todo("Month 6");
    }

    // TODO Month 6: OAuth redirect target. GitHub calls this without our JWT, so the callback
    // will need its own handling (for example a signed state parameter) when it is built.
    @GetMapping("/github/callback")
    public void githubCallback() {
        throw Stub.todo("Month 6");
    }

    // TODO Month 6: connect by public handle, cached sync, behind LEETCODE_ENABLED
    @PostMapping("/leetcode")
    public void leetcode() {
        throw Stub.todo("Month 6");
    }

    // TODO Month 8 (optional): official Codeforces API
    @PostMapping("/codeforces")
    public void codeforces() {
        throw Stub.todo("Month 8");
    }

    // TODO Month 6: self-reported level when no profile is available
    @PostMapping("/self-report")
    public void selfReport() {
        throw Stub.todo("Month 6");
    }

    // TODO Month 6: dashboard data from connected accounts
    @GetMapping("/summary")
    public void summary() {
        throw Stub.todo("Month 6");
    }

    // TODO Month 6: disconnect and delete synced data
    @DeleteMapping("/{provider}")
    public void disconnect(@PathVariable String provider) {
        throw Stub.todo("Month 6");
    }
}
