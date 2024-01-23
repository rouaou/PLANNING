package com.iss4u.BackendPlanner.services.Implementation;
import com.iss4u.BackendPlanner.entities.Patient;
import com.iss4u.BackendPlanner.repositories.PatientRepository;
import com.iss4u.BackendPlanner.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Service
public class PatientServiceImpl implements PatientService {
    private final PatientRepository patientRepository;
    //inject staffRepository
    @Autowired
    public PatientServiceImpl(PatientRepository patientRepository ) {
        this.patientRepository = patientRepository;
    }

    @Override
    public Patient createPatient(Patient patient){
        patient.setUserImage("https://thumbs.dreamstime.com/b/young-doctor-16088825.jpg");

        return patientRepository.save(patient);
    }

    @Override
    public List<Patient> getAllPatients(){

        return patientRepository.findAll();
    }
    @Override

    public Optional<Patient> getPatientById(Long patientKey) {
        return patientRepository.findById(patientKey);
    }
    @Override

    public Patient updatePatient(Long patientkey,@RequestBody  Patient updatedPatient){
        Patient existingPatient = this.patientRepository.findById(patientkey)
                .orElseThrow(() -> new EntityNotFoundException("Patient with id" + patientkey+ "not found"));
        existingPatient.setFirstName(updatedPatient.getFirstName());
        existingPatient.setLastName(updatedPatient.getLastName());
        existingPatient.setGender(updatedPatient.getGender());
        existingPatient.setPhoneNumber(updatedPatient.getPhoneNumber());
        existingPatient.setBirthDate(updatedPatient.getBirthDate());




        return this.patientRepository.save(existingPatient);

    }

    @Override
    @Transactional
    public void deletePatient(Long patientkey) {

       patientRepository.deleteById(patientkey);
    }

    public long getPatientCount() {
        return patientRepository.count();
    }

}
