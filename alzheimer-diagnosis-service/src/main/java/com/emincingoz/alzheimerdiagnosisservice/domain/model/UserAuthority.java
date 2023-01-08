package com.emincingoz.alzheimerdiagnosisservice.domain.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

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
    //@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "native", initialValue = 111)
    @GeneratedValue(generator = "sequence-generator")
    @GenericGenerator(
            name = "sequence-generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "user_sequence"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "111"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "authority_name", nullable = false)
    private Authority authorityName;

    @JsonBackReference
    public User getUser(){
        return user;
    }
}