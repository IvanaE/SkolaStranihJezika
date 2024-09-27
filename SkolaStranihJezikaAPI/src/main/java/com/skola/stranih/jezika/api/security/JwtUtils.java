package com.skola.stranih.jezika.api.security;

import com.skola.stranih.jezika.api.entity.Korisnik;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${auth.jwt.secret}")
    private String jwtSecret;

    @Value("${auth.jwt.expiration}")
    private int jwtExpiration;

    public String generateJwtToken(Authentication authentication) {

        Korisnik korisnikPrincipal = (Korisnik) authentication.getPrincipal();

        return "Bearer " + Jwts.builder()
                .setSubject((korisnikPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpiration))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Neispravan JWT potpis: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Neispravan JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token je istekao: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token nije podržan: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("String je prazan: {}", e.getMessage());
        }
        return false;
    }
}
