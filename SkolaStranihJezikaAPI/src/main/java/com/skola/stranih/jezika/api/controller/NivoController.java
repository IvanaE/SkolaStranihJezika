package com.skola.stranih.jezika.api.controller;

import com.skola.stranih.jezika.api.model.NivoModel;
import com.skola.stranih.jezika.api.service.NivoService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin
@RestController
@RequestMapping("/api/nivoi")
@AllArgsConstructor
public class NivoController {

    private final NivoService nivoService;

    //GET /api/nivoi
    @GetMapping
    public Collection<NivoModel> getNivoi() {
        return nivoService.getNivoi();
    }

    //POST /api/nivoi
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public NivoModel dodajNivo(@RequestBody NivoModel nivoModel) {
        return nivoService.dodajNivo(nivoModel);
    }

    //DELETE /api/nivoi/{id}
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public void ukloniNivo(@PathVariable("id") Long id) {
        nivoService.ukloniNivo(nivoService.getNivo(id));
    }

}
