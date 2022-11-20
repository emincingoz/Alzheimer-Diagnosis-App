package com.emincingoz.alzheimerdiagnosisservice.controller;

import com.emincingoz.alzheimerdiagnosisservice.manager.patient.IPatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/patient")
@RequiredArgsConstructor
public class PatientController {

    private final IPatientService patientService;

    @GetMapping("get-doctors")
    public ResponseEntity<?> getDoctors() {
        System.out.println("ulaştı");
        return new ResponseEntity<>(patientService.getAllDoctors(), HttpStatus.ACCEPTED);
    }

}
