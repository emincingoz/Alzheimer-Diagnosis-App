package com.emincingoz.alzheimerdiagnosisservice.manager.questionForm;

import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.Result;
import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.SuccessDataResult;
import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.SuccessResult;
import com.emincingoz.alzheimerdiagnosisservice.domain.dtos.userFormQuestion.ListUserFormQuestionDTO;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.FormQuestion;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.User;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.UserFormQuestion;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.userFormQuestion.FormQuestionListRequest;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.userFormQuestion.FormSubmitRequest;
import com.emincingoz.alzheimerdiagnosisservice.domain.responses.FormQuestionGetResponse;
import com.emincingoz.alzheimerdiagnosisservice.manager.user.IUserService;
import com.emincingoz.alzheimerdiagnosisservice.repository.IFormQuestionRepository;
import com.emincingoz.alzheimerdiagnosisservice.repository.IUserFormQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import javax.management.InstanceNotFoundException;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserFormQuestionManager implements IUserFormQuestionService {

    private final IFormQuestionRepository formQuestionRepository;
    private final IUserFormQuestionRepository userFormQuestionRepository;
    private final IUserService userService;
    private final ModelMapper modelMapper;

    @Override
    public Result getAllQuestions() {
        List<FormQuestionGetResponse> formQuestionGetResponse = modelMapper.map(formQuestionRepository.findAll(), new TypeToken<List<FormQuestionGetResponse>>() {}.getType());

        return new SuccessDataResult<>(formQuestionGetResponse);
    }

    @Transactional
    @Override
    public Result submitForm(String tckn, List<FormSubmitRequest> formSubmitRequestList) throws InstanceNotFoundException {
        User user = userService.findUserByTckn(tckn);

        // Check if the user has already filled out the form, delete previous data if filled, write new ones
        List<UserFormQuestion> oldUserFormQuestions = userFormQuestionRepository.findAllUserFormQuestionByUser(user);
        if (oldUserFormQuestions.size() > 0) {
            userFormQuestionRepository.deleteAllByUser(user);
        }

        for (FormSubmitRequest formSubmitRequest : formSubmitRequestList) {
            UserFormQuestion userFormQuestion = new UserFormQuestion();
            userFormQuestion.setUser(user);
            userFormQuestion.setUserAnswer(formSubmitRequest.getAnswer());
            FormQuestion formQuestion = modelMapper.map(formSubmitRequest, FormQuestion.class);
            userFormQuestion.setFormQuestion(formQuestion);
            userFormQuestionRepository.save(userFormQuestion);
        }

        return new SuccessResult();
    }
}
