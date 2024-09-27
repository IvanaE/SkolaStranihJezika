package com.skola.stranih.jezika.api.controller;

import com.skola.stranih.jezika.api.entity.Korisnik;
import com.skola.stranih.jezika.api.entity.Uloga;
import com.skola.stranih.jezika.api.model.RezervacijaModel;
import com.skola.stranih.jezika.api.model.TerminModel;
import com.skola.stranih.jezika.api.service.CasService;
import com.skola.stranih.jezika.api.service.RezervacijaService;
import com.skola.stranih.jezika.api.service.TerminService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Objects;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/termini")
@AllArgsConstructor
public class TerminController {

    private final TerminService terminService;
    private final RezervacijaService rezervacijaService;

    private final CasService casService;

    //GET /api/termini
    @GetMapping
    public Collection<TerminModel> getTermini() {
        return terminService.getTermini();
    }

    @GetMapping("/zauzeti")
    public Collection<Long> getTerminiZauzetiId(){
        var zauzeti = casService.getCasovi().stream().map(casModel -> casModel.getRezervacija().getTermin().getId()).collect(Collectors.toList());
        return terminService.getTermini().stream().map(TerminModel::getId).filter(zauzeti::contains).collect(Collectors.toList());
    }

    @GetMapping("/cekanje")
    public Collection<Long> getTerminiCekajuId(){
        var hold = rezervacijaService.getRezervacije().stream().map(rezervacijaModel -> rezervacijaModel.getTermin().getId()).collect(Collectors.toList());
        return terminService.getTermini().stream().map(TerminModel::getId).filter(hold::contains).collect(Collectors.toList());
    }

    //GET /api/termini/{id}
    @GetMapping("/{id}")
    public TerminModel getTermin(@PathVariable("id") Long id) {
        return terminService.getTermin(id);
    }

    //GET /api/termini/{id}/rezervacije
    @GetMapping("/{id}/rezervacije")
    public Collection<RezervacijaModel> getRezervacijeTermina(@PathVariable("id") Long id) {
        Collection<RezervacijaModel> rezervacije = rezervacijaService.getRezervacije();
        rezervacije = rezervacije.stream().filter(rezervacija -> Objects.equals(rezervacija.getTermin().getId(), id)).collect(Collectors.toList());
        return rezervacije;
    }

    //POST /api/termini
    @PostMapping
    public ResponseEntity<?> dodajTermine(@RequestBody Collection<TerminModel> terminModels, Authentication auth) {

        if (auth.getAuthorities().iterator().next() == Uloga.ROLE_ADMIN || Objects.equals(terminModels.iterator().next().getNastavnik().getFilijala().getId(), ((Korisnik) auth.getPrincipal()).getFilijala().getId()))
            for (TerminModel terminModel : terminModels) {
                terminModel.setTerminVreme(terminModel.getTerminVreme().withHour(terminModel.getTerminVreme().getHour()+2));
                terminModel.setId(terminService.dodajTermin(terminModel).getId());
            }
        else return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok().body(terminModels);
    }

    //DELETE /api/termini/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> ukloniTermin(@PathVariable("id") Long id, Authentication auth) {
        if (auth.getAuthorities().iterator().next() == Uloga.ROLE_ADMIN || Objects.equals(terminService.getTermin(id).getNastavnik().getFilijala().getId(), ((Korisnik) auth.getPrincipal()).getFilijala().getId()))
            terminService.ukloniTermin(terminService.getTermin(id));
        else return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok().body(null);
    }

}
