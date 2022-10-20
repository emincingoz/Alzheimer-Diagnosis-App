package com.emincingoz.alzheimerdiagnosisservice.infrastructor.nationalityPeopleValidator;

import com.mashape.unirest.http.exceptions.UnirestException;

public abstract class NationalityPeopleValidator {
    public abstract boolean validate(NationalityPeopleModel model) throws UnirestException, UnirestException;

    protected boolean checkByNationalityNumberValue(String tckno) {

        int[] numberArray = smash(tckno);
        if (numberArray.length == 11) {
            boolean condition1 = (numberArray[0] + numberArray[1] + numberArray[2] + numberArray[3] + numberArray[4] + numberArray[5] + numberArray[6] + numberArray[7] + numberArray[8] + numberArray[9]) % 10 == numberArray[10];
            boolean condition2 = (((numberArray[0] + numberArray[2] + numberArray[4] + numberArray[6] + numberArray[8]) * 7) + ((numberArray[1] + numberArray[3] + numberArray[5] + numberArray[7]) * 9)) % 10 == numberArray[9];
            boolean condition3 = ((numberArray[0] + numberArray[2] + numberArray[4] + numberArray[6] + numberArray[8]) * 8) % 10 == numberArray[10];

            return condition1 && condition2 && condition3;
        }
        return false;
    }

    private int[] smash(String tckno) {
        int[] numbers = new int[11];

        if (tckno == null || tckno.length() != 11) {
            return new int[0];
        }

        for (int i = 0; i < 11; i++) {
            numbers[i] = Integer.parseInt(tckno.substring(i, (i + 1)));
        }
        return numbers;
    }
}
