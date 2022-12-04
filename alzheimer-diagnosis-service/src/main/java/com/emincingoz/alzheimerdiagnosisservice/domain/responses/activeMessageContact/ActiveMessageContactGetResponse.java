package com.emincingoz.alzheimerdiagnosisservice.domain.responses.activeMessageContact;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ActiveMessageContactGetResponse {
    private String senderTckn;

    private String receiverTckn;
    private String receiverFirstName;
    private String receiverLastName;
    private LocalDateTime senderLastSeen;
    private LocalDateTime receiverLastSeen;

    private String lastMessage;
    private LocalDateTime lastMessageTime;
    private Boolean lastMessageByReceiver;

    public ActiveMessageContactGetResponse(String senderTckn, String receiverTckn, String receiverFirstName, String receiverLastName, String lastMessage, LocalDateTime lastMessageTime, Boolean lastMessageByReceiver, LocalDateTime senderLastSeen, LocalDateTime receiverLastSeen) {
        this(senderTckn, receiverTckn, receiverFirstName, receiverLastName, lastMessage, lastMessageTime, lastMessageByReceiver);
        this.senderLastSeen = senderLastSeen;
        this.receiverLastSeen = receiverLastSeen;
    }

    public ActiveMessageContactGetResponse(String senderTckn, String receiverTckn, String receiverFirstName, String receiverLastName, String lastMessage, LocalDateTime lastMessageTime, Boolean lastMessageByReceiver) {
        this.senderTckn = senderTckn;
        this.receiverTckn = receiverTckn;
        this.receiverFirstName = receiverFirstName;
        this.receiverLastName = receiverLastName;
        this.lastMessage = lastMessage;
        this.lastMessageTime = lastMessageTime;
        this.lastMessageByReceiver = lastMessageByReceiver;
        this.senderLastSeen = null;
        this.receiverLastSeen = null;
    }
}
