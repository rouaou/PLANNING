package com.iss4u.BackendPlanner.services;

import com.iss4u.BackendPlanner.entities.Patient;

import java.util.List;
import java.util.Optional;

public interface PatientService {

        Patient createPatient(Patient patient);

        List<Patient> getAllPatients();
        Optional<Patient> getPatientById(Long patientKey);
        Patient updatePatient(Long patientKey, Patient updatedPatient);
        void deletePatient(Long patientKey);

        long getPatientCount();


}
