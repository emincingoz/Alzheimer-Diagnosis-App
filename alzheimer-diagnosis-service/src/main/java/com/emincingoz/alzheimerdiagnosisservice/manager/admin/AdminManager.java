package com.emincingoz.alzheimerdiagnosisservice.manager.admin;

import com.emincingoz.alzheimerdiagnosisservice.utils.BusinessRules;
import com.emincingoz.alzheimerdiagnosisservice.utils.results.*;
import com.emincingoz.alzheimerdiagnosisservice.domain.enums.UserRolesEnum;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.Authority;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.User;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.UserAuthority;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.admin.AdminChangeDoctorInfoRequest;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.admin.AdminNewDoctorRequest;
import com.emincingoz.alzheimerdiagnosisservice.domain.responses.user.UserInfoGetResponse;
import com.emincingoz.alzheimerdiagnosisservice.repository.IAdminRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminManager implements IAdminService {

    private final IAdminRepository adminRepository;
    private final ModelMapper modelMapper;

    @Override
    public Result getAllPatients() {

        List<UserInfoGetResponse> patientsInfoGetResponses = getAllUsersInfosByRole(UserRolesEnum.PATIENT);

        return new SuccessDataResult<>(patientsInfoGetResponses);
    }

    @Override
    public Result getAllDoctors() {

        List<UserInfoGetResponse> doctorsInfoGetResponse = getAllUsersInfosByRole(UserRolesEnum.DOCTOR);

        return new SuccessDataResult<>(doctorsInfoGetResponse);
    }

    @Override
    public ResponseEntity<?> addNewDoctor(AdminNewDoctorRequest request) {

        Result ruleResult = BusinessRules.run(isUserExists(request.getTckn()));

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

        User newDoctor = modelMapper.map(request, User.class);

        PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(request.getPassword()).substring(8);

        newDoctor.setPassword(encodedPassword);

        UserAuthority userAuthority = new UserAuthority();
        userAuthority.setUser(newDoctor);
        Authority authority = new Authority();
        authority.setName(UserRolesEnum.DOCTOR);
        userAuthority.setAuthorityName(authority);

        newDoctor.setRoles(List.of(userAuthority));

        adminRepository.save(newDoctor);
        return new ResponseEntity<>(new SuccessResult(AdminMessageConstants.USER_REGISTER_SUCCESS), HttpStatus.ACCEPTED);

    }

    @Override
    public Result changeDoctorInfo(String tckn, AdminChangeDoctorInfoRequest changeDoctorInfoRequest) {
        Optional<User> user = adminRepository.findByTckn(tckn);
        if (user.isEmpty())
            return new ErrorResult("Doctor Bulunamadı");

        PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(changeDoctorInfoRequest.getPassword()).substring(8);

        user.get().setEmail(changeDoctorInfoRequest.getEmail());
        user.get().setPassword(encodedPassword);
        user.get().setPhoneNumber(changeDoctorInfoRequest.getPhoneNumber());

        adminRepository.save(user.get());
        return new SuccessResult();
    }

    private List<UserInfoGetResponse> getAllUsersInfosByRole(UserRolesEnum role) {
        List<User> userList = adminRepository.findAllByRole(role);

        List<UserInfoGetResponse> userInfoGetResponses = modelMapper.map(userList, new TypeToken<List<UserInfoGetResponse>>() {}.getType());

        return userInfoGetResponses;
    }

    private Result isUserExists(String tckn) {
        Optional<User> user = adminRepository.findByTckn(tckn);

        if (user.isPresent())
            return new ErrorResult(AdminMessageConstants.USER_ALREADY_EXISTS);

        return new SuccessResult();
    }
}
