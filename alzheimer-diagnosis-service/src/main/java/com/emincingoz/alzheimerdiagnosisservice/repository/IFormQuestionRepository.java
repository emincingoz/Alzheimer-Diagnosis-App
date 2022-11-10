package com.emincingoz.alzheimerdiagnosisservice.repository;

import com.emincingoz.alzheimerdiagnosisservice.domain.model.FormQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IFormQuestionRepository extends JpaRepository<FormQuestion, Long> {
}
