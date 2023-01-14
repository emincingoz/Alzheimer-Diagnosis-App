package com.emincingoz.alzheimerdiagnosisservice.manager.authentication;

import com.emincingoz.alzheimerdiagnosisservice.utils.BusinessRules;
import com.emincingoz.alzheimerdiagnosisservice.utils.results.*;
import com.emincingoz.alzheimerdiagnosisservice.domain.dtos.authentication.RefreshTokenDTO;
import com.emincingoz.alzheimerdiagnosisservice.domain.dtos.authentication.TokenDTO;
import com.emincingoz.alzheimerdiagnosisservice.domain.enums.UserRolesEnum;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.User;
import com.emincingoz.alzheimerdiagnosisservice.domain.requests.authentication.UserLoginRequest;
import com.emincingoz.alzheimerdiagnosisservice.repository.IUserRepository;
import com.emincingoz.alzheimerdiagnosisservice.security.JwtTokenProvider;
import com.emincingoz.alzheimerdiagnosisservice.security.JwtUserDetailsFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationManager implements IAuthenticationService{

    private final IUserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public DataResult<TokenDTO> login(UserLoginRequest userLoginRequest) {
        Optional<User> user = this.userRepository.findByTckn(userLoginRequest.getTckn());
        var businessResult = BusinessRules.run(
                isUserExist(user.get()),
                isInvalidPassword(user.get(), userLoginRequest.getPassword()));
        if (businessResult != null) {
            return new ErrorDataResult<>(businessResult.getMessage());
        }
        UserDetails userDetails = JwtUserDetailsFactory.create(user.get());
        String token = this.jwtTokenProvider.generateJwtToken(userDetails);

        RefreshTokenDTO refreshTokenDto = this.jwtTokenProvider.generateRefreshToken();

        user.get().setRefreshToken(refreshTokenDto.getToken());
        user.get().setRefreshTokenExpirationDate(refreshTokenDto.getExpirationDate());

        this.userRepository.save(user.get());

        //List<UserRolesEnum> roles = user.get().getRoles().get().getAuthorityName().getName();

        List<UserRolesEnum> roles = new ArrayList<>();
        user.get().getRoles().stream().forEach(userAuthority -> roles.add(userAuthority.getAuthorityName().getName()));

        TokenDTO tokenDTO = new TokenDTO(token, refreshTokenDto.getToken(), roles);

        return new SuccessDataResult<>(tokenDTO);
    }

    private Result isUserExist(User user) {
        if (user == null)
            return new ErrorResult(AuthenticationMessageConstants.USER_NOT_FOUND);

        return new SuccessResult();
    }

    private Result isInvalidPassword(User user, String password) {
        if (user == null) {
            return new ErrorResult(AuthenticationMessageConstants.USER_NOT_FOUND);
        }

        PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        boolean result = encoder.matches(password, "{bcrypt}" + user.getPassword());

        if (!result) {
            return new ErrorResult(AuthenticationMessageConstants.USER_INVALID_PASSWORD);
        }
        return new SuccessResult();
    }
}
