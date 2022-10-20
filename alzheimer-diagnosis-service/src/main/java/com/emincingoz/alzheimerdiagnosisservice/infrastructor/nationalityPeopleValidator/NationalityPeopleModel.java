package com.emincingoz.alzheimerdiagnosisservice.infrastructor.nationalityPeopleValidator;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class NationalityPeopleModel {
    private String tckn;
    private String firstName;
    private String lastName;
    private Integer birthYear;
}
