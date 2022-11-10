package com.emincingoz.alzheimerdiagnosisservice.manager.questionForm;

import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.Result;
import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.SuccessDataResult;
import com.emincingoz.alzheimerdiagnosisservice.domain.responses.FormQuestionGetResponse;
import com.emincingoz.alzheimerdiagnosisservice.repository.IFormQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserFormQuestionManager implements IUserFormQuestionService {

    private final IFormQuestionRepository formQuestionRepository;
    private final ModelMapper modelMapper;

    @Override
    public Result getAllQuestions() {
        List<FormQuestionGetResponse> formQuestionGetResponse = modelMapper.map(formQuestionRepository.findAll(), new TypeToken<List<FormQuestionGetResponse>>() {}.getType());
        System.out.println("ans: " + formQuestionGetResponse.toString());
        return new SuccessDataResult<>(formQuestionGetResponse);
    }
}
