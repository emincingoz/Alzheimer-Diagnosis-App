package com.emincingoz.alzheimerdiagnosisservice.domain.requests.activeMessageRequest;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ActiveMessageContactNewRequest {
    private String senderTckn;
    private String receiverTckn;
    private String lastMessage;
    private LocalDateTime lastMessageTime;
    private Boolean lastMessageByReceiver;
    private LocalDateTime senderLastSeen;
    private LocalDateTime receiverLastSeen;
}
