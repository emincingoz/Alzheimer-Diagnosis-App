package com.emincingoz.alzheimerdiagnosisservice.manager.admin;

import com.emincingoz.alzheimerdiagnosisservice.utils.results.Result;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.admin.AdminChangeDoctorInfoRequest;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.admin.AdminNewDoctorRequest;
import org.springframework.http.ResponseEntity;

public interface IAdminService {
    Result getAllPatients();

    Result getAllDoctors();

    ResponseEntity<?> addNewDoctor(AdminNewDoctorRequest adminNewDoctorRequest);

    Result changeDoctorInfo(String tckn, AdminChangeDoctorInfoRequest changeDoctorInfoRequest);
}
