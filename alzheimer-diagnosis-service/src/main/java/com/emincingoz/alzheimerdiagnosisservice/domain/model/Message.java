package com.emincingoz.alzheimerdiagnosisservice.domain.model;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    private String senderTckn;
    private String receiverTckn;
    private String message;
    private LocalDateTime sentTime;
}
