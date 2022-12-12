package com.emincingoz.alzheimerdiagnosisservice.manager.admin;

import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.DataResult;
import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.Result;
import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.SuccessDataResult;
import com.emincingoz.alzheimerdiagnosisservice.domain.enums.UserRolesEnum;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.User;
import com.emincingoz.alzheimerdiagnosisservice.domain.responses.doctor.PatientsGetResponse;
import com.emincingoz.alzheimerdiagnosisservice.domain.responses.user.UserInfoGetResponse;
import com.emincingoz.alzheimerdiagnosisservice.repository.IAdminRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;

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

    private List<UserInfoGetResponse> getAllUsersInfosByRole(UserRolesEnum role) {
        List<User> userList = adminRepository.findAllByRole(role);

        List<UserInfoGetResponse> userInfoGetResponses = modelMapper.map(userList, new TypeToken<List<UserInfoGetResponse>>() {}.getType());

        return userInfoGetResponses;
    }
}
