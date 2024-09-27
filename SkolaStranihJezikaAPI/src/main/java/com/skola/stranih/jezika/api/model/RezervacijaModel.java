package com.skola.stranih.jezika.api.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RezervacijaModel {
    private Long id;
    private TerminModel termin;
    @JsonProperty("rezervacijaDatum")
    private LocalDateTime rezervacijaDatum = LocalDateTime.now();
    @JsonProperty("first_name")
    private String firstName;
    @JsonProperty("last_name")
    private String lastName;
    private String phone;
    private String address;
    private String email;
    private String napomena;
    private String nivo;
}
