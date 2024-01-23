package com.iss4u.BackendPlanner;

import com.github.javafaker.Faker;
import com.iss4u.BackendPlanner.entities.Auth.Role;
import com.iss4u.BackendPlanner.entities.Patient;
import com.iss4u.BackendPlanner.entities.Service;
import com.iss4u.BackendPlanner.entities.Staff.Admin;
import com.iss4u.BackendPlanner.entities.Staff.Secretary;
import com.iss4u.BackendPlanner.entities.Staff.Staff;
import com.iss4u.BackendPlanner.entities.StaffGrp.StaffGroup;
import com.iss4u.BackendPlanner.entities.StaffGrp.Type;
import com.iss4u.BackendPlanner.repositories.ServiceRepository;
import com.iss4u.BackendPlanner.repositories.StaffGroupRepository;
import com.iss4u.BackendPlanner.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StaffGroupRepository staffGroupRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    public void run(String... args) {
        Faker faker = new Faker();
        LocalDate birthDate = LocalDate.of(1952, 5, 12);

        for(int i =0; i < 5; i++){
            StaffGroup staffGroup = new StaffGroup();
            staffGroup.setGroupName("Group"+i);
            staffGroup.setPrivilege(true);
            staffGroup.setType(Type.Anesthesiology);
            staffGroupRepository.save(staffGroup);
        }
        List<String> serviceNames = new ArrayList<>();
        serviceNames.add("Radiology");
        serviceNames.add("Cardiology");
        serviceNames.add("Dermatology");
        serviceNames.add("Psychiatry");
        serviceNames.add("Surgery");

        List<Service> services = new ArrayList<>();
        for (String serviceName : serviceNames) {
            Service service = new Service();
            service.setServiceNm(serviceName);
            service.setServiceUnxTmCrt(new Date());
            service.setServiceUnxTmUpdt(new Date());
            service.setServiceRcrdSts(1);
            services.add(service);
        }
        serviceRepository.saveAll(services);

        List<String> maleStaffImages = Arrays.asList(
                "https://c8.alamy.com/compfr/cyw8b2/de-poils-la-peau-sombre-doctor-posing-with-arms-folded-cyw8b2.jpg",
                "https://img.freepik.com/free-photo/portrait-professional-medical-worker-posing-picture-with-arms-folded_1098-19293.jpg",
                "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX4661529.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDLVsBrwDDoY-aRkiCvCxAFSz0r7nikoQkOSy_kZCOirqB5C2gAI_HU0ec1Qyq6GILpc&usqp=CAU",
                "https://thumbs.dreamstime.com/b/happy-young-male-doctor-man-smile-handsome-15357662.jpg",
                "https://thumbs.dreamstime.com/b/smiling-doctor-professor-stethoscope-healthcare-medicine-concept-standing-36736599.jpg"
);
        List<String> femaleStaffImages = Arrays.asList(
                "https://thumbs.dreamstime.com/z/femme-de-docteur-35581032.jpg",
                "https://c8.alamy.com/compfr/c0128g/hauts-femme-medecin-isole-sur-fond-blanc-c0128g.jpg",
                "https://previews.123rf.com/images/akkamulator/akkamulator1706/akkamulator170603296/80449745-une-jeune-femme-docteur-remplit-la-forme-m%C3%A9dicale-et-pointe-vers-la-zone-d-espace-de-copie-de.jpg",
                "https://us.123rf.com/450wm/kuprevich/kuprevich1809/kuprevich180900237/108883544-une-belle-femme-m%C3%A9decin-souriante-r%C3%A9digeant-un-rapport-m%C3%A9dical.jpg?ver=6",
                "https://previews.123rf.com/images/limonzest/limonzest1111/limonzest111100219/11287813-mujer-mayor-del-doctor-en-blanco-con-estetoscopio-retrato-profesional.jpg",
                "https://previews.123rf.com/images/gstockstudio/gstockstudio1602/gstockstudio160200395/52407151-confiant-et-belle-jeune-femme-m%C3%A9decin-doctor-beautiful-ajustant-ses-lunettes-et-regardant-la-cam%C3%A9ra.jpg"
                // ... Add URLs or paths for other female patient images
        );

        for (int i = 0; i < 10; i++) {
            Staff staff = new Staff();
            staff.setGender(faker.options().option("Male", "Female"));

            // Choose the appropriate image based on the patient's gender
            String staffImage = (staff.getGender().equals("Male")) ?
                    maleStaffImages.get(i % maleStaffImages.size()) :
                    femaleStaffImages.get(i % femaleStaffImages.size());

            staff.setUserImage(staffImage);
            staff.setLastName(faker.name().lastName());
            staff.setFirstName(faker.name().firstName());
            staff.setMaidenName(faker.name().lastName());
            staff.setBirthDate(birthDate);
            staff.setGender(faker.options().option("Male", "Female"));
            staff.setCvlStatus(faker.options().option("Single", "Married", "Divorced"));
            staff.setNationality(faker.address().country());
            staff.setProfessionalEmail(faker.internet().emailAddress());
            //staff.setIdentifier(faker.internet().ide);
            staff.setAdresse(faker.address().city());
            staff.setLogin(staff.getProfessionalEmail());
            staff.setPassword("password1");

            List<String> specialityList = Arrays.asList("Radiologist", "Cardiologist", "Dermatologist", "Psychologist", "Surgery");

            Random random = new Random();
            String randomSpeciality = specialityList.get(random.nextInt(specialityList.size()));

            staff.setSpeciality(randomSpeciality);



            // Fetch a subset of predefined services (e.g., first 3 services)
            List<Service> servicesList = new ArrayList<>(services.subList(0, 2));

            staff.setServices(servicesList);

            userRepository.save(staff);
        }


        List<String> malePatientImages = Arrays.asList(
                "https://images.pexels.com/photos/3075517/pexels-photo-3075517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://static.vecteezy.com/ti/photos-gratuite/p2/897964-portrait-homme-noir-photo.jpg",
                "https://st.depositphotos.com/1715570/2349/i/450/depositphotos_23493623-stock-photo-handsome-young-man.jpg",
                "https://previews.123rf.com/images/boarding1now/boarding1now1309/boarding1now130900091/22218862-portrait-d-un-vieil-homme-%C3%A2g%C3%A9-retrait%C3%A9-et-heureux.jpg",
                "https://img.freepik.com/photos-gratuite/jeune-homme-barbu-portant-chemise_273609-5938.jpg"
        );

        List<String> femalePatientImages = Arrays.asList(
                "https://static.vecteezy.com/ti/photos-gratuite/p2/705318-portrait-de-belle-souriante-vieille-femme-photo.jpg",
                "https://img.freepik.com/photos-gratuite/portrait-belle-femme-blonde-mature_144627-30939.jpg",
                "https://thumbs.dreamstime.com/b/femme-d-affaires-moderne-portrait-36986968.jpg",
                "https://img.freepik.com/photos-gratuite/enthousiaste-femme-peau-sombre-souriant-largement-se-rejouissant-sa-victoire-dans-competition-entre-jeunes-ecrivains-debout-isolee-contre-mur-gris-concept-personnes-succes-jeunesse-bonheur_273609-1246.jpg",
                "https://previews.123rf.com/images/vbaleha/vbaleha1605/vbaleha160500191/58763718-portrait-de-vieille-femme-souriante-%C3%A0-la-maison.jpg",
                "https://img.freepik.com/photos-premium/portrait-petite-fille-souriante_911620-705.jpg?w=2000",
                "https://img.freepik.com/photos-premium/portrait-petite-fille-debout-exterieur_762026-53234.jpg"
                // ... Add URLs or paths for other female patient images
        );

        for (int i = 0; i < 10; i++) {
            Patient patient = new Patient();
            patient.setGender(faker.options().option("Male", "Female"));

            // Choose the appropriate image based on the patient's gender
            String patientImage = (patient.getGender().equals("Male")) ?
                    malePatientImages.get(i % malePatientImages.size()) :
                    femalePatientImages.get(i % femalePatientImages.size());

            patient.setUserImage(patientImage);
            patient.setLastName(faker.name().lastName());
            patient.setFirstName(faker.name().firstName());
            patient.setMaidenName(faker.name().lastName());
            patient.setBirthDate(birthDate);
          //  patient.setGender(faker.options().option("Male", "Female"));
            patient.setEmail(faker.internet().emailAddress());
            patient.setPhoneNumber("12345678");
            userRepository.save(patient);
        }

        Admin admin = new Admin();
        admin.setUserImage("https://www.admin.ch/gov/fr/accueil/conseil-federal/membres-du-conseil-federal/_jcr_content/par/teaser_489118204/image.imagespooler.jpg/1672245281853/221231-admin-Bundespraesident-1920x1080-RZ01-a.jpg");
        admin.setLastName(faker.name().lastName());
        admin.setFirstName(faker.name().firstName());
        admin.setMaidenName(faker.name().lastName());
        admin.setBirthDate(birthDate);
        admin.setGender(faker.options().option("Male", "Female"));
        admin.setEmail(faker.internet().emailAddress());
        admin.setLogin(admin.getEmail());
        admin.setPassword("password1");
        userRepository.save(admin);

        Secretary secretary = new Secretary();
        secretary.setUserImage("https://i.ebayimg.com/images/g/AyIAAOSwf1BiL9Mc/s-l1200.jpg");
        secretary.setLastName(faker.name().lastName());
        secretary.setFirstName(faker.name().firstName());
        secretary.setMaidenName(faker.name().lastName());
        secretary.setBirthDate(birthDate);
        secretary.setGender(faker.options().option("Male", "Female"));
        secretary.setEmail(faker.internet().emailAddress());
        secretary.setLogin(secretary.getEmail());
        secretary.setPassword("password1");

        List<String> serviceList = Arrays.asList("Radiology", "Cardiology", "Dermatology", "Psychology", "Surgery");

        Random random = new Random();
        String randomService = serviceList.get(random.nextInt(serviceList.size()));

        secretary.setService(randomService);

        userRepository.save(secretary);

    }
}