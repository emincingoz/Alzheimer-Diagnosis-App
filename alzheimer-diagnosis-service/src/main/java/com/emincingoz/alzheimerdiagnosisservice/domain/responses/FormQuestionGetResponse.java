package com.emincingoz.alzheimerdiagnosisservice.domain.responses;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FormQuestionGetResponse {
    private Long id;
    private String question;
    private Boolean answer = null;
}
