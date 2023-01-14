package com.emincingoz.alzheimerdiagnosisservice.nationalityPeopleValidator;

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
