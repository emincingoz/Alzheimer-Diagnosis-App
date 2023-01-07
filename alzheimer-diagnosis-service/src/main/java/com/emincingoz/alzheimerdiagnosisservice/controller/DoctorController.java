package com.emincingoz.alzheimerdiagnosisservice.controller;

import com.emincingoz.alzheimerdiagnosisservice.manager.doctor.IDoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.management.InstanceNotFoundException;

@RestController
@RequestMapping("api/doctor")
@RequiredArgsConstructor
public class DoctorController {
    private final IDoctorService doctorService;

    @GetMapping("/get-allpatients")
    public ResponseEntity<?> getAllPatients() {
        return ResponseEntity.ok(doctorService.getAllPatients());
    }

    @PostMapping(value = "doctor-teshis/upload-image", produces = {MediaType.IMAGE_PNG_VALUE, "application/json"})
    public ResponseEntity<?> uploadImage(@RequestParam("imageFile") MultipartFile file,
                                         @RequestParam("imageName") String name) {

        return doctorService.uploadMRIImageFromClient(file, name);
    }

    @GetMapping("get-patient-forms/{patient-tckn}")
    public ResponseEntity<?> getPatientForms(@PathVariable("patient-tckn") String tckn) throws InstanceNotFoundException {
        return ResponseEntity.ok(doctorService.getPatientForms(tckn));
    }
}
