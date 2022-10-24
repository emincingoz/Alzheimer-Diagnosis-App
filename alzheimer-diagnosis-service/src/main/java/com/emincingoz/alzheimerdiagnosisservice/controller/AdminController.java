package com.emincingoz.alzheimerdiagnosisservice.controller;

import com.emincingoz.alzheimerdiagnosisservice.domain.enums.UserRolesEnum;
import com.emincingoz.alzheimerdiagnosisservice.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final IUserRepository userRepository;

    @GetMapping("/doctors")
    public ResponseEntity<?> getDoctors() {
        System.out.println("asdasd: " + UserRolesEnum.DOCTOR.toString());
        return ResponseEntity.ok(userRepository.findByRole(UserRolesEnum.DOCTOR));
    }
}
