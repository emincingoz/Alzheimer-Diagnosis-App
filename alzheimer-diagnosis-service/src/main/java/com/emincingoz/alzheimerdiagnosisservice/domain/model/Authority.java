package com.emincingoz.alzheimerdiagnosisservice.domain.model;

import com.emincingoz.alzheimerdiagnosisservice.domain.enums.UserRolesEnum;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Data
@Entity
@Table(name = "ada_authority", schema = "rest")
public class Authority implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull
    @Size(max = 50)
    @Id
    @Column(length = 50)
    @Enumerated(EnumType.STRING)
    private UserRolesEnum name;
}
