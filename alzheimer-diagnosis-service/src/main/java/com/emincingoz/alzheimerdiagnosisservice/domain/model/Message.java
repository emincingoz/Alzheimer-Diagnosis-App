package com.emincingoz.alzheimerdiagnosisservice.domain.model;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    private String senderTckn;
    private String receiverTckn;
    private String message;

    //@JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    //@DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    //@JsonFormat(pattern = "HH:mm:ss")
    private String sentTime;
}
