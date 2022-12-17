package com.emincingoz.alzheimerdiagnosisservice.domain.requests.userFormQuestion;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class FormSubmitRequest {
    private Long id;
    private String question;
    private Boolean answer;
}
