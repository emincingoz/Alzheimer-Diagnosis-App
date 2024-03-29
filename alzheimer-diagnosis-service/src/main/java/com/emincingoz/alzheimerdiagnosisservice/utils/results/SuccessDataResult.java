package com.emincingoz.alzheimerdiagnosisservice.utils.results;

public class SuccessDataResult<T> extends DataResult {

    public SuccessDataResult(Object data, String message) {
        super(data, message, true);
    }

    public SuccessDataResult(Object data) {
        super(data, true);
    }
}
