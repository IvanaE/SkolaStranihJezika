package com.skola.stranih.jezika.api.service;

import com.skola.stranih.jezika.api.entity.Korisnik;
import com.skola.stranih.jezika.api.model.KorisnikModel;
import com.skola.stranih.jezika.api.repository.KorisnikRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.Collection;

@Service
@AllArgsConstructor
@Transactional
public class KorisnikService implements UserDetailsService {

    private final KorisnikRepository korisnikRepository;
    private final ModelMapper modelMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Korisnik user = korisnikRepository.findUserByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Korisnik nije pronadjen");
        }
        return user;
    }

    public boolean postojiEmail(String email) {
        return korisnikRepository.existsByEmail(email);
    }

    public boolean postojiKorisnicko(String username) {
        return korisnikRepository.existsByUsername(username);
    }

    public KorisnikModel dodajKorisnika(KorisnikModel korisnikModel) {
        Korisnik korisnik = korisnikRepository.save(modelMapper.map(korisnikModel, Korisnik.class));
        return modelMapper.map(korisnikRepository.save(korisnik), KorisnikModel.class);
    }

    public Collection<KorisnikModel> getKorisnici() {
        return Arrays.asList(modelMapper.map(korisnikRepository.findAll(), KorisnikModel[].class));
    }

    public void ukloniKorisnika(Long id) {
        korisnikRepository.delete(korisnikRepository.findById(id).get());
    }


}