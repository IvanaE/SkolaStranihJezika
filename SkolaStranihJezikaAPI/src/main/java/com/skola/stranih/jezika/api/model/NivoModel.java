package com.skola.stranih.jezika.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class NivoModel {
    private Long id;
    private String name;
    @JsonIgnore
    private List<NastavnikModel> nastavnici = new ArrayList<>();
}
