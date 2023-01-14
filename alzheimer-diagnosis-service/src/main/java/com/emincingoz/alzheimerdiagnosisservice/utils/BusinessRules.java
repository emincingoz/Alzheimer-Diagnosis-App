package com.emincingoz.alzheimerdiagnosisservice.utils;

import com.emincingoz.alzheimerdiagnosisservice.utils.results.Result;

public class BusinessRules {
    public static Result run(Result ... rules) {
        for (Result rule : rules) {
            if (!rule.isSuccess())
                return rule;
        }
        return null;
    }
}
