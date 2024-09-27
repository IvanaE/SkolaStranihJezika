package com.skola.stranih.jezika.api.controller;

import com.skola.stranih.jezika.api.entity.Uloga;
import com.skola.stranih.jezika.api.model.KorisnikModel;
import com.skola.stranih.jezika.api.service.KorisnikService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collection;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class KorisnikController {

    private final KorisnikService korisnikService;
    private final PasswordEncoder passwordEncoder;

    //GET /api/users/{id}
    @GetMapping
    public Collection<KorisnikModel> getUsers() {
        return korisnikService.getKorisnici();
    }

    //POST /api/users
    @PostMapping
    public KorisnikModel addUser(@RequestBody KorisnikModel korisnikModel) {
        if (korisnikModel.getPassword() != null)
            korisnikModel.setPassword(passwordEncoder.encode(korisnikModel.getPassword()));
        else
            korisnikModel.setPassword(korisnikService.loadUserByUsername(korisnikModel.getOldUsername()).getPassword());
        korisnikModel.setUloge(Arrays.asList(Uloga.valueOf(korisnikModel.getSendRole())));
        return korisnikService.dodajKorisnika(korisnikModel);
    }

    //DELETE /api/users/{id}
    @DeleteMapping("/{id}")
    public void removeUser(@PathVariable("id") Long id) {
        korisnikService.ukloniKorisnika(id);
    }

}
