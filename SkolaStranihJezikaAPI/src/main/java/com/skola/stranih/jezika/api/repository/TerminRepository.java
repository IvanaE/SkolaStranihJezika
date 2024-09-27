package com.skola.stranih.jezika.api.repository;

import com.skola.stranih.jezika.api.entity.Termin;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TerminRepository extends PagingAndSortingRepository<Termin, Long> {
}
