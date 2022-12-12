package com.emincingoz.alzheimerdiagnosisservice.domain.responses.user;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class UserInfoGetResponse {
    private String tckn;
    private String firstName;
    private String lastName;
    private LocalDate birthDate;
    private String email;
    private String phoneNumber;

}
