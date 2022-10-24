package com.emincingoz.alzheimerdiagnosisservice.controller;

import com.emincingoz.alzheimerdiagnosisservice.domain.enums.UserRolesEnum;
import com.emincingoz.alzheimerdiagnosisservice.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/doctor")
@RequiredArgsConstructor
public class DoctorController {

    private final IUserRepository userRepository;

    @GetMapping("/patients")
    public ResponseEntity<?> getPatients() {
        System.out.println("asdasd: " + UserRolesEnum.PATIENT.toString());
        return ResponseEntity.ok(userRepository.findByRole(UserRolesEnum.PATIENT));
    }
}
