package com.skola.stranih.jezika.api.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.skola.stranih.jezika.api.entity.Uloga;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class KorisnikModel {
    private Long id;
    @JsonProperty("first_name")
    private String firstName;
    @JsonProperty("last_name")
    private String lastName;
    private String username;
    private String email;
    private String phone;
    private String address;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private Collection<Uloga> uloge;
    private FilijalaModel filijala;
    @JsonIgnore
    private String sendRole;
    private Boolean enabled = true;
    private String oldUsername;
}
