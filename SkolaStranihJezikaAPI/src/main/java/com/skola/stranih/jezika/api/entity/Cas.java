package com.skola.stranih.jezika.api.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "cas")
public class Cas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column()
    private Status status;

    @Column()
    private String napomena;

    @ManyToOne(optional = false) //fnt
    @JoinColumn(name = "idKorisnik", nullable = false)
    private Korisnik korisnik;

    @OneToOne(optional = false)
    @JoinColumn(name = "idRezervacija", nullable = false)
    private Rezervacija rezervacija;

}