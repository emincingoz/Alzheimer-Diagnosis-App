package com.emincingoz.alzheimerdiagnosisservice;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AlzheimerDiagnosisServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlzheimerDiagnosisServiceApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
}
