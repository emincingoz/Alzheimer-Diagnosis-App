package com.emincingoz.alzheimerdiagnosisservice.domain.responses.doctor;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class PatientsGetResponse {
    private String firstName;
    private String lastName;
    private String tckn;
    private String email;
    private String phoneNumber;
    private LocalDate birthDate;
}
