package com.emincingoz.alzheimerdiagnosisservice.domain.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;

@Entity
@Table(schema = "rest", name = "ada_user_authority")
@Getter
@Setter
public class UserAuthority implements Serializable {

    @Serial
    private static final long serialVersionUID = 5353767713955462660L;

    @Id
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "authority_name", nullable = false)
    private Authority authorityName;
}