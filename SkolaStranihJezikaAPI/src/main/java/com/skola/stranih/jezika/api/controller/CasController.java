package com.skola.stranih.jezika.api.controller;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.skola.stranih.jezika.api.entity.Korisnik;
import com.skola.stranih.jezika.api.entity.Uloga;
import com.skola.stranih.jezika.api.model.CasModel;
import com.skola.stranih.jezika.api.service.EmailService;
import com.skola.stranih.jezika.api.service.CasService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Objects;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/casovi")
@AllArgsConstructor
public class CasController {

    private final CasService casService;
    private final EmailService emailService;
    private final ModelMapper modelMapper;

    @GetMapping
    public Collection<CasModel> getCasovi(Authentication auth) {
        Collection<CasModel> casovi = casService.getCasovi();
        if (auth.getAuthorities().iterator().next() == Uloga.ROLE_USER && !casovi.isEmpty())
            casovi = casService.getCasovi().stream().filter(casModel -> Objects.equals(casModel.getRezervacija().getTermin().getNastavnik().getFilijala().getId(), ((Korisnik) auth.getPrincipal()).getFilijala().getId())).collect(Collectors.toList());
        return casovi;
    }

    //POST /api/casovi
    @PostMapping
    public ResponseEntity<?> dodajCas(@RequestBody CasModel casModel, Authentication auth) throws IOException, WriterException {
        if (auth.getAuthorities().iterator().next() == Uloga.ROLE_ADMIN || Objects.equals(casModel.getRezervacija().getTermin().getNastavnik().getFilijala().getId(), ((Korisnik) auth.getPrincipal()).getFilijala().getId())) {
            var rezervacija = casModel.getRezervacija();
            String message = "<p>Poštovani " + rezervacija.getFirstName() + " " + rezervacija.getLastName() + ",</p>" +
                    "<p>Vaša e-potvrda za : " + rezervacija.getTermin().getTerminVreme().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm")) + "</p>";
            message += "<p>Molimo Vas ponesite ovu potvrdu prilikom dolaska na cas. Srećno!</p>";
            String content = "Datum: " + rezervacija.getTermin().getTerminVreme().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm")) + "\n";
            content += "Nastavnik: " + rezervacija.getTermin().getNastavnik().getId() + "\n";
            content += "Filijala: " + rezervacija.getTermin().getNastavnik().getFilijala().getName() + ", ";
            content += rezervacija.getTermin().getNastavnik().getFilijala().getAddress() + ", ";
            content += rezervacija.getTermin().getNastavnik().getFilijala().getCity() + "\n";
            content += "Rezervaciju potvrdio: " + casModel.getKorisnik().getFirstName() + " " + casModel.getKorisnik().getLastName() + "\n";
            content += "Rezervacija ID: " + rezervacija.getId() + "\n";
            QRCodeWriter barcodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix =
                    barcodeWriter.encode(content, BarcodeFormat.QR_CODE, 200, 200);
            BufferedImage qrcode = MatrixToImageWriter.toBufferedImage(bitMatrix);
            emailService.posaljiRezervaciju("rezervacije@skolastranihjezika.com", rezervacija.getEmail(), "Škola stranih jezika - Potvrda rezervacije", message, qrcode);
            return ResponseEntity.ok(casService.dodajCas(casModel));
        } else return ResponseEntity.badRequest().body(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> obrisiCas(@PathVariable("id") Long id, Authentication auth) {
        if (auth.getAuthorities().iterator().next() == Uloga.ROLE_ADMIN || Objects.equals(casService.getCas(id).getRezervacija().getTermin().getNastavnik().getFilijala().getId(), ((Korisnik) auth.getPrincipal()).getFilijala().getId()))
            casService.ukloniCas(casService.getCas(id));
        else return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok().body(null);
    }
}

