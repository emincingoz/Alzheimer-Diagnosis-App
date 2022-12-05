package com.emincingoz.alzheimerdiagnosisservice.controller;

import com.emincingoz.alzheimerdiagnosisservice.domain.enums.UserRolesEnum;
import com.emincingoz.alzheimerdiagnosisservice.manager.doctor.IDoctorService;
import com.emincingoz.alzheimerdiagnosisservice.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/doctor")
@RequiredArgsConstructor
public class DoctorController {
    private final IDoctorService doctorService;

    @GetMapping("/get-allpatients")
    public ResponseEntity<?> getAllPatients() {
        System.out.println("asdasd: " + UserRolesEnum.PATIENT.toString());
        return ResponseEntity.ok(doctorService.getAllPatients());
        /*return ResponseEntity.ok(userRepository.findByRole(UserRolesEnum.PATIENT));*/
    }

    @PostMapping(value = "doctor-teshis/upload-image", produces = {MediaType.IMAGE_PNG_VALUE, "application/json"})
    public ResponseEntity<?> uploadImage(@RequestParam("imageFile") MultipartFile file,
                                         @RequestParam("imageName") String name) {

        return doctorService.uploadMRIImageFromClient(file, name);
    }


}
