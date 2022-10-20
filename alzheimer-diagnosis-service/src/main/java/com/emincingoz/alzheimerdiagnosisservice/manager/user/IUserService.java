package com.emincingoz.alzheimerdiagnosisservice.manager.user;

import com.emincingoz.alzheimerdiagnosisservice.domain.requests.UserRegisterRequest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.http.ResponseEntity;

public interface IUserService {

    ResponseEntity<?> register(UserRegisterRequest userRegisterRequest) throws UnirestException;
}
