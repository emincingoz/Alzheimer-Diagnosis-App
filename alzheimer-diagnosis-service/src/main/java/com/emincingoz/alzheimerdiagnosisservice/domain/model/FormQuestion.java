package com.emincingoz.alzheimerdiagnosisservice.domain.model;

import com.emincingoz.alzheimerdiagnosisservice.config.FormQuestionConfig;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "ada_form_question", schema = "rest")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FormQuestion {

    @Id
    private Long id;

    private String question;

    @OneToMany(mappedBy = "formQuestion")
    private Set<UserFormQuestion> userFormQuestions;

    public FormQuestion(Long id, String question) {
        this.id = id;
        this.question = question;
    }
}
