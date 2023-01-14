package com.emincingoz.alzheimerdiagnosisservice.domain.requests.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UpdateUserInfoRequest {
    private String tcno;
    private String phoneNumber;
    private String email;
    private String password;
}
