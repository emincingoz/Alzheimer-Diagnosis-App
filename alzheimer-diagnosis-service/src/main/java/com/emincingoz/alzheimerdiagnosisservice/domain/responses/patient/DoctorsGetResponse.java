package com.emincingoz.alzheimerdiagnosisservice.domain.responses.patient;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DoctorsGetResponse {
    private String tckn;
    private String firstName;
    private String lastName;
}
