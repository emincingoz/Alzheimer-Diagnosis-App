package com.emincingoz.alzheimerdiagnosisservice.domain.requests.admin;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AdminChangeDoctorInfoRequest {
    private String email;
    private String phoneNumber;
    private String password;
}
