package com.emincingoz.alzheimerdiagnosisservice.domain.requests;

import lombok.*;

import java.time.LocalDate;

/*public record UserRegisterRequest(String tckn, String firstName, String lastName, String email, String phoneNumber, LocalDate birthDate, String password) {
}*/

@Getter
@Setter
@ToString
public class UserRegisterRequest {
    private String tckn;
    private String firstName;
    private String lastName;
    private String email; String phoneNumber;
    private LocalDate birthDate;
    private String password;
}
