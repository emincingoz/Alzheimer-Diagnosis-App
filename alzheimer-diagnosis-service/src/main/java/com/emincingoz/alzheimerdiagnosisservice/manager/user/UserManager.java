package com.emincingoz.alzheimerdiagnosisservice.manager.user;

import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.ErrorResult;
import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.SuccessResult;
import com.emincingoz.alzheimerdiagnosisservice.infrastructor.nationalityPeopleValidator.NationalityPeopleModel;
import com.emincingoz.alzheimerdiagnosisservice.infrastructor.nationalityPeopleValidator.NationalityPeopleValidator;
import com.emincingoz.alzheimerdiagnosisservice.repository.IUserRepository;
import com.emincingoz.alzheimerdiagnosisservice.core.utils.BusinessRules;
import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.Result;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.User;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.UserRegisterRequest;
import com.mashape.unirest.http.exceptions.UnirestException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import java.util.Optional;

@Service
public class UserManager implements IUserService {

    private final IUserRepository userRepository;
    private final ModelMapper modelMapper;
    private final NationalityPeopleValidator nationalityPeopleValidator;

    public UserManager(@Qualifier("kpsPublicNationalityPeopleValidator") NationalityPeopleValidator nationalityPeopleValidator,
                       IUserRepository userRepository,
                       ModelMapper modelMapper) {
        this.nationalityPeopleValidator = nationalityPeopleValidator;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ResponseEntity<?> register(UserRegisterRequest userRegisterRequest) throws UnirestException {

        Result ruleResult = BusinessRules.run(isUserExists(userRegisterRequest.getTckn()));

        // CONFLICT -> 409 http code
        if (ruleResult != null)
            return new ResponseEntity<>(ruleResult, HttpStatus.CONFLICT);

        // Return 417 Code Http
        NationalityPeopleModel nationalityPeopleModel = modelMapper.map(userRegisterRequest, NationalityPeopleModel.class);
        nationalityPeopleModel.setBirthYear(userRegisterRequest.getBirthDate().getYear());
        System.out.println(nationalityPeopleModel.toString());

        if (!nationalityPeopleValidator.validate(nationalityPeopleModel))
            return new ResponseEntity<>(
                    new ErrorResult(UserMessageConstants.USER_INFO_NOT_CORRECT),
                    HttpStatus.EXPECTATION_FAILED);

        User user = modelMapper.map(userRegisterRequest, User.class);

        PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(userRegisterRequest.getPassword()).substring(8);

        user.setPassword(encodedPassword);

        userRepository.save(user);
        return new ResponseEntity<>(new SuccessResult(UserMessageConstants.USER_REGISTER_SUCCESS), HttpStatus.ACCEPTED);
    }

    private Result isUserExists(String tckn) {
        Optional<User> user = userRepository.findByTckn(tckn);

        if (user.isPresent())
            return new ErrorResult(UserMessageConstants.USER_ALREADY_EXISTS);

        return new SuccessResult();
    }
}
