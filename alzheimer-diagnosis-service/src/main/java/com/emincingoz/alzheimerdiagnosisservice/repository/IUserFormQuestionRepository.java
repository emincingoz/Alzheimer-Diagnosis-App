package com.emincingoz.alzheimerdiagnosisservice.repository;

import com.emincingoz.alzheimerdiagnosisservice.domain.model.User;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.UserFormQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IUserFormQuestionRepository extends JpaRepository<UserFormQuestion, Long> {

    List<UserFormQuestion> findAllUserFormQuestionByUser(User user);

    void deleteAllByUser(User user);
}
