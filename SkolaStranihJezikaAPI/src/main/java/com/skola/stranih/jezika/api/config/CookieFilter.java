package com.skola.stranih.jezika.api.config;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;

public class CookieFilter extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletResponse resp = (HttpServletResponse) response;
        ResponseCookie cookie = ResponseCookie.from("SameSite", "Strict")
                .httpOnly(true)
                .secure(false)
                .maxAge(Duration.ofHours(1))
                .sameSite("Strict")
                .build();
        resp.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        chain.doFilter(request, response);
    }
}
