package com.emincingoz.alzheimerdiagnosisservice.controller;

import com.emincingoz.alzheimerdiagnosisservice.domain.enums.UserRolesEnum;
import com.emincingoz.alzheimerdiagnosisservice.manager.admin.IAdminService;
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
    private final IAdminService adminService;

    @GetMapping("/get-alldoctors")
    public ResponseEntity<?> getDoctors() {
        System.out.println("asdasd: " + UserRolesEnum.DOCTOR.toString());
        return ResponseEntity.ok(adminService.getAllDoctors());
    }

    @GetMapping("/get-allpatients")
    public ResponseEntity<?> getAllPatients() {
        return ResponseEntity.ok(adminService.getAllPatients());
        /*return ResponseEntity.ok(userRepository.findByRole(UserRolesEnum.PATIENT));*/
    }
}
