package com.emincingoz.alzheimerdiagnosisservice.domain.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "ada_user_form_question", schema = "rest")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserFormQuestion {

    @Id
    private Long id;

    @ManyToOne(/*fetch = FetchType.EAGER, optional = false*/)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(/*fetch = FetchType.EAGER, optional = false*/)
    @JoinColumn(name = "form_question_id")
    private FormQuestion formQuestion;

    @Column(name = "user_answer")
    private boolean userAnswer;

    @JsonBackReference
    public User getUser(){
        return user;
    }
}
