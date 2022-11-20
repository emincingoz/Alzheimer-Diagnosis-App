package com.emincingoz.alzheimerdiagnosisservice.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Table(schema = "rest", name = "ada_user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User implements Serializable {

    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1, schema = "rest")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    private Long id;

    @NotNull
    @Size(min = 11, max = 11)
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
    @Size(min = 60, max = 60)
    @Column(name = "password_hash", length = 60, nullable = false)
    private String password;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(foreignKey = @ForeignKey(name = "fk_user_id"), referencedColumnName = "id", name = "user_id")
    private List<UserAuthority> roles;

    @OneToMany(mappedBy = "user")
    private Set<UserFormQuestion> userFormQuestions;

    @Column(name = "refresh_token_expiration_date")
    private Instant refreshTokenExpirationDate;

    @Column(name = "refresh_token")
    private String refreshToken;

    @JsonManagedReference
    public List<UserAuthority> getRoles(){
        return roles;
    }
}
