package com.emincingoz.alzheimerdiagnosisservice.manager.email;

import com.emincingoz.alzheimerdiagnosisservice.utils.results.Result;
import com.emincingoz.alzheimerdiagnosisservice.domain.dtos.email.EmailDTO;

public interface IEmailService {

    Result forgotPasswordSendEmail(EmailDTO emailDTO);
}
