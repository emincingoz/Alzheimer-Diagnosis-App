package com.emincingoz.alzheimerdiagnosisservice.manager.doctor;

import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.DataResult;
import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.SuccessDataResult;
import com.emincingoz.alzheimerdiagnosisservice.domain.enums.UserRolesEnum;
import com.emincingoz.alzheimerdiagnosisservice.domain.model.User;
import com.emincingoz.alzheimerdiagnosisservice.domain.responses.doctor.PatientsGetResponse;
import com.emincingoz.alzheimerdiagnosisservice.repository.IDoctorRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.management.InstanceNotFoundException;

import com.emincingoz.alzheimerdiagnosisservice.domain.responses.doctor.PredictionResultResponse;
import com.emincingoz.alzheimerdiagnosisservice.manager.questionForm.IUserFormQuestionService;
import com.emincingoz.alzheimerdiagnosisservice.manager.user.IUserService;
import com.emincingoz.alzheimerdiagnosisservice.domain.responses.FormQuestionGetResponse;
import com.emincingoz.alzheimerdiagnosisservice.core.utils.results.Result;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class DoctorManager implements IDoctorService {

    private final IDoctorRepository doctorRepository;

    private final IUserService userService;

    private final IUserFormQuestionService userFormQuestionService;

    private final ModelMapper modelMapper;

    private static final String imageDirectory = System.getProperty("user.dir") + "/images/";

    @Value("${prediction-service.upload-mri-uri}")
    private String sendImageToPredictionServiceUri;

    @Override
    public ResponseEntity<?> uploadMRIImageFromClient(MultipartFile file, String name) {

        makeDirectoryIfNotExist();

        Path fileNamePath = Paths.get(imageDirectory,
                name.concat(".").concat(FilenameUtils.getExtension(file.getOriginalFilename())));
        try {
            Files.write(fileNamePath, file.getBytes());
            PredictionResultResponse pred;
            pred = sendUploadedImageToPredictionService(file, String.valueOf(fileNamePath));
            SuccessDataResult dataResult2 = new SuccessDataResult(pred);
            return new ResponseEntity<>(dataResult2, HttpStatus.CREATED);
        } catch (
                IOException ex) {
            return new ResponseEntity<>("Image is not uploaded", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public DataResult getAllPatients() {

        List<User> patientList = doctorRepository.findAllByRole(UserRolesEnum.PATIENT);

        List<PatientsGetResponse> patientsGetResponses = modelMapper.map(patientList, new TypeToken<List<PatientsGetResponse>>() {
        }.getType());

        System.out.println(patientsGetResponses.toString());

        return new SuccessDataResult(patientsGetResponses);
    }

    @Override
    public Result getPatientForms(String patientTckn) throws InstanceNotFoundException {

        List<FormQuestionGetResponse> response = userFormQuestionService.getAllQuestionByUserTckn(patientTckn);

        return new SuccessDataResult<>(response);
    }

    private void makeDirectoryIfNotExist() {
        File directory = new File(imageDirectory);
        if (!directory.exists()) {
            directory.mkdir();
        }
    }

    private PredictionResultResponse sendUploadedImageToPredictionService(MultipartFile file, String fileNamePath) throws IOException {
        File f = new File(fileNamePath);
        file.transferTo(f);

        FileSystemResource fileSystemResource = new FileSystemResource(f);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", fileSystemResource);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        RestTemplate template = new RestTemplate();
        ResponseEntity<String> response = template.postForEntity(sendImageToPredictionServiceUri, requestEntity, String.class);

        System.out.println("response: " + response);

        // Delete image file
        f.delete();

        PredictionResultResponse pred;
        String res = "";
        res = response.getBody();
        assert res != null;
        pred = predictionResultParser(res);
        System.out.println("name: " + pred.getPredClassName());
        System.out.println("value: " + pred.getPredValue());
        return pred;
    }

    private PredictionResultResponse predictionResultParser(String res) {
        StringBuilder predName = new StringBuilder();
        StringBuilder predValueS = new StringBuilder();
        for (int i = 0; i < res.length(); i++) {
            if (res.charAt(i) == 'n' && res.charAt(i + 1) == 'a') {
                for (int j = i + 7; j < res.length(); j++) {
                    if (res.charAt(j) == '"')
                        break;
                    else
                        predName.append(res.charAt(j));
                }
            }
        }
        for (int i = 0; i < res.length(); i++) {
            if (res.charAt(i) == 'v' && res.charAt(i + 1) == 'a') {
                for (int j = i + 7; j < res.length(); j++) {
                    if (res.charAt(j) == '}')
                        break;
                    else
                        predValueS.append(res.charAt(j));
                }
            }
        }
        double predValueD = 0.0;
        predValueD = Double.parseDouble(predValueS.toString());
        PredictionResultResponse pred = new PredictionResultResponse("", 0.0);
        pred.setPredClassName(predName.toString());
        pred.setPredValue(predValueD);
        return pred;
    }
}
