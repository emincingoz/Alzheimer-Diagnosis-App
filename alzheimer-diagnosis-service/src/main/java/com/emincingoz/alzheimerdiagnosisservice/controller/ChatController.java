package com.emincingoz.alzheimerdiagnosisservice.controller;

import com.emincingoz.alzheimerdiagnosisservice.domain.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/private-message")
    public void receivePrivateMessage(@Payload Message message) {
        System.out.println("heh: " + message.toString());
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverTckn(), "/private", message);
        System.out.println("heh2: " + message.toString());
    }
}
