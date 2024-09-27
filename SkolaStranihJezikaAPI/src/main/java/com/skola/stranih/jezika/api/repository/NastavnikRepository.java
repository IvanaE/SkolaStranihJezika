package com.skola.stranih.jezika.api.repository;

import com.skola.stranih.jezika.api.entity.Nastavnik;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;

@Service
public interface NastavnikRepository extends PagingAndSortingRepository<Nastavnik, Long> {
}
