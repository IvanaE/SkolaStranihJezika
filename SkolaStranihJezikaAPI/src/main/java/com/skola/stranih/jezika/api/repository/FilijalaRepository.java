package com.skola.stranih.jezika.api.repository;

import com.skola.stranih.jezika.api.entity.Filijala;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FilijalaRepository extends PagingAndSortingRepository<Filijala, Long> {
}
