package com.emincingoz.alzheimerdiagnosisservice.manager.activeMessageContact;

import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.DataResult;
import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.Result;
import com.emincingoz.alzheimerdiagnosisservice.domain.enums.UserRolesEnum;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.activeMessageRequest.ActiveMessageContactNewRequest;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.activeMessageRequest.ActiveMessageContactUpdateLastMessageRequest;

import javax.management.InstanceNotFoundException;

public interface IActiveMessageContactService {
    Result addNewContact(ActiveMessageContactNewRequest contactNewRequest) throws InstanceNotFoundException;

    Result getAllActiveContacts(String senderTckn, UserRolesEnum role) throws InstanceNotFoundException;

    Result updateLastMessageAndTime(ActiveMessageContactUpdateLastMessageRequest request) throws InstanceNotFoundException;
}
