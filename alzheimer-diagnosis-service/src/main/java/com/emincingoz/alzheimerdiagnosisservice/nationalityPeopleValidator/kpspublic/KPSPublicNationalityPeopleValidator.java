package com.emincingoz.alzheimerdiagnosisservice.nationalityPeopleValidator.kpspublic;

import com.emincingoz.alzheimerdiagnosisservice.nationalityPeopleValidator.NationalityPeopleModel;
import com.emincingoz.alzheimerdiagnosisservice.nationalityPeopleValidator.NationalityPeopleValidator;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
@Qualifier("kpsPublicNationalityPeopleValidator")
public class KPSPublicNationalityPeopleValidator extends NationalityPeopleValidator {
    @Override
    public boolean validate(NationalityPeopleModel model) throws UnirestException {
        if (!super.checkByNationalityNumberValue(model.getTckn())) {
            return false;
        }

        Unirest.setTimeouts(0, 0);
        HttpResponse<String> response = Unirest.post("https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx")
                .header("Content-Type", "application/soap+xml; charset=utf-8")
                .header("Cookie", "TS0193588c=01e4b304423c2c20e4b100cc7b6cbe94a393fab91645cfdb780a3545472011dba659b92a74d464142cb230829ae643bf0317dc3497")
                .body("<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<soap12:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap12=\"http://www.w3.org/2003/05/soap-envelope\">\r\n " +
                        " <soap12:Body>\r\n    <TCKimlikNoDogrula xmlns=\"http://tckimlik.nvi.gov.tr/WS\">\r\n     " +
                        " <TCKimlikNo>" + model.getTckn() + "</TCKimlikNo>\r\n     " +
                        " <Ad>" + model.getFirstName() + "</Ad>\r\n     " +
                        " <Soyad>" + model.getLastName() + "</Soyad>\r\n     " +
                        " <DogumYili>" + model.getBirthYear() + "</DogumYili>\r\n   " +
                        " </TCKimlikNoDogrula>\r\n  </soap12:Body>\r\n</soap12:Envelope>")
                .asString();

        return response.getBody().contains("true");
    }
}
