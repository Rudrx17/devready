package com.devready.backend.ability;

import com.devready.backend.common.Stub;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/abilities")
public class AbilityController {

    // TODO Month 7: per-topic ability estimates for the current user
    @GetMapping
    public void list() {
        throw Stub.todo("Month 7");
    }
}
