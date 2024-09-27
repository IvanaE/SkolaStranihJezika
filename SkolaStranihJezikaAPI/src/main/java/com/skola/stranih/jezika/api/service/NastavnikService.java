package com.skola.stranih.jezika.api.service;

import com.skola.stranih.jezika.api.entity.Nastavnik;
import com.skola.stranih.jezika.api.model.NastavnikModel;
import com.skola.stranih.jezika.api.repository.NastavnikRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;

@Service
@AllArgsConstructor
public class NastavnikService {

    private final NastavnikRepository nastavnikRepository;
    private final ModelMapper modelMapper;

    public Collection<NastavnikModel> getNastavnici() {
        return Arrays.asList(modelMapper.map(nastavnikRepository.findAll(), NastavnikModel[].class));
    }

    public NastavnikModel getNastavnik(Long id) {
        return modelMapper.map(nastavnikRepository.findById(id).get(), NastavnikModel.class);
    }

    public NastavnikModel dodajNastavnika(NastavnikModel nastavnikModel) {
        Nastavnik nastavnik = nastavnikRepository.save(modelMapper.map(nastavnikModel, Nastavnik.class));
        return modelMapper.map(nastavnik, NastavnikModel.class);
    }

    public void ukloniNastavnika(NastavnikModel nastavnikModel) {
        nastavnikRepository.deleteById(nastavnikModel.getId());
    }


}
