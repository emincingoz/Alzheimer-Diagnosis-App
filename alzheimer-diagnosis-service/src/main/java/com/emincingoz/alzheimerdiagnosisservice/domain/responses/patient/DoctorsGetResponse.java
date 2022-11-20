package com.emincingoz.alzheimerdiagnosisservice.domain.responses.patient;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorsGetResponse {
    private Long id;
    private String firstName;
    private String lastName;
}
