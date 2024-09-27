package com.skola.stranih.jezika.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FilijalaModel {
    private Long id;
    private String name;
    private String city;
    private String address;
    private String phone;
}
