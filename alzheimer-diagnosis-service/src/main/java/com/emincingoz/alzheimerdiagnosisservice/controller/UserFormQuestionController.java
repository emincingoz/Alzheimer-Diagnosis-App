package com.emincingoz.alzheimerdiagnosisservice.controller;

import com.emincingoz.alzheimerdiagnosisservice.domain.requests.userFormQuestion.FormQuestionListRequest;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.userFormQuestion.FormSubmitRequest;
import com.emincingoz.alzheimerdiagnosisservice.manager.questionForm.IUserFormQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.InstanceNotFoundException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/user-form-question")
@RequiredArgsConstructor
public class UserFormQuestionController {

    private final IUserFormQuestionService userFormQuestionService;

    @GetMapping("get-all-questions")
    public ResponseEntity<?> getAllQuestions() {
        return ResponseEntity.ok(userFormQuestionService.getAllQuestions());
    }

    @PostMapping(value="submit-form/{tckn}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> submitForm(@PathVariable("tckn") String tckn, @RequestBody List<FormSubmitRequest> formSubmitRequestList) throws InstanceNotFoundException {
        System.out.println("gfhfg: " + formSubmitRequestList.toString());
        return ResponseEntity.ok(userFormQuestionService.submitForm(tckn, formSubmitRequestList));
    }
}
