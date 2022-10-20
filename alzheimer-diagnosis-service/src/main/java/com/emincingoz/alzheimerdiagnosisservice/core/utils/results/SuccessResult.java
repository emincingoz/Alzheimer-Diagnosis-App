package com.emincingoz.alzheimerdiagnosisservice.core.utils.results;

import lombok.Getter;

@Getter
public class SuccessResult extends Result {

    public SuccessResult(String message) {
        super(message, true);
    }

    public SuccessResult() {
        super(true);
    }
}
