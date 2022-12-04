package com.emincingoz.alzheimerdiagnosisservice.manager.user;

import com.emincingoz.alzheimerdiagnosisservice.domain.model.User;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.UserRegisterRequest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.http.ResponseEntity;

import javax.management.InstanceNotFoundException;

public interface IUserService {

    ResponseEntity<?> register(UserRegisterRequest userRegisterRequest) throws UnirestException;

    User findUserByTckn(String senderTckn) throws InstanceNotFoundException;
}
