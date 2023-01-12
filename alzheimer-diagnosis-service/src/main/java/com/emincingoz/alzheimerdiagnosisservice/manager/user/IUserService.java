package com.emincingoz.alzheimerdiagnosisservice.manager.user;

import com.emincingoz.alzheimerdiagnosisservice.domain.model.User;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.ForgotPasswordRequest;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.authentication.UserRegisterRequest;
import com.emincingoz.alzheimerdiagnosisservice.domain.responses.user.UserInfoGetResponse;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.http.ResponseEntity;

import javax.management.InstanceNotFoundException;

public interface IUserService {

    ResponseEntity<?> register(UserRegisterRequest userRegisterRequest) throws UnirestException;

    User findUserByTckn(String senderTckn) throws InstanceNotFoundException;

    UserInfoGetResponse getUserInfosByTckn(String tckn) throws InstanceNotFoundException;

    ResponseEntity<?> forgotPassword(ForgotPasswordRequest forgotPasswordRequest) throws UnirestException;
}
