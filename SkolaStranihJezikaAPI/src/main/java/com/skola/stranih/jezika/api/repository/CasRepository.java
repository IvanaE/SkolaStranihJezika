package com.skola.stranih.jezika.api.repository;

import com.skola.stranih.jezika.api.entity.Cas;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CasRepository extends PagingAndSortingRepository<Cas, Long> {
}
