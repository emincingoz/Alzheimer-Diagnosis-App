package com.emincingoz.alzheimerdiagnosisservice.repository;

import com.emincingoz.alzheimerdiagnosisservice.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUserRepository extends JpaRepository<User, Long> {

    Optional<User> findByTckn(String tckn);
}
