package com.skola.stranih.jezika.api.service;

import com.skola.stranih.jezika.api.entity.Termin;
import com.skola.stranih.jezika.api.model.TerminModel;
import com.skola.stranih.jezika.api.repository.TerminRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;

@Service
@AllArgsConstructor
public class TerminService {

    private final TerminRepository terminRepository;
    private final ModelMapper modelMapper;

    public Collection<TerminModel> getTermini() {
        return Arrays.asList(modelMapper.map(terminRepository.findAll(), TerminModel[].class));
    }

    public TerminModel getTermin(Long id) {
        return modelMapper.map(terminRepository.findById(id).get(), TerminModel.class);
    }

    public TerminModel dodajTermin(TerminModel terminModel) {
        Termin termin = terminRepository.save(modelMapper.map(terminModel, Termin.class));
        return modelMapper.map(termin, TerminModel.class);
    }

    public void ukloniTermin(TerminModel terminModel) {
        terminRepository.deleteById(terminModel.getId());
    }

}
