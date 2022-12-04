package com.emincingoz.alzheimerdiagnosisservice.domain.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Entity
@Table(name = "ada_active_message_contact", schema = "rest")
public class ActiveMessageContact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sender_id", nullable = false)
    @NotNull
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "receiver_id", nullable = false)
    @NotNull
    private User receiver;

    @Column(name = "sender_last_seen")
    private LocalDateTime senderLastSeen;

    @Column(name = "receiver_last_seen")
    private LocalDateTime receiverLastSeen;

    @Column(name = "last_message")
    private String lastMessage;

    @Column(name = "last_message_time")
    private LocalDateTime lastMessageTime;

    @Column(name = "last_message_by_receiver")
    private Boolean lastMessageByReceiver;

    public ActiveMessageContact(User sender, User receiver) {
        this.sender = sender;
        this.receiver = receiver;
    }

    public ActiveMessageContact(User sender, User receiver, String lastMessage, LocalDateTime lastMessageTime, Boolean lastMessageByReceiver) {
        this(sender, receiver);
        this.lastMessage = lastMessage;
        this.lastMessageTime = lastMessageTime;
        this.lastMessageByReceiver = lastMessageByReceiver;
    }

    public ActiveMessageContact(User sender, User receiver, String lastMessage, Boolean lastMessageByReceiver) {
        this(sender, receiver, lastMessage, LocalDateTime.now(), lastMessageByReceiver);
    }

    public ActiveMessageContact(User sender, User receiver, String lastMessage, LocalDateTime lastMessageTime, LocalDateTime senderLastSeen, LocalDateTime receiverLastSeen, Boolean lastMessageByReceiver) {
        this(sender, receiver, lastMessage, lastMessageTime, lastMessageByReceiver);
        this.senderLastSeen = senderLastSeen;
        this.receiverLastSeen = receiverLastSeen;
    }

    public ActiveMessageContact() {

    }
}
