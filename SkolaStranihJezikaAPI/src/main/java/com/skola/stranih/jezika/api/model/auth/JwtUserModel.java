package com.skola.stranih.jezika.api.model.auth;

import com.skola.stranih.jezika.api.model.KorisnikModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class JwtUserModel {
    private String token;
    private KorisnikModel user;
}
