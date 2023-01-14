package com.emincingoz.alzheimerdiagnosisservice.utils.results;

import lombok.Getter;

@Getter
public class ErrorResult extends Result {

    public ErrorResult(String message) {
        super(message, false);
    }

    public ErrorResult() {
        super(false);
    }
}
