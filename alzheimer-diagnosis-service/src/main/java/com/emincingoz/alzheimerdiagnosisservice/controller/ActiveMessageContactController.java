package com.emincingoz.alzheimerdiagnosisservice.controller;

import com.emincingoz.alzheimerdiagnosisservice.domain.enums.UserRolesEnum;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.activeMessageRequest.ActiveMessageContactNewRequest;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.activeMessageRequest.ActiveMessageContactUpdateLastMessageRequest;
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

    @GetMapping("get-contacts/{senderTckn}/{role}")
    public ResponseEntity<?> getAllActiveContacts(@PathVariable("senderTckn") String senderTckn, @PathVariable("role")UserRolesEnum role) throws InstanceNotFoundException {

        return ResponseEntity.ok(activeMessageContactService.getAllActiveContacts(senderTckn, role));
    }

    @PutMapping("update-last-message")
    public ResponseEntity<?> updateLastMessageThings(@RequestBody ActiveMessageContactUpdateLastMessageRequest request) throws InstanceNotFoundException {

        return ResponseEntity.ok(activeMessageContactService.updateLastMessageAndTime(request));
    }
}
