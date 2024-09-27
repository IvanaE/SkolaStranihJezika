package com.skola.stranih.jezika.api.repository;

import com.skola.stranih.jezika.api.entity.Rezervacija;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RezervacijaRepository extends PagingAndSortingRepository<Rezervacija, Long> {
}
