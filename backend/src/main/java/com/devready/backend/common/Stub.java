package com.devready.backend.common;

import org.springframework.http.HttpStatus;

/** Placeholder for a route whose feature arrives in a later month. Replace the call, keep the route. */
public final class Stub {

    private Stub() {}

    public static ApiException todo(String month) {
        return new ApiException(HttpStatus.NOT_IMPLEMENTED, "Not implemented yet (planned for " + month + ")");
    }
}
