package com.emincingoz.alzheimerdiagnosisservice.domain.requests.userFormQuestion;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class FormQuestionListRequest {
    List<FormSubmitRequest> formSubmitRequestList;
}
