package com.skola.stranih.jezika.api.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "rezervacija")
public class Rezervacija extends KorisnickiPodaci {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "idTermin")
    @JsonManagedReference(value = "")
    private Termin termin;

    @Column(nullable = false)
    private String napomena;

    @Column(nullable = false)
    private String nivo;

    @JsonProperty("rezervacijaDatum")
    @Column(name = "rezervacijaDatum", nullable = false)
    private LocalDateTime rezervacijaDatum = LocalDateTime.now();

}