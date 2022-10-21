package com.emincingoz.alzheimerdiagnosisservice.domain.requests.authentication;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginRequest {
    private String tckn;
    private String password;
}
