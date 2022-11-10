package com.emincingoz.alzheimerdiagnosisservice.controller;

import com.emincingoz.alzheimerdiagnosisservice.manager.questionForm.IUserFormQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user-form-question")
@RequiredArgsConstructor
public class UserFormQuestionController {

    private final IUserFormQuestionService userFormQuestionService;

    @GetMapping("get-all-questions")
    public ResponseEntity<?> getAllQuestions() {
        return ResponseEntity.ok(userFormQuestionService.getAllQuestions());
    }
}
