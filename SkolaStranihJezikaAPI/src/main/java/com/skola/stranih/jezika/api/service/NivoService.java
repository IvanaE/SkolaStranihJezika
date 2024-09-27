package com.skola.stranih.jezika.api.service;

import com.skola.stranih.jezika.api.entity.Nivo;
import com.skola.stranih.jezika.api.model.NivoModel;
import com.skola.stranih.jezika.api.repository.NivoRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;

@Service
@AllArgsConstructor
public class NivoService {

    private final NivoRepository nivoRepository;
    private final ModelMapper modelMapper;

    public Collection<NivoModel> getNivoi() {
        return Arrays.asList(modelMapper.map(nivoRepository.findAll(), NivoModel[].class));
    }

    public NivoModel getNivo(Long id) {
        return modelMapper.map(nivoRepository.findById(id).get(), NivoModel.class);
    }

    public NivoModel dodajNivo(NivoModel nivoModel) {
        Nivo nivo = nivoRepository.save(modelMapper.map(nivoModel, Nivo.class));
        return modelMapper.map(nivo, NivoModel.class);
    }

    public void ukloniNivo(NivoModel nivoModel) {
        nivoRepository.deleteById(nivoModel.getId());
    }


}
