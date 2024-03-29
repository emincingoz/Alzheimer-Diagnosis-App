package com.emincingoz.alzheimerdiagnosisservice.manager.user;

import com.emincingoz.alzheimerdiagnosisservice.utils.BusinessRules;
import com.emincingoz.alzheimerdiagnosisservice.utils.results.ErrorResult;
import com.emincingoz.alzheimerdiagnosisservice.utils.results.Result;
import com.emincingoz.alzheimerdiagnosisservice.utils.results.SuccessResult;
import com.emincingoz.alzheimerdiagnosisservice.domain.dtos.email.EmailDTO;
import com.emincingoz.alzheimerdiagnosisservice.domain.enums.UserRolesEnum;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.Authority;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.User;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.UserAuthority;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.ForgotPasswordRequest;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.authentication.UserRegisterRequest;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.user.UpdateUserInfoRequest;
import com.emincingoz.alzheimerdiagnosisservice.domain.responses.user.UserInfoGetResponse;
import com.emincingoz.alzheimerdiagnosisservice.nationalityPeopleValidator.NationalityPeopleValidator;
import com.emincingoz.alzheimerdiagnosisservice.manager.email.IEmailService;
import com.emincingoz.alzheimerdiagnosisservice.repository.IUserRepository;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.management.InstanceNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserManager implements IUserService {

    private final IUserRepository userRepository;
    private final ModelMapper modelMapper;
    private final NationalityPeopleValidator nationalityPeopleValidator;
    private final IEmailService emailService;

    public UserManager(@Qualifier("fakeNationalityPeopleValidator") NationalityPeopleValidator nationalityPeopleValidator,
                       IUserRepository userRepository,
                       IEmailService emailService,
                       ModelMapper modelMapper) {
        this.nationalityPeopleValidator = nationalityPeopleValidator;
        this.userRepository = userRepository;
        this.emailService = emailService;
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

        userRepository.save(user);
        return new ResponseEntity<>(new SuccessResult(UserMessageConstants.USER_REGISTER_SUCCESS), HttpStatus.ACCEPTED);
    }

    @Override
    public User findUserByTckn(String userTckn) throws InstanceNotFoundException {
        Optional<User> user = userRepository.findByTckn(userTckn);
        if (user.isPresent())
            return user.get();
        throw new InstanceNotFoundException();
    }

    @Override
    public UserInfoGetResponse getUserInfosByTckn(String tckn) throws InstanceNotFoundException {
        User user = findUserByTckn(tckn);

        UserInfoGetResponse userInfo = modelMapper.map(user, UserInfoGetResponse.class);
        System.out.println("useraInfo: " + userInfo.toString());

        return userInfo;
    }

    @Transactional
    @Override
    public ResponseEntity<?> forgotPassword(ForgotPasswordRequest forgotPasswordRequest) throws UnirestException {
        Result ruleResult = BusinessRules.run(isUserExists(forgotPasswordRequest.getTcno()));
        if (ruleResult == null)
            return new ResponseEntity<>(ruleResult, HttpStatus.CONFLICT);

        String tc = forgotPasswordRequest.getTcno();
        try {
            UserInfoGetResponse userInfos = getUserInfosByTckn(tc);

            // User email not found
            if (!forgotPasswordRequest.getEmail().equals(userInfos.getEmail()))
                return new ResponseEntity<>(ruleResult, HttpStatus.CONFLICT);

            String newPassword = randomPasswordGenerator();


            String emailRecipient = userInfos.getEmail();
            String emailMessageBody = "Yeni şifreniz: " + newPassword + " \n\nLütfen şifrenizi kimseyle paylaşmayınız ve en yakın zamanda değiştiriniz";
            String emailSubject = "Şifre Yenileme";

            EmailDTO emailDTO = new EmailDTO();
            emailDTO.setRecipient(emailRecipient);
            emailDTO.setMessageBody(emailMessageBody);
            emailDTO.setSubject(emailSubject);

            Optional<User> user = userRepository.findByTckn(tc);

            PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
            String encodedNewPassword = encoder.encode(newPassword).substring(8);

            if (user.isPresent()) {
                user.get().setPassword(encodedNewPassword);
                userRepository.save(user.get());
            }

            Result emailResult = emailService.forgotPasswordSendEmail(emailDTO);
            return ResponseEntity.ok(emailResult);
        } catch (InstanceNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<?> updateUserInfos(UpdateUserInfoRequest updateUserInfoRequest) throws UnirestException {

        String tc = updateUserInfoRequest.getTcno();
        String phoneNumber = updateUserInfoRequest.getPhoneNumber();
        String email = updateUserInfoRequest.getEmail();
        String password = updateUserInfoRequest.getPassword();

        Optional<User> user = userRepository.findByTckn(tc);

        if (user.isPresent()) {
            if (!phoneNumber.equals("") && !email.equals("")) {
                user.get().setPhoneNumber(phoneNumber);
                user.get().setEmail(email);
            }
            if (!password.equals("")) {
                PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
                String encodedPassword = passwordEncoder.encode(password).substring(8);
                user.get().setPassword(encodedPassword);
            }
            userRepository.save(user.get());
        }

        return ResponseEntity.ok(new SuccessResult());
    }

    private Result isUserExists(String tckn) {
        Optional<User> user = userRepository.findByTckn(tckn);

        if (user.isPresent())
            return new ErrorResult(UserMessageConstants.USER_ALREADY_EXISTS);

        return new SuccessResult();
    }

    private String randomPasswordGenerator() {
        UUID uuid = UUID.randomUUID();
        String newPassword = uuid.toString().substring(0, 8);

        return newPassword;
    }
}
