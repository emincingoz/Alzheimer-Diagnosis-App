package com.emincingoz.alzheimerdiagnosisservice.repository;

import com.emincingoz.alzheimerdiagnosisservice.domain.enums.UserRolesEnum;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IAdminRepository extends JpaRepository<User, Long> {
    @Query("select userRole.user from UserAuthority userRole where userRole.authorityName.name = :role")
    List<User> findAllByRole(@Param("role") UserRolesEnum role);

    Optional<User> findByTckn(String tckn);
}
