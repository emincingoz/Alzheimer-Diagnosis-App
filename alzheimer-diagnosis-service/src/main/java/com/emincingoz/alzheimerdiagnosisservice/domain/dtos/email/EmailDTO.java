package com.emincingoz.alzheimerdiagnosisservice.domain.dtos.email;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmailDTO {

    private String recipient;
    private String messageBody;
    private String subject;

    @Override
    public String toString() {
        return "EmailDetails{" +
                "recipient='" + recipient + '\'' +
                ", messageBody='" + messageBody + '\'' +
                ", subject='" + subject + '\'' +
                '}';
    }
}
