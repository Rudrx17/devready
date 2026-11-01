package com.devready.backend.anticheat;

import com.devready.backend.common.Stub;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sessions")
public class AntiCheatController {

    // TODO Month 5: receive browser events, rule-check, store with severity
    @PostMapping("/{id}/events")
    public void events(@PathVariable Long id) {
        throw Stub.todo("Month 5");
    }
}
