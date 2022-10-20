package com.emincingoz.alzheimerdiagnosisservice.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(schema = "rest", name = "ada_user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    @SequenceGenerator(name = "user_sequence", allocationSize = 1)
    private Long id;

    @NotNull
    //@Size(min = 11, max = 11)
    @Column(name = "tckn", length = 11, nullable = false)
    private String tckn;

    @NotNull
    @Size(max = 50)
    @Column(name = "first_name")
    private String firstName;

    @NotNull
    @Size(max = 50)
    @Column(name = "last_name")
    private String lastName;

    @NotNull
    @Size(max = 50)
    @Column(name = "email")
    private String email;

    @NotNull
    @Size(max = 10)
    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @JsonIgnore
    @NotNull
    //@Size(min = 60, max = 60)
    @Column(name = "password_hash", length = 60, nullable = false)
    private String password;
}
