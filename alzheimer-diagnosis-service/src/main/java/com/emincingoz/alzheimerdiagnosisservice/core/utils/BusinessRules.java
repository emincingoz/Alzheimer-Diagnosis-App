package com.emincingoz.alzheimerdiagnosisservice.core.utils;

import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.Result;

public class BusinessRules {
    public static Result run(Result ... rules) {
        for (Result rule : rules) {
            if (!rule.isSuccess())
                return rule;
        }
        return null;
    }
}
