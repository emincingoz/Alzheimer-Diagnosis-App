package com.emincingoz.alzheimerdiagnosisservice.config;

import com.emincingoz.alzheimerdiagnosisservice.domain.model.FormQuestion;
import com.emincingoz.alzheimerdiagnosisservice.repository.IFormQuestionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
@Configuration
public class FormQuestionConfig {
    @Bean
    CommandLineRunner commandLineRunner(IFormQuestionRepository formQuestionRepository) {
        return args -> {
            FormQuestion question1 = new FormQuestion(1l, "Yeni Öğrendiğiniz Bilgileri Hatırlamakta Güçlük Çekiyor musunuz?");
            FormQuestion question2 = new FormQuestion(2l, "Plan Yapmakta ve Hesaplama Yapmakta Zorlandığınızı Düşünüyor musunuz?");
            FormQuestion question3 = new FormQuestion(3l, "Normalde Rahatlıkla Yaptığınız İşleri Tamamlayamıyor musunuz?");
            FormQuestion question4 = new FormQuestion(4l, "Tarih, Mevsim, Bulunduğunuz Yer gibi Konuları Takip Edebiliyor musunuz?");
            FormQuestion question5 = new FormQuestion(5l, "Kitap Okurken veya Bir Şeylere Bakarken Renkleri Ayırt Etmekte Zorlanıyor musunuz?");
            FormQuestion question6 = new FormQuestion(6l, "Tanıdığınız İnsanlarla Sohbet Ederken Doğru Kelimeleri Bulmakta Zorlanıyor musunuz?");
            FormQuestion question7 = new FormQuestion(7l, "Eşyalarınızı Sık Sık Kaybettiğiniz Oluyor mu?");
            FormQuestion question8 = new FormQuestion(8l, "Karar Vermekte Zorlanıyor musunuz?");
            FormQuestion question9 = new FormQuestion(9l, "Sosyal Aktivitelerden Sık Sık Uzaklaştığınız Oluyor mu?");
            FormQuestion question10 = new FormQuestion(10l, "Kendinizi, Şüpheci veya Korku İçerisinde Olarak Nitelendirebilir misiniz?");
            FormQuestion question11 = new FormQuestion(11l, "Kullanmayı Bildiğiniz Bir Cihazı Kullanmakta Sıkıntı Yaşıyormusunuz?");
            FormQuestion question12 = new FormQuestion(12l, "Daha Önce Alzheimer Tanısı Konulan Herhangi Bir Yakınınız Var mı?");

            formQuestionRepository.saveAll(List.of(question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12));
        };
    }
}
