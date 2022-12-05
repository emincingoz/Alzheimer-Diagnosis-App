package com.emincingoz.alzheimerdiagnosisservice.domain.requests.activeMessageRequest;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ActiveMessageContactUpdateLastMessageRequest {
    private String senderTckn;
    private String receiverTckn;
    private String lastMessage;
}
