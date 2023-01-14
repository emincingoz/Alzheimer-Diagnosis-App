package com.emincingoz.alzheimerdiagnosisservice.nationalityPeopleValidator.fake;

import com.emincingoz.alzheimerdiagnosisservice.nationalityPeopleValidator.NationalityPeopleModel;
import com.emincingoz.alzheimerdiagnosisservice.nationalityPeopleValidator.NationalityPeopleValidator;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
@Qualifier("fakeNationalityPeopleValidator")
public class FakeNationalityPeopleValidator extends NationalityPeopleValidator {
    @Override
    public boolean validate(NationalityPeopleModel model) throws UnirestException {
        return (!super.checkByNationalityNumberValue(model.getTckn()) == false);
    }
}
