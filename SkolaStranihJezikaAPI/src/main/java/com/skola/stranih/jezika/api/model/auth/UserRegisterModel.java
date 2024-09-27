package com.skola.stranih.jezika.api.model.auth;

import com.skola.stranih.jezika.api.entity.KorisnickiPodaci;
import com.skola.stranih.jezika.api.entity.Uloga;
import com.skola.stranih.jezika.api.model.FilijalaModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserRegisterModel extends KorisnickiPodaci {

    private String username;
    private String password;
    private Set<Uloga> uloge;
    @JsonIgnore
    private String sendRole;
    private FilijalaModel filijala;
}
