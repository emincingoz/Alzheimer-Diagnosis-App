package com.emincingoz.alzheimerdiagnosisservice.domain.dtos.userFormQuestion;

import com.emincingoz.alzheimerdiagnosisservice.domain.model.FormQuestion;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.User;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ListUserFormQuestionDTO {
    List<User> users;
    List<FormQuestion> questions;
    List<Boolean> answers;
}
