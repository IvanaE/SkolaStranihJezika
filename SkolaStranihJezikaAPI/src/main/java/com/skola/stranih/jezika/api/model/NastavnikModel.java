package com.skola.stranih.jezika.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class NastavnikModel {
    private Long id;
    private String name;
    private double price;
    private List<NivoModel> nivoi;
    private FilijalaModel filijala;
    private String picture;
    private String about;
    private String sertifikati;
}
