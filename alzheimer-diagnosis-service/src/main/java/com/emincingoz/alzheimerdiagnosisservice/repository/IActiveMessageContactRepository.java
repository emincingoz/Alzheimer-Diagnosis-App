package com.emincingoz.alzheimerdiagnosisservice.repository;

import com.emincingoz.alzheimerdiagnosisservice.domain.model.ActiveMessageContact;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IActiveMessageContactRepository extends JpaRepository<ActiveMessageContact, Long> {

    Optional<ActiveMessageContact> getActiveMessageContactBySenderAndReceiver(User sender, User reciever);
    List<ActiveMessageContact> getActiveMessageContactsBySender(User sender);
}
