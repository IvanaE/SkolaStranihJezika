package com.skola.stranih.jezika.api.service;


import com.skola.stranih.jezika.api.entity.Rezervacija;
import com.skola.stranih.jezika.api.model.RezervacijaModel;
import com.skola.stranih.jezika.api.repository.RezervacijaRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;

@Service
@AllArgsConstructor
public class RezervacijaService {

    private final RezervacijaRepository rezervacijaRepository;
    private final ModelMapper modelMapper;

    public Collection<RezervacijaModel> getRezervacije() {
        return Arrays.asList(modelMapper.map(rezervacijaRepository.findAll(), RezervacijaModel[].class));
    }

    public RezervacijaModel getRezervacija(Long id) {
        return modelMapper.map(rezervacijaRepository.findById(id).get(), RezervacijaModel.class);
    }

    public RezervacijaModel dodajRezervaciju(RezervacijaModel rezervacijaModel) {
        Rezervacija rezervacija = rezervacijaRepository.save(modelMapper.map(rezervacijaModel, Rezervacija.class));
        return modelMapper.map(rezervacija, RezervacijaModel.class);
    }

    public void ukloniRezervaciju(RezervacijaModel rezervacijaModel) {
        rezervacijaRepository.deleteById(rezervacijaModel.getId());
    }

}
