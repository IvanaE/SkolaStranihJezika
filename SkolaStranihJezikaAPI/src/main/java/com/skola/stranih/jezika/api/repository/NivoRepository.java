package com.skola.stranih.jezika.api.repository;

import com.skola.stranih.jezika.api.entity.Nivo;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NivoRepository extends PagingAndSortingRepository<Nivo, Long> {

}
