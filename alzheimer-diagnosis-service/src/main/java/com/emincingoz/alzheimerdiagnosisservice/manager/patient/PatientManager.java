package com.emincingoz.alzheimerdiagnosisservice.manager.patient;

import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.Result;
import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.SuccessDataResult;
import com.emincingoz.alzheimerdiagnosisservice.domain.enums.UserRolesEnum;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.Authority;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.User;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.UserAuthority;
import com.emincingoz.alzheimerdiagnosisservice.repository.IPatientRepository;
import com.emincingoz.alzheimerdiagnosisservice.repository.IUserAuthorityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientManager implements IPatientService {

    private final IPatientRepository patientRepository;
    private final IUserAuthorityRepository userAuthorityRepository;

    @Override
    public Result getAllDoctors() {
        System.out.println("ulaştı");
        Authority authority = new Authority();
        authority.setName(UserRolesEnum.DOCTOR);
        List<UserAuthority> userAuthorities = userAuthorityRepository.findUserAuthoritiesByAuthorityName(authority);
        System.out.println("ulaştı");
        List<User> users = new ArrayList<>();
        userAuthorities.forEach(auth -> {users.add(auth.getUser());});

        System.out.println(users.toString());
        return new SuccessDataResult<>(users);
    }
}
