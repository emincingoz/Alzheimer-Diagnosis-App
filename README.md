# Alzheimer Diagnosis App

**Project**

1. Swagger Url: `http://localhost:8080/swagger-ui/`
2. Fastapi Service Swagger Url: `http://127.0.0.1/docs`

## Folder Structure
<!--
https://tree.nathanfriend.io/?s=(%27options!(%27fancy!true~fullPath!false~trailingSlash!true~rootDot!false)~source!(%27source!%27Alzheimer-Diagnosis-App%3Bpred-s<HmodelH9prototype_model.h5Hload_model.pyHmain.pyHpred_model.pyHpredict.pyHrequirements.txtH%5E9%20%7C%20%3Bs<Hbuild%2FHgradle%2FHsrcH9main6java69com.emincingoz.alzheimerdiagnosiss<6*config6*9ZConfigG9SwaggerConfigG9WebSecurityConfigG9WebSocketConfigGcontroller6*9Activity%23ct%269Admin%269A%24Rest%269Chat%269%3A%269%25%269%7F%269%7FZ%26core6*9utils6**results6**9Data%5B9ErrorData%5B9Error%5B9%5B9SuccessData%5B9Success%5BBusinessRulesGdomain6*9dtos6**a%246**9RefreshTokenDTOG*9TokenDTOG*email6**9EmailDTOG*userZ6**9List%7FFormQUestionDTOG9enums6**%7FRolesEnumG9model6**A>G*AuthorityG*ZG*MessXG*%7FG*%7FAuthorityG*%7FZG9requests6**activeMessXRequest%2F6**admin%2F6**a%24%2F6**userZ%2F6*9responses6**a>%2F6**doctor%2F6**patient%2F6**user%2F6*infrastructure6*9n%2Bator6**fake6**9FakeN%2BatorG*kpspublc6**9KPSPublicN%2BatorG*NationalityPeopleModelG*N%2BtorGmanXr6*9a>6**IA>%60A>%7B9admin6**IAdmin%60Admin%7B*Admin%23ntsG9a%246**IA%24%60A%24%7B*A%24%23ntsG9doctor6**I%3A%60%3A%7B*%3A%23ntsG9email6**IEmail%60Email%7B9patient6**I%25%60%25%7B*%25%23ntsG9questionForm6**I%7FZ%60%7FZMAnXrG9user6**I%7F%60%7F%7B*%7FManXrContantsGrepository6*9IA>RespositoryG9IAdmin%2C%3A%2CZ%2C%25%2C%7FZ%2C%7FAuthority%2C%7FRepositoryGsecurity6*9s<6**%5DS<G9JwtA%24EntryPointG9JwtAuthorizationTokenFilterG9JwtTokenProviderG9%5DG9%5DFactoryGAlzheimerDiagnosisS<Application.java6resources69db6*changelog6*920226**106**920"**921"**116**910"**920"**126**904"**917"*920236**016**908"*liquibase"9application.yml69banner.txtH9test%2F%7CH%5EHbuild.gradleHgradlew.batHgradlewHsettings.gradle%3BuiHnode_modules%2FHpublic%2FHsrcH9assets6imXs%2FH9components6admin%3F%3D%40%3DNew%3A%40%3D%25s%40%3DTopBar.css69%3DY9%3DAnasayfaY9%3D%3AsY9%3DNew%3AY9%3D%25sY9%3DTopBarYauthneitcation%3FLogin%40Register.css69LoginY9RegisterYdoctor%3F%3APX%40%3APXMessX%40%3APXTeshis%40%3APXTopBar%40My%25s.css69%3APXY9%3APXMessXY9%3APXTeshisY9%3APXTopBarY9%3A%7D9My%25sYpatient%3F%25PX%40%25PXForm%40%25PXMessX.css69ZY9MessXBubbleY9%23ctY9%25PXY9%25PXAnasayfaY9%25PXFormY9%25PXMessX.js69%25PXTopBarY9%25%7DCustomTextFieldYCustomUpdateModalYDialogBodyAndFooterYLayoutYMissingYRequireAuthY%7DUnauthorized.jsxH9hooks6useAuth.jsH9s<s6axios.jsH9styles%2FH9App.cssH9App.jsxH9index.cssH9index.jsx%7CH%5EHpackX.jsonHpackX-lock.jsonHREADME.md%5Cn9integrationsHpostgresqlH9%5EH9init.sqlH.dockerignoreHdocker-compose-dev.ymlHdocker-compose-up.bat%5Cn9README.md%27)~version!%271%27)*996H*9%20%20G.java6*H%5Cn*XageY.jsx6ZFormQuestion"-changelog.xml6%23MessXConta%24uthentication%25Patient%26ControllerG%2BationalityPeopleValid%2CRepositoryG9I%3ADoctor%3B%5Cn9alzheimer-diagnosis-<ervice%3DAdminPX>ctive%23ct%3F-pX69styles6*%40.css6*%5BResultG*%5DJwt%7FDetails%5EDockerfile%60S<G*%7BManXrG%7CH.gitignore%7DSettingsPXY%7FUser%01%7F%7D%7C%7B%60%5E%5D%5B%40%3F>%3D<%3B%3A%2C%2B%26%25%24%23"ZYXHG96*
-->

