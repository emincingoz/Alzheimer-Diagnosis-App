package com.emincingoz.alzheimerdiagnosisservice.utils.results;

public class ErrorDataResult<T> extends DataResult {
    public ErrorDataResult(Object data, String message) {
        super(data, message, false);
    }

    public ErrorDataResult(Object data) {
        super(data, false);
    }
}
