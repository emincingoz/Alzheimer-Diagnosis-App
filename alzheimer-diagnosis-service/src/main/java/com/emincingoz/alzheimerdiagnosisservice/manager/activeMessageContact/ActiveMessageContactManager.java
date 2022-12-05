package com.emincingoz.alzheimerdiagnosisservice.manager.activeMessageContact;

import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.*;
import com.emincingoz.alzheimerdiagnosisservice.domain.enums.UserRolesEnum;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.ActiveMessageContact;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.Authority;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.User;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.UserAuthority;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.activeMessageRequest.ActiveMessageContactNewRequest;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.activeMessageRequest.ActiveMessageContactUpdateLastMessageRequest;
import com.emincingoz.alzheimerdiagnosisservice.domain.responses.activeMessageContact.ActiveMessageContactGetResponse;
import com.emincingoz.alzheimerdiagnosisservice.manager.user.IUserService;
import com.emincingoz.alzheimerdiagnosisservice.repository.IActiveMessageContactRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.management.InstanceNotFoundException;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ActiveMessageContactManager implements IActiveMessageContactService {

    private final IActiveMessageContactRepository repository;
    private final IUserService userService;
    private final ModelMapper modelMapper;

    @Override
    public Result addNewContact(ActiveMessageContactNewRequest contactNewRequest) throws InstanceNotFoundException {

        User sender = userService.findUserByTckn(contactNewRequest.getSenderTckn());
        User receiver = userService.findUserByTckn(contactNewRequest.getReceiverTckn());

        System.out.println("activeMessageRequesta: " + contactNewRequest.toString());

        ActiveMessageContact activeMessageContact = new ActiveMessageContact(sender, receiver, contactNewRequest.getLastMessage(), contactNewRequest.getLastMessageByReceiver());

        System.out.println("activeMeesaa: " + activeMessageContact.toString());

        Optional<ActiveMessageContact> tempContact = repository.getActiveMessageContactBySenderAndReceiver(sender, receiver);

        /*if (tempContact.isPresent()) {
            User tempReceiver = tempContact.get().getReceiver();
            if (receiver.getTckn().equals(tempReceiver.getTckn()))
                return new ErrorResult();
        }*/

        if (tempContact.isPresent())
            return new ErrorResult();

        repository.save(activeMessageContact);
        return new SuccessResult();
    }

    @Override
    public DataResult getAllActiveContacts(String senderTckn, UserRolesEnum role) throws InstanceNotFoundException {

        User senderUser = userService.findUserByTckn(senderTckn);

        List<ActiveMessageContact> contacts =  repository.getActiveMessageContactsBySender(senderUser);
        List<ActiveMessageContactGetResponse> filteredContacts = new ArrayList<>();

        for (ActiveMessageContact contact : contacts) {
            User receiverUser = contact.getReceiver();
            List<UserAuthority> receiverAuths = receiverUser.getRoles();

            for (UserAuthority receiverAuth : receiverAuths) {
                Authority receiverAuthority = receiverAuth.getAuthorityName();

                if (receiverAuthority.getName().equals(role)) {
                    filteredContacts.add(
                            new ActiveMessageContactGetResponse(
                                    contact.getSender().getTckn(),
                                    contact.getReceiver().getTckn(),
                                    contact.getReceiver().getFirstName(),
                                    contact.getReceiver().getLastName(),
                                    contact.getLastMessage(),
                                    contact.getLastMessageTime(),
                                    contact.getLastMessageByReceiver()));
                    break;
                }
            }
        }

        // Resource: https://www.benchresources.net/java-8-how-to-sort-list-by-java-time-localdatetime-in-4-ways/
        // Comparator for sorting filteredContacts by lastMessageTime as descending order
        Comparator<ActiveMessageContactGetResponse> comparatorAsc = (contact1, contact2) -> contact2.getLastMessageTime()
                .compareTo(contact1.getLastMessageTime());

        // pass above Comparator and sort in descending order
        Collections.sort(filteredContacts, comparatorAsc);

        return new SuccessDataResult(filteredContacts);
    }

    @Override
    public Result updateLastMessageAndTime(ActiveMessageContactUpdateLastMessageRequest request) throws InstanceNotFoundException {

        ActiveMessageContact contact = getActiveMessageContact(request.getSenderTckn(), request.getReceiverTckn());

        contact.setLastMessage(request.getLastMessage());
        contact.setLastMessageTime(LocalDateTime.now());

        repository.save(contact);
        return new SuccessResult();
    }

    private ActiveMessageContact getActiveMessageContact(String senderTckn, String receiverTckn) throws InstanceNotFoundException {
        User sender = userService.findUserByTckn(senderTckn);
        User receiver = userService.findUserByTckn(receiverTckn);

        Optional<ActiveMessageContact> contact = repository.getActiveMessageContactBySenderAndReceiver(sender, receiver);

        if (contact.isPresent())
            return contact.get();
        throw new InstanceNotFoundException();
    }
}
