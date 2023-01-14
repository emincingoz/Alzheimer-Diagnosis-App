package com.emincingoz.alzheimerdiagnosisservice.repository;

import com.emincingoz.alzheimerdiagnosisservice.domain.model.Authority;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.UserAuthority;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IUserAuthorityRepository extends JpaRepository<UserAuthority, Long> {

    List<UserAuthority> findUserAuthoritiesByAuthorityName(Authority authority);
}
