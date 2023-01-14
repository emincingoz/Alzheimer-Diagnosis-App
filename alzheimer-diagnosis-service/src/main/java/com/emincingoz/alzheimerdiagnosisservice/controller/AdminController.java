package com.emincingoz.alzheimerdiagnosisservice.controller;

import com.emincingoz.alzheimerdiagnosisservice.domain.requests.admin.AdminChangeDoctorInfoRequest;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.admin.AdminNewDoctorRequest;
import com.emincingoz.alzheimerdiagnosisservice.manager.admin.IAdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final IAdminService adminService;

    @GetMapping("/get-alldoctors")
    public ResponseEntity<?> getDoctors() {
        return ResponseEntity.ok(adminService.getAllDoctors());
    }

    @GetMapping("/get-allpatients")
    public ResponseEntity<?> getAllPatients() {
        return ResponseEntity.ok(adminService.getAllPatients());
        /*return ResponseEntity.ok(userRepository.findByRole(UserRolesEnum.PATIENT));*/
    }

    @PostMapping(value = "add-newdoctor", consumes = "application/json")
    public ResponseEntity<?> addNewDoctor(@RequestBody AdminNewDoctorRequest adminNewDoctorRequest) {
        return adminService.addNewDoctor(adminNewDoctorRequest);
    }

    @PutMapping("change-doctor-info/{tckn}")
    public ResponseEntity<?> changeDoctorInfo(@PathVariable("tckn") String tckn, @RequestBody AdminChangeDoctorInfoRequest changeDoctorInfoRequest) {
        return ResponseEntity.ok(adminService.changeDoctorInfo(tckn, changeDoctorInfoRequest));
    }
}
