package com.iss4u.BackendPlanner.controllers;

import com.iss4u.BackendPlanner.entities.Patient;
import com.iss4u.BackendPlanner.services.Implementation.PatientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/patient")
public class PatientController {

    //autowired permet d'injecter service dans controller
    @Autowired
    private PatientServiceImpl patientService;

    // create patient
    @PostMapping("/createPatient")
    public Patient createPatient(@RequestBody Patient patient) {
        return patientService.createPatient(patient);

    }

    //update patient
    @PutMapping("/update/{id}")
    public  Patient updatePatient(@PathVariable (value = "id") Long patientKey, @RequestBody Patient updatedPatient) {
        Patient updated = patientService.updatePatient(patientKey, updatedPatient);
        return this.patientService.updatePatient( patientKey,updatedPatient);

    }


    // delete staff by id
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deletePatient(@PathVariable(value = "id") Long patientKey) {
        Optional<Patient> existingPatient = patientService.getPatientById(patientKey);
        if (existingPatient.isPresent()) {
            patientService.deletePatient(patientKey);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    // get all staffs
    @GetMapping("/listPatients")
    public List<Patient> getAllPatients(){

        return this.patientService.getAllPatients();
    }

    //get staff by id
    @GetMapping("/getPatient/{id}")

    public ResponseEntity<Patient> getPatientById(@PathVariable("id") Long patientKey) {
        Optional<Patient> patient = patientService.getPatientById(patientKey);
        return patient.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/count")
    public long getPatientCount() {
        return patientService.getPatientCount();
    }


}
