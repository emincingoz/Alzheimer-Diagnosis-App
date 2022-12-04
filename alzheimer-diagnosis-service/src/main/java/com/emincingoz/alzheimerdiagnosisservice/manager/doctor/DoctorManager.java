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

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorManager implements IDoctorService {

    private final IDoctorRepository doctorRepository;

    private final ModelMapper modelMapper;

    private static final String imageDirectory = System.getProperty("user.dir") + "/images/";

    @Value("${prediction-service.upload-mri-uri}")
    private String sendImageToPredictionServiceUri;

    @Override
    public ResponseEntity<?> uploadMRIImageFromClient(MultipartFile file, String name) {

        makeDirectoryIfNotExist(imageDirectory);

        Path fileNamePath = Paths.get(imageDirectory,
                name.concat(".").concat(FilenameUtils.getExtension(file.getOriginalFilename())));
        try {
            Files.write(fileNamePath, file.getBytes());
            System.out.println("filepath: " + fileNamePath);

            sendUploadedImageToPredictionService(file, String.valueOf(fileNamePath));

            return new ResponseEntity<>(name, HttpStatus.CREATED);
        } catch (
                IOException ex) {
            return new ResponseEntity<>("Image is not uploaded", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public DataResult getAllPatients() {

        List<User> patientList = doctorRepository.findAllByRole(UserRolesEnum.PATIENT);

        List<PatientsGetResponse> patientsGetResponses = modelMapper.map(patientList, new TypeToken<List<PatientsGetResponse>>() {}.getType());

        System.out.println(patientsGetResponses.toString());

        return new SuccessDataResult(patientsGetResponses);
    }

    private void makeDirectoryIfNotExist(String imageDirectory) {
        File directory = new File(imageDirectory);
        if (!directory.exists()) {
            directory.mkdir();
        }
    }

    private void sendUploadedImageToPredictionService(MultipartFile file, String fileNamePath) throws IOException {
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
    }
}
