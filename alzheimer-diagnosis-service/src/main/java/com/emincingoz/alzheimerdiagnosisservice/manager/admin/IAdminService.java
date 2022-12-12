package com.emincingoz.alzheimerdiagnosisservice.manager.admin;

import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.Result;

public interface IAdminService {
    Result getAllPatients();

    Result getAllDoctors();
}
