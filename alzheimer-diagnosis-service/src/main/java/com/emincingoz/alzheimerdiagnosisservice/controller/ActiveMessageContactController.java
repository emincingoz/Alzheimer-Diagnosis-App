package com.emincingoz.alzheimerdiagnosisservice.controller;

import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.SuccessResult;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.ActiveMessageContactNewRequest;
import com.emincingoz.alzheimerdiagnosisservice.manager.activeMessageContact.IActiveMessageContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.InstanceNotFoundException;

@RestController
@RequestMapping("api/message-contact")
@RequiredArgsConstructor
public class ActiveMessageContactController {

    private final IActiveMessageContactService activeMessageContactService;

    @PostMapping("add-contact")
    public ResponseEntity<?> addNewContact(@RequestBody ActiveMessageContactNewRequest contactNewRequest) throws InstanceNotFoundException {

        return ResponseEntity.ok(activeMessageContactService.addNewContact(contactNewRequest));
    }

    @GetMapping("get-contacts/{senderTckn}")
    public ResponseEntity<?> getAllActiveContacts(@PathVariable("senderTckn") String senderTckn) throws InstanceNotFoundException {
        return ResponseEntity.ok(activeMessageContactService.getAllActiveContacts(senderTckn));
    }
}
