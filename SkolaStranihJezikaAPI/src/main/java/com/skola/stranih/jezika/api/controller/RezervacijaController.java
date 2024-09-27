package com.skola.stranih.jezika.api.controller;

import com.google.zxing.WriterException;
import com.skola.stranih.jezika.api.entity.Korisnik;
import com.skola.stranih.jezika.api.entity.Uloga;
import com.skola.stranih.jezika.api.model.RezervacijaModel;
import com.skola.stranih.jezika.api.service.EmailService;
import com.skola.stranih.jezika.api.service.CasService;
import com.skola.stranih.jezika.api.service.RezervacijaService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Objects;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/rezervacije")
@AllArgsConstructor
public class RezervacijaController {

    private final RezervacijaService rezervacijaService;
    private final CasService casService;
    private final EmailService emailService;
    private final ModelMapper modelMapper;

    @GetMapping
    public Collection<RezervacijaModel> getRezervacije() {
        return rezervacijaService.getRezervacije();
    }

    @GetMapping("/new")
    public Collection<RezervacijaModel> getNoveRezervacije() {
        var potvrdjeneRezervacije = casService.getCasovi().stream().map(casModel -> casModel.getRezervacija().getId()).collect(Collectors.toList());
        return rezervacijaService.getRezervacije().stream().filter(rezervacijaModel -> !potvrdjeneRezervacije.contains(rezervacijaModel.getId())).collect(Collectors.toList());
    }

    //POST /api/rezervacije
    @PostMapping
    public RezervacijaModel dodajRezervaciju(@RequestBody RezervacijaModel rezervacijaPostModel, Authentication auth) throws WriterException, IOException {
        var rez = rezervacijaService.dodajRezervaciju(rezervacijaPostModel);

        String message = "<p>Poštovani " + rez.getFirstName() + " " + rez.getLastName() + ",</p>" +
                "<p>Uspesno ste poslali zahtev za rezervaciju termina " + rez.getTermin().getTerminVreme().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm")) + "</p>";
        message += "<p>Nakon provere podataka i dostupnosti termina dobicete email sa potvrdom!</p>";
        emailService.posaljiRezervaciju("rezervacije@skolastranihjezika.com", rez.getEmail(), "Skola stranih jezika - Uspesna rezervacija", message);
        return rez;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> ukloniRezervaciju(@PathVariable("id") Long id, Authentication auth) throws IOException {
        if (auth.getAuthorities().iterator().next() == Uloga.ROLE_ADMIN || Objects.equals(rezervacijaService.getRezervacija(id).getTermin().getNastavnik().getFilijala().getId(), ((Korisnik) auth.getPrincipal()).getFilijala().getId())) {

            var rezervacija = rezervacijaService.getRezervacija(id);
            rezervacijaService.ukloniRezervaciju(rezervacija);
            String message = "<p>Poštovani " + rezervacija.getFirstName() + " " + rezervacija.getLastName() + ",</p>" +
                    "<p>Vaša rezervacija za : " + rezervacija.getTermin().getTerminVreme().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm")) + " je otkazana.</p>";
            emailService.posaljiRezervaciju("rezervacije@skolastranihjezika.com", rezervacija.getEmail(), "Skola stranih jezika - Rezervacija otkazana", message);
            return ResponseEntity.ok().body(null);
        } else return ResponseEntity.badRequest().body(null);
    }
}
