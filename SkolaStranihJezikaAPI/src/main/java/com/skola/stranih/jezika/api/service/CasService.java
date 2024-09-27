package com.skola.stranih.jezika.api.service;

import com.skola.stranih.jezika.api.entity.Cas;
import com.skola.stranih.jezika.api.model.CasModel;
import com.skola.stranih.jezika.api.repository.CasRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;

@Service
@AllArgsConstructor
public class CasService {

    private final CasRepository casRepository;
    private final ModelMapper modelMapper;

    public Collection<CasModel> getCasovi() {
        return Arrays.asList(modelMapper.map(casRepository.findAll(), CasModel[].class));
    }

    public CasModel getCas(Long id) {
        return modelMapper.map(casRepository.findById(id).get(), CasModel.class);
    }

    public CasModel dodajCas(CasModel casModel) {
        Cas cas = casRepository.save(modelMapper.map(casModel, Cas.class));
        return modelMapper.map(cas, CasModel.class);
    }

    public void ukloniCas(CasModel casModel) {
        casRepository.deleteById(casModel.getId());
    }
}
