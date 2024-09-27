package com.skola.stranih.jezika.api.model;


import com.skola.stranih.jezika.api.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CasModel {
    private Long id;
    private KorisnikModel korisnik;
    private RezervacijaModel rezervacija;
    private TerminModel termin;
    private String napomena;
    private Status status;
}
