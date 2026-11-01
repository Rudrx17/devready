package com.devready.backend.assessment;

import com.devready.backend.common.Stub;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    // TODO Month 2-3: body {type: CODING|APTITUDE}; set seed, burst plan and deadline
    @PostMapping
    public void start() {
        throw Stub.todo("Month 2-3");
    }

    // TODO Month 2-3: serve the next question (no answers or hidden tests)
    @GetMapping("/{id}/next")
    public void next(@PathVariable Long id) {
        throw Stub.todo("Month 2-3");
    }

    // TODO Month 2-3: evaluate, record submission and score event, adapt difficulty
    @PostMapping("/{id}/answers")
    public void answer(@PathVariable Long id) {
        throw Stub.todo("Month 2-3");
    }

    // TODO Month 4: end session, update abilities, build the report
    @PostMapping("/{id}/finish")
    public void finish(@PathVariable Long id) {
        throw Stub.todo("Month 4");
    }

    // TODO Month 4: weak topics, next steps, per-topic breakdown, integrity summary
    @GetMapping("/{id}/report")
    public void report(@PathVariable Long id) {
        throw Stub.todo("Month 4");
    }
}
