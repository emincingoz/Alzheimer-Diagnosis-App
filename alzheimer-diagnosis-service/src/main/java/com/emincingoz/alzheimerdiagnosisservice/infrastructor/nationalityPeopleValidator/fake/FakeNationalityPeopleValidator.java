package com.emincingoz.alzheimerdiagnosisservice.infrastructor.nationalityPeopleValidator.fake;

import com.emincingoz.alzheimerdiagnosisservice.infrastructor.nationalityPeopleValidator.NationalityPeopleModel;
import com.emincingoz.alzheimerdiagnosisservice.infrastructor.nationalityPeopleValidator.NationalityPeopleValidator;
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
