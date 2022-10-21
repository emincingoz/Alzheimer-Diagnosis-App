package com.emincingoz.alzheimerdiagnosisservice.security.service;

import com.emincingoz.alzheimerdiagnosisservice.domain.model.User;
import com.emincingoz.alzheimerdiagnosisservice.repository.IUserRepository;
import com.emincingoz.alzheimerdiagnosisservice.security.JwtUserDetailsFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final IUserRepository userRepository;

    public JwtUserDetailsService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String tckn) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByTckn(tckn);
        return JwtUserDetailsFactory.create(user.get());
    }

    public UserDetails loadUserById(Long id) {
        User user = userRepository.findById(id).get();
        return JwtUserDetailsFactory.create(user);
    }
}
