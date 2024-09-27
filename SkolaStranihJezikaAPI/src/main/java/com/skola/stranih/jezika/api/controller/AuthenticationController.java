package com.skola.stranih.jezika.api.controller;

import com.skola.stranih.jezika.api.entity.Korisnik;
import com.skola.stranih.jezika.api.entity.Uloga;
import com.skola.stranih.jezika.api.model.KorisnikModel;
import com.skola.stranih.jezika.api.model.auth.JwtUserModel;
import com.skola.stranih.jezika.api.model.auth.UserLoginModel;
import com.skola.stranih.jezika.api.model.auth.UserRegisterModel;
import com.skola.stranih.jezika.api.security.JwtUtils;
import com.skola.stranih.jezika.api.service.KorisnikService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final KorisnikService korisnikService;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody UserLoginModel userLoginModel) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userLoginModel.getUsername(), userLoginModel.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        Korisnik korisnik = modelMapper.map(authentication.getPrincipal(), Korisnik.class);
        if (korisnik.getUloge().size() == 0) korisnik.setUloge(Arrays.asList(Uloga.ROLE_USER));
        return ResponseEntity.ok(new JwtUserModel(jwt, modelMapper.map(korisnik, KorisnikModel.class)));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserRegisterModel userRegisterModel) {

        if (korisnikService.postojiKorisnicko(userRegisterModel.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body("Greška: Korisničko ime se već koristi!");
        }

        if (korisnikService.postojiEmail(userRegisterModel.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Greška: email se već koristi!");
        }

        KorisnikModel user = modelMapper.map(userRegisterModel, KorisnikModel.class);
        user.setPassword(passwordEncoder.encode(userRegisterModel.getPassword()));
        user.setUloge(Arrays.asList(Uloga.valueOf(userRegisterModel.getSendRole())));
        return ResponseEntity.ok(korisnikService.dodajKorisnika(user));
    }

}
