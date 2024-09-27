package com.skola.stranih.jezika.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TerminModel {
    private Long id;
    private NastavnikModel nastavnik;
    private LocalDateTime terminVreme;
}
