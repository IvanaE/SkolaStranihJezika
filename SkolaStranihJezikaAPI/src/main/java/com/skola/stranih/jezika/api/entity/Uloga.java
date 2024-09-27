package com.skola.stranih.jezika.api.entity;

import org.springframework.security.core.GrantedAuthority;

public enum Uloga implements GrantedAuthority {
    ROLE_USER,
    ROLE_ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}
