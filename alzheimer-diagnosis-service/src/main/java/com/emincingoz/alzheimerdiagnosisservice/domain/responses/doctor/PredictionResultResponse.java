package com.emincingoz.alzheimerdiagnosisservice.domain.responses.doctor;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PredictionResultResponse {
    private String predClassName;
    private Double predValue;

           public PredictionResultResponse(String name, Double value) {
               predClassName = name;
               predValue = value;
            }}