package com.emincingoz.alzheimerdiagnosisservice.manager.authentication;

import com.emincingoz.alzheimerdiagnosisservice.utils.results.DataResult;
import com.emincingoz.alzheimerdiagnosisservice.domain.dtos.authentication.TokenDTO;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.authentication.UserLoginRequest;

public interface IAuthenticationService {
    DataResult<TokenDTO> login(UserLoginRequest userLoginRequest);
}
