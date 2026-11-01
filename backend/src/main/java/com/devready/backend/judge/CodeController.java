package com.devready.backend.judge;

import com.devready.backend.common.Stub;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/code")
public class CodeController {

    // TODO Month 2: run code against sample tests only and record a code_runs row (needs session id)
    @PostMapping("/run")
    public void run() {
        throw Stub.todo("Month 2");
    }
}
