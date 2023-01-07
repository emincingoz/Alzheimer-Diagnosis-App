package com.emincingoz.alzheimerdiagnosisservice.manager.questionForm;

import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.Result;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.userFormQuestion.FormQuestionListRequest;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.userFormQuestion.FormSubmitRequest;
import com.emincingoz.alzheimerdiagnosisservice.domain.responses.FormQuestionGetResponse;

import javax.management.InstanceNotFoundException;
import java.util.List;

public interface IUserFormQuestionService {

    Result getAllQuestions();

    Result submitForm(String tckn, List<FormSubmitRequest> formSubmitRequestList) throws InstanceNotFoundException;

    List<FormQuestionGetResponse> getAllQuestionByUserTckn(String tckn) throws InstanceNotFoundException;
}