``` plaintext

Alzheimer-Diagnosis-App/
├── alzheimer-diagnosis-pred-service/
│   ├── model/
│   │   └── prototype_model.h5
│   ├── load_model.py
│   ├── main.py
│   ├── pred_model.py
│   ├── predict.py
│   ├── requirements.txt
│   ├── Dockerfile   
│   └── .gitignore 
├── alzheimer-diagnosis-service/
│   ├── build/
│   ├── gradle/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com.emincingoz.alzheimerdiagnosisservice/
│   │   │   │       ├── config/
│   │   │   │       │   ├── FormQuestionConfig.java
│   │   │   │       │   ├── SwaggerConfig.java
│   │   │   │       │   ├── WebSecurityConfig.java
│   │   │   │       │   └── WebSocketConfig.java
│   │   │   │       ├── controller/
│   │   │   │       │   ├── ActivityMessageContactController.java
│   │   │   │       │   ├── AdminController.java
│   │   │   │       │   ├── AuthenticationRestController.java
│   │   │   │       │   ├── ChatController.java
│   │   │   │       │   ├── DoctorController.java
│   │   │   │       │   ├── PatientController.java
│   │   │   │       │   ├── UserController.java
│   │   │   │       │   └── UserFormQuestionController.java
│   │   │   │       ├── core/
│   │   │   │       │   └── utils/
│   │   │   │       │       ├── results/
│   │   │   │       │       │   ├── DataResult.java
│   │   │   │       │       │   ├── ErrorDataResult.java
│   │   │   │       │       │   ├── ErrorResult.java
│   │   │   │       │       │   ├── Result.java
│   │   │   │       │       │   ├── SuccessDataResult.java
│   │   │   │       │       │   └── SuccessResult.java
│   │   │   │       │       └── BusinessRules.java
│   │   │   │       ├── domain/
│   │   │   │       │   ├── dtos/
│   │   │   │       │   │   ├── authentication/
│   │   │   │       │   │   │   ├── RefreshTokenDTO.java
│   │   │   │       │   │   │   └── TokenDTO.java
│   │   │   │       │   │   ├── email/
│   │   │   │       │   │   │   └── EmailDTO.java
│   │   │   │       │   │   └── userFormQuestion/
│   │   │   │       │   │       └── ListUserFormQUestionDTO.java
│   │   │   │       │   ├── enums/
│   │   │   │       │   │   └── UserRolesEnum.java
│   │   │   │       │   ├── model/
│   │   │   │       │   │   ├── ActiveMessageContact.java
│   │   │   │       │   │   ├── Authority.java
│   │   │   │       │   │   ├── FormQuestion.java
│   │   │   │       │   │   ├── Message.java
│   │   │   │       │   │   ├── User.java
│   │   │   │       │   │   ├── UserAuthority.java
│   │   │   │       │   │   └── UserFormQuestion.java
│   │   │   │       │   ├── requests/
│   │   │   │       │   │   ├── activeMessageRequest/
│   │   │   │       │   │   ├── admin/
│   │   │   │       │   │   ├── authentication/
│   │   │   │       │   │   └── userFormQuestion/
│   │   │   │       │   └── responses/
│   │   │   │       │       ├── activeMessageContact/
│   │   │   │       │       ├── doctor/
│   │   │   │       │       ├── patient/
│   │   │   │       │       └── user/
│   │   │   │       ├── infrastructure/
│   │   │   │       │   └── nationalityPeopleValidator/
│   │   │   │       │       ├── fake/
│   │   │   │       │       │   └── FakeNationalityPeopleValidator.java
│   │   │   │       │       ├── kpspublc/
│   │   │   │       │       │   └── KPSPublicNationalityPeopleValidator.java
│   │   │   │       │       ├── NationalityPeopleModel.java
│   │   │   │       │       └── NationalityPeopleValidtor.java
│   │   │   │       ├── manager/
│   │   │   │       │   ├── activeMessageContact/
│   │   │   │       │   │   ├── IActiveMessageContactService.java
│   │   │   │       │   │   └── ActiveMessageContactManager.java
│   │   │   │       │   ├── admin/
│   │   │   │       │   │   ├── IAdminService.java
│   │   │   │       │   │   ├── AdminManager.java
│   │   │   │       │   │   └── AdminMessageContants.java
│   │   │   │       │   ├── authentication/
│   │   │   │       │   │   ├── IAuthenticationService.java
│   │   │   │       │   │   ├── AuthenticationManager.java
│   │   │   │       │   │   └── AuthenticationMessageContants.java
│   │   │   │       │   ├── doctor/
│   │   │   │       │   │   ├── IDoctorService.java
│   │   │   │       │   │   ├── DoctorManager.java
│   │   │   │       │   │   └── DoctorMessageContants.java
│   │   │   │       │   ├── email/
│   │   │   │       │   │   ├── IEmailService.java
│   │   │   │       │   │   └── EmailManager.java
│   │   │   │       │   ├── patient/
│   │   │   │       │   │   ├── IPatientService.java
│   │   │   │       │   │   ├── PatientManager.java
│   │   │   │       │   │   └── PatientMessageContants.java
│   │   │   │       │   ├── questionForm/
│   │   │   │       │   │   ├── IUserFormQuestionService.java
│   │   │   │       │   │   └── UserFormQuestionMAnager.java
│   │   │   │       │   └── user/
│   │   │   │       │       ├── IUserService.java
│   │   │   │       │       ├── UserManager.java
│   │   │   │       │       └── UserManagerContants.java
│   │   │   │       ├── repository/
│   │   │   │       │   ├── IActiveMessageContactRespository.java
│   │   │   │       │   ├── IAdminRepository.java
│   │   │   │       │   ├── IDoctorRepository.java
│   │   │   │       │   ├── IFormQuestionRepository.java
│   │   │   │       │   ├── IPatientRepository.java
│   │   │   │       │   ├── IUserFormQuestionRepository.java
│   │   │   │       │   ├── IUserAuthorityRepository.java
│   │   │   │       │   └── IUserRepository.java
│   │   │   │       ├── security/
│   │   │   │       │   ├── service/
│   │   │   │       │   │   └── JwtUserDetailsService.java
│   │   │   │       │   ├── JwtAuthenticationEntryPoint.java
│   │   │   │       │   ├── JwtAuthorizationTokenFilter.java
│   │   │   │       │   ├── JwtTokenProvider.java
│   │   │   │       │   ├── JwtUserDetails.java
│   │   │   │       │   └── JwtUserDetailsFactory.java
│   │   │   │       └── AlzheimerDiagnosisServiceApplication.java
│   │   │   └── resources/
│   │   │       ├── db/
│   │   │       │   ├── changelog/
│   │   │       │   │   ├── 2022/
│   │   │       │   │   │   ├── 10/
│   │   │       │   │   │   │   ├── 20-changelog.xml
│   │   │       │   │   │   │   └── 21-changelog.xml
│   │   │       │   │   │   ├── 11/
│   │   │       │   │   │   │   ├── 10-changelog.xml
│   │   │       │   │   │   │   └── 20-changelog.xml
│   │   │       │   │   │   └── 12/
│   │   │       │   │   │       ├── 04-changelog.xml
│   │   │       │   │   │       └── 17-changelog.xml
│   │   │       │   │   └── 2023/
│   │   │       │   │       └── 01/
│   │   │       │   │           └── 08-changelog.xml
│   │   │       │   └── liquibase-changelog.xml
│   │   │       ├── application.yml
│   │   │       └── banner.txt
│   │   └── test/
│   ├── .gitignore
│   ├── Dockerfile
│   ├── build.gradle
│   ├── gradlew.bat
│   ├── gradlew
│   └── settings.gradle
├── alzheimer-diagnosis-ui/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   └── images/
│   │   ├── components/
│   │   │   ├── admin-page/
│   │   │   │   ├── styles/
│   │   │   │   │   ├── AdminPage.css
│   │   │   │   │   ├── AdminPageNewDoctor.css
│   │   │   │   │   ├── AdminPagePatients.css
│   │   │   │   │   └── AdminPageTopBar.css
│   │   │   │   ├── AdminPage.jsx
│   │   │   │   ├── AdminPageAnasayfa.jsx
│   │   │   │   ├── AdminPageDoctors.jsx
│   │   │   │   ├── AdminPageNewDoctor.jsx
│   │   │   │   ├── AdminPagePatients.jsx
│   │   │   │   └── AdminPageTopBar.jsx
│   │   │   ├── authneitcation-page/
│   │   │   │   ├── styles/
│   │   │   │   │   ├── Login.css
│   │   │   │   │   └── Register.css
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── doctor-page/
│   │   │   │   ├── styles/
│   │   │   │   │   ├── DoctorPage.css
│   │   │   │   │   ├── DoctorPageMessage.css
│   │   │   │   │   ├── DoctorPageTeshis.css
│   │   │   │   │   ├── DoctorPageTopBar.css
│   │   │   │   │   └── MyPatients.css
│   │   │   │   ├── DoctorPage.jsx
│   │   │   │   ├── DoctorPageMessage.jsx
│   │   │   │   ├── DoctorPageTeshis.jsx
│   │   │   │   ├── DoctorPageTopBar.jsx
│   │   │   │   ├── DoctorSettingsPage.jsx
│   │   │   │   └── MyPatients.jsx
│   │   │   ├── patient-page/
│   │   │   │   ├── styles/
│   │   │   │   │   ├── PatientPage.css
│   │   │   │   │   ├── PatientPageForm.css
│   │   │   │   │   └── PatientPageMessage.css
│   │   │   │   ├── FormQuestion.jsx
│   │   │   │   ├── MessageBubble.jsx
│   │   │   │   ├── MessageContact.jsx
│   │   │   │   ├── PatientPage.jsx
│   │   │   │   ├── PatientPageAnasayfa.jsx
│   │   │   │   ├── PatientPageForm.jsx
│   │   │   │   ├── PatientPageMessage.js
│   │   │   │   ├── PatientPageTopBar.jsx
│   │   │   │   └── PatientSettingsPage.jsx
│   │   │   ├── CustomTextField.jsx
│   │   │   ├── CustomUpdateModal.jsx
│   │   │   ├── DialogBodyAndFooter.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Missing.jsx
│   │   │   ├── RequireAuth.jsx
│   │   │   ├── SettingsPage.jsx
│   │   │   └── Unauthorized.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── services/
│   │   │   └── axios.js
│   │   ├── styles/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── index.jsx
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
├── integrations/
│   ├── postgresql/
│   │   ├── Dockerfile
│   │   └── init.sql
│   ├── .dockerignore
│   ├── docker-compose-dev.yml
│   └── docker-compose-up.bat
└── README.md

```
