package com.skola.stranih.jezika.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "nastavnik")
public class Nastavnik {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String picture;

    @Column(nullable = false)
    private double price;

    @ManyToMany(cascade = {CascadeType.MERGE})
    @JoinTable(
            name = "nastavnik_nivoi",
            joinColumns = @JoinColumn(name = "idNastavnik", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "idNivo", referencedColumnName = "id"))
    @JsonManagedReference(value = "nastavnik_nivoi")
    private Collection<Nivo> nivoi = new java.util.ArrayList<>();

    @ManyToOne(cascade = CascadeType.MERGE, optional = false) //fnt
    @JoinColumn(name = "idFilijala", nullable = false)
    @JsonBackReference(value = "filijalaNastavnici")
    private Filijala filijala;

    @Column(nullable = true)
    private String about;

    @Column(nullable = true)
    private String sertifikati;

}