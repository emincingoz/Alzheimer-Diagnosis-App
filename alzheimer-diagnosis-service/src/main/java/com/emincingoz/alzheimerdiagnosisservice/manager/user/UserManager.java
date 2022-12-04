package com.emincingoz.alzheimerdiagnosisservice.manager.user;

import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.ErrorResult;
import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.SuccessResult;
import com.emincingoz.alzheimerdiagnosisservice.domain.enums.UserRolesEnum;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.Authority;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.UserAuthority;
import com.emincingoz.alzheimerdiagnosisservice.infrastructor.nationalityPeopleValidator.NationalityPeopleModel;
import com.emincingoz.alzheimerdiagnosisservice.infrastructor.nationalityPeopleValidator.NationalityPeopleValidator;
import com.emincingoz.alzheimerdiagnosisservice.repository.IUserRepository;
import com.emincingoz.alzheimerdiagnosisservice.core.utils.BusinessRules;
import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.Result;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.User;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.UserRegisterRequest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import javax.management.InstanceNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class UserManager implements IUserService {

    private final IUserRepository userRepository;
    private final ModelMapper modelMapper;
    private final NationalityPeopleValidator nationalityPeopleValidator;

    public UserManager(@Qualifier("fakeNationalityPeopleValidator") NationalityPeopleValidator nationalityPeopleValidator,
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

        // TODO:: Burayı Aç, Kimlik Doğrulaması yapılıyor
        // Return 417 Code Http
        /*NationalityPeopleModel nationalityPeopleModel = modelMapper.map(userRegisterRequest, NationalityPeopleModel.class);
        nationalityPeopleModel.setBirthYear(userRegisterRequest.getBirthDate().getYear());

        if (!nationalityPeopleValidator.validate(nationalityPeopleModel))
            return new ResponseEntity<>(
                    new ErrorResult(UserMessageConstants.USER_INFO_NOT_CORRECT),
                    HttpStatus.EXPECTATION_FAILED);*/

        User user = modelMapper.map(userRegisterRequest, User.class);

        PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(userRegisterRequest.getPassword()).substring(8);

        user.setPassword(encodedPassword);

        UserAuthority userAuthority = new UserAuthority();
        userAuthority.setUser(user);
        Authority authority = new Authority();
        authority.setName(UserRolesEnum.PATIENT);
        userAuthority.setAuthorityName(authority);

        user.setRoles(List.of(userAuthority));

        System.out.println(user.toString());

        userRepository.save(user);
        return new ResponseEntity<>(new SuccessResult(UserMessageConstants.USER_REGISTER_SUCCESS), HttpStatus.ACCEPTED);
    }

    @Override
    public User findUserByTckn(String senderTckn) throws InstanceNotFoundException {
        Optional<User> user = userRepository.findByTckn(senderTckn);
        if (user.isPresent())
            return user.get();
        throw new InstanceNotFoundException();
    }

    private Result isUserExists(String tckn) {
        Optional<User> user = userRepository.findByTckn(tckn);

        if (user.isPresent())
            return new ErrorResult(UserMessageConstants.USER_ALREADY_EXISTS);

        return new SuccessResult();
    }
}
