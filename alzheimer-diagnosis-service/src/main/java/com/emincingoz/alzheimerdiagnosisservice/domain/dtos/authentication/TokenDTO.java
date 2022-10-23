package com.emincingoz.alzheimerdiagnosisservice.domain.dtos.authentication;

import com.emincingoz.alzheimerdiagnosisservice.domain.enums.UserRolesEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TokenDTO {
    private String token;
    private String refreshToken;
    private List<UserRolesEnum> roles;
}
