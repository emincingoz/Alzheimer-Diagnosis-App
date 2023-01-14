package com.emincingoz.alzheimerdiagnosisservice.config;

import com.emincingoz.alzheimerdiagnosisservice.domain.enums.UserRolesEnum;
import com.emincingoz.alzheimerdiagnosisservice.security.JwtAuthenticationEntryPoint;
import com.emincingoz.alzheimerdiagnosisservice.security.JwtAuthorizationTokenFilter;
import com.emincingoz.alzheimerdiagnosisservice.security.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    // Custom JWT based security filter
    @Autowired
    JwtAuthorizationTokenFilter authenticationTokenFilter;

    @Value("${jwt.route.authentication.path}")
    private String authenticationPath;

    private static final String[] AUTH_WHITELIST = {

            // -- swagger ui
            "/swagger-resources/**",
            "/swagger-ui.html",
            "/v2/api-docs",
            "/webjars/**",
            "/api/public/**",
            "/api/file-servlet/**",
            "/swagger-ui/**",
            "/v3/api-docs/**",
            "/api-docs/**",
    };

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public static PasswordEncoder passwordEncoderBean() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(jwtUserDetailsService)
                .passwordEncoder(passwordEncoderBean());
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                // we don't need CSRF because our token is invulnerable
                .csrf().disable()

                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()

                // don't create session
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()

                .authorizeRequests()

                // Un-secure H2 Database
                .antMatchers("/h2-console/**/**").permitAll()
                .antMatchers("/api/auth/login").permitAll()
                .antMatchers("/api/refresh").permitAll()
                .antMatchers("/api/logout").permitAll()
                .antMatchers("/api/forgetPassword").permitAll()
                .antMatchers("/public/**/").permitAll()
                .antMatchers("/api/user/register").permitAll()
                .antMatchers("/api/user/get-user-infos/**").hasAnyAuthority(UserRolesEnum.DOCTOR.toString(), UserRolesEnum.PATIENT.toString(), UserRolesEnum.ADMIN.toString())
                .antMatchers("/api/doctor/**").hasAuthority(UserRolesEnum.DOCTOR.toString())
                //.antMatchers("/api/doctor/**").permitAll()
                .antMatchers("/api/admin/**").hasAuthority(UserRolesEnum.ADMIN.toString())
                .antMatchers("/api/patient/**").hasAuthority(UserRolesEnum.PATIENT.toString())
                //.antMatchers("/api/patient/**").permitAll()
                .antMatchers("/api/user-form-question/**").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/api/user/register").permitAll()
                .antMatchers(AUTH_WHITELIST).permitAll()

                .antMatchers("/ws/**").permitAll()
                .antMatchers("/user/**").permitAll()
                .antMatchers("/message-app/**").permitAll()

                .antMatchers(HttpMethod.OPTIONS, "/ws/**").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/user/**").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/message-app/**").permitAll()
                .antMatchers("/api/message-contact/**").permitAll()
                .antMatchers("/api/user/forgotPassword/**").permitAll()
                .antMatchers("/api/user/update-user-infos/**").permitAll()

                .anyRequest().authenticated();

        httpSecurity.cors();

        httpSecurity
                .addFilterBefore(authenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);

        // disable page caching
        httpSecurity
                .headers()
                .frameOptions().sameOrigin()  // required to set for H2 else H2 Console will be blank.
                .cacheControl();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        // AuthenticationTokenFilter will ignore the below paths
        web
                .ignoring()
                .antMatchers(
                        HttpMethod.POST,
                        authenticationPath
                )

                // allow anonymous resource requests
                .and()
                .ignoring()
                .antMatchers(
                        HttpMethod.GET,
                        "/",
                        "/*.html",
                        "/favicon.ico",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.js"
                )

                // Un-secure H2 Database (for testing purposes, H2 console shouldn't be unprotected in production)
                .and()
                .ignoring()
                .antMatchers("/h2-console/**/**");
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                //registry.addMapping("/**").allowedOrigins("*").allowedMethods("*").allowedHeaders("*");
                registry.addMapping("/api/auth/login")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("POST")
                        .allowedHeaders("*")
                        .allowCredentials(true);

                registry.addMapping("/api/user/register/**").allowedOrigins("http://localhost:3000").allowedMethods("*").allowedHeaders("*");

                registry.addMapping("/**").allowedOrigins("http://localhost:3000").allowedMethods("*").allowedHeaders("*").allowCredentials(true);


                // TODO:: change allowCredentials to true
                registry.addMapping("/api/user-form-question")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("*")
                        .allowedHeaders("*")
                        .allowCredentials(false);

                registry.addMapping("/api/user/get-user-infos/**").allowedOrigins("http://localhost:3000").allowedMethods("*").allowedHeaders("*").allowCredentials(true);

                registry.addMapping("/api/patient/**").allowedOrigins("http://localhost:3000").allowedMethods("*").allowedHeaders("*");
            }
        };
    }
}
