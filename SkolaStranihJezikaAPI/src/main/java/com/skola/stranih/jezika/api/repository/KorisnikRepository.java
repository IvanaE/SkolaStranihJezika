package com.skola.stranih.jezika.api.repository;

import com.skola.stranih.jezika.api.entity.Korisnik;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KorisnikRepository extends PagingAndSortingRepository<Korisnik, Long> {
    Korisnik findUserByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
