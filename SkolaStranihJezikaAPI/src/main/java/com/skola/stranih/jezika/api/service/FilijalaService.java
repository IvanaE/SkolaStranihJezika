package com.skola.stranih.jezika.api.service;

import com.skola.stranih.jezika.api.entity.Filijala;
import com.skola.stranih.jezika.api.model.FilijalaModel;
import com.skola.stranih.jezika.api.repository.FilijalaRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;

@Service
@AllArgsConstructor
public class FilijalaService {

    private final FilijalaRepository filijalaRepository;
    private final ModelMapper modelMapper;

    public Collection<FilijalaModel> getFilijale() {
        return Arrays.asList(modelMapper.map(filijalaRepository.findAll(), FilijalaModel[].class));
    }

    public FilijalaModel getFilijala(Long id) {
        return modelMapper.map(filijalaRepository.findById(id).get(), FilijalaModel.class);
    }

    public FilijalaModel dodajFilijalu(FilijalaModel filijalaModel) {
        Filijala filijala = filijalaRepository.save(modelMapper.map(filijalaModel, Filijala.class));
        return modelMapper.map(filijala, FilijalaModel.class);
    }

    public void ukloniFilijalu(FilijalaModel filijalaModel) {
        filijalaRepository.deleteById(filijalaModel.getId());
    }
}
