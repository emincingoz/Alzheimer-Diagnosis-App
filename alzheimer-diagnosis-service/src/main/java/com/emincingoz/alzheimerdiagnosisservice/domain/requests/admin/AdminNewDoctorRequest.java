package com.emincingoz.alzheimerdiagnosisservice.domain.requests.admin;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class AdminNewDoctorRequest {
    private String firstName;
    private String lastName;
    private String password;
    private String email;
    private String phoneNumber;
    private String tckn;
    private LocalDate birthDate;
}
