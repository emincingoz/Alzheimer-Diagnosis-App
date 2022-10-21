package com.emincingoz.alzheimerdiagnosisservice.security;

import com.emincingoz.alzheimerdiagnosisservice.domain.enums.UserRolesEnum;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.User;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.UserAuthority;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public final class JwtUserDetailsFactory {

    public static JwtUserDetails create(User user) {
        return new JwtUserDetails(
                user.getId(),
                user.getTckn(),
                user.getFirstName() + ' ' + user.getLastName(),
                user.getPassword(),
                mapToGrantedAuthority(user.getRoles()),
                null
        );
    }

    private static List<GrantedAuthority> mapToGrantedAuthorities(List<UserRolesEnum> authorities) {
        return authorities.stream()
                .map(authority -> new SimpleGrantedAuthority(authority.name()))
                .collect(Collectors.toList());
    }

    private static List<GrantedAuthority> mapToGrantedAuthority(List<UserAuthority> roleList) {
        List<GrantedAuthority> authorityList = new ArrayList<>();
        roleList.forEach(userRole -> authorityList.add(new SimpleGrantedAuthority(userRole.getAuthorityName().getName().name())));
        return authorityList;
    }
}
