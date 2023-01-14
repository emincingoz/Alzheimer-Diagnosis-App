package com.emincingoz.alzheimerdiagnosisservice.manager.email;

import com.emincingoz.alzheimerdiagnosisservice.utils.results.Result;
import com.emincingoz.alzheimerdiagnosisservice.utils.results.SuccessResult;
import com.emincingoz.alzheimerdiagnosisservice.domain.dtos.email.EmailDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@Service
public class EmailServiceManager implements IEmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;
    public String sendSimpleMail(EmailDTO emailDTO) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;
        try {
            //SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(new InternetAddress(sender, "Alzheimer Teşhis Sistemi"));
            mimeMessageHelper.setTo(emailDTO.getRecipient());
            mimeMessageHelper.setText(emailDTO.getMessageBody());
            mimeMessageHelper.setSubject(emailDTO.getSubject());

            javaMailSender.send(mimeMessage);
            return "Mail sent successfully...";
        } catch (Exception e) {
            System.out.println(e);
            return "Error while sending email...";
        }
    }

    @Override
    public Result forgotPasswordSendEmail(EmailDTO emailDTO) {
        return new SuccessResult(sendSimpleMail(emailDTO));
    }
}
