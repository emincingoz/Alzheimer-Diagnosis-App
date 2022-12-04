package com.emincingoz.alzheimerdiagnosisservice.manager.doctor;

import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.DataResult;
import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.Result;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface IDoctorService {
    ResponseEntity<?> uploadMRIImageFromClient(MultipartFile file, String name);

    DataResult getAllPatients();
}
