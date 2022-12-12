package com.emincingoz.alzheimerdiagnosisservice.controller;

import com.emincingoz.alzheimerdiagnosisservice.domain.requests.UserRegisterRequest;
import com.emincingoz.alzheimerdiagnosisservice.manager.user.IUserService;
import com.mashape.unirest.http.exceptions.UnirestException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.InstanceNotFoundException;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterRequest userRegisterRequest) throws UnirestException {
        return userService.register(userRegisterRequest);
    }

    @CrossOrigin
    @GetMapping("get-user-infos/{tckn}")
    public ResponseEntity<?> getUserInfosByTckn(@PathVariable("tckn") String tckn) throws InstanceNotFoundException {
        return ResponseEntity.ok(userService.getUserInfosByTckn(tckn));
    }
}
