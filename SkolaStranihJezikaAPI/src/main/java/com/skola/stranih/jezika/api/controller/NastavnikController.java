package com.skola.stranih.jezika.api.controller;

import com.skola.stranih.jezika.api.entity.Uloga;
import com.skola.stranih.jezika.api.model.NastavnikModel;
import com.skola.stranih.jezika.api.model.TerminModel;
import com.skola.stranih.jezika.api.service.NastavnikService;
import com.skola.stranih.jezika.api.service.CasService;
import com.skola.stranih.jezika.api.service.TerminService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Objects;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/nastavnici")
@AllArgsConstructor
public class NastavnikController {

    private final NastavnikService nastavnikService;
    private final TerminService terminService;
    private final CasService casService;

    //GET /api/nastavnici/{id}
    @GetMapping("/{id}")
    public NastavnikModel getNastavnik(@PathVariable("id") Long id) {
        return nastavnikService.getNastavnik(id);
    }

    //GET /api/nastavnici
    @GetMapping
    public Collection<NastavnikModel> getNastavnici() {
        return nastavnikService.getNastavnici();
    }

    @GetMapping("/f/{id}")
    public Collection<NastavnikModel> getNastavniciFilijale(@PathVariable("id") Long id, Authentication auth) {
        if(auth.getAuthorities().iterator().next() == Uloga.ROLE_ADMIN) return getNastavnici();
        return nastavnikService.getNastavnici().stream().filter(nastavnikModel -> Objects.equals(nastavnikModel.getFilijala().getId(), id)).collect(Collectors.toList());
    }

    //POST /api/nastavnici
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public NastavnikModel dodajNastavnika(@RequestBody NastavnikModel nastavnikModel) {
        return nastavnikService.dodajNastavnika(nastavnikModel);
    }

    //DELETE /api/nastavnici/{id}
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public void ukloniNastavnika(@PathVariable("id") Long id) {
        nastavnikService.ukloniNastavnika(nastavnikService.getNastavnik(id));
    }

    //GET /api/nastavnici/{id}/termini
    @GetMapping("/{id}/termini")
    public Collection<TerminModel> getTerminiNastavnika(@PathVariable("id") Long id) {
        var zauzeti = casService.getCasovi().stream().map(value -> value.getRezervacija().getTermin().getId()).collect(Collectors.toList());
        return terminService.getTermini().stream().filter(terminModel -> Objects.equals(terminModel.getNastavnik().getId(), id) && !zauzeti.contains(terminModel.getId())).collect(Collectors.toList());
    }
}
