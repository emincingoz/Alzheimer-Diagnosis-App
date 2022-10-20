package com.emincingoz.alzheimerdiagnosisservice.core.utils.results;

import lombok.Getter;

@Getter
public class DataResult<T> extends Result {
    private final T data;

    public DataResult(T data, String message, boolean success) {
        super(message, success);
        this.data = data;
    }

    public DataResult(T data, boolean success) {
        super(success);
        this.data = data;
    }
}
