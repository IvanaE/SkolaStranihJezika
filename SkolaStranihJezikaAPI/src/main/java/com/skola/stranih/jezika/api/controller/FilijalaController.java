package com.skola.stranih.jezika.api.controller;

import com.skola.stranih.jezika.api.model.FilijalaModel;
import com.skola.stranih.jezika.api.service.FilijalaService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin
@RestController
@RequestMapping("/api/filijale")
@AllArgsConstructor
public class FilijalaController {

    private final FilijalaService filijalaService;

    //GET /api/filijale
    @GetMapping
    public Collection<FilijalaModel> getFilijale() {
        return filijalaService.getFilijale();
    }

    //POST /api/filijale
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public FilijalaModel dodajFilijalu(@RequestBody FilijalaModel filijalaModel) {
        return filijalaService.dodajFilijalu(filijalaModel);
    }

    //DELETE /api/filijale/{id}
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public void ukloniFilijalu(@PathVariable("id") Long id) {
        filijalaService.ukloniFilijalu(filijalaService.getFilijala(id));
    }

}
