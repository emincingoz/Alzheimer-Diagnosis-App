package com.emincingoz.alzheimerdiagnosisservice.manager.activeMessageContact;

import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.DataResult;
import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.Result;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.ActiveMessageContactNewRequest;

import javax.management.InstanceNotFoundException;

public interface IActiveMessageContactService {
    Result addNewContact(ActiveMessageContactNewRequest contactNewRequest) throws InstanceNotFoundException;

    DataResult getAllActiveContacts(String senderTckn) throws InstanceNotFoundException;
}
