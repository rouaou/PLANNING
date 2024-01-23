package com.iss4u.BackendPlanner.controllers;

import com.iss4u.BackendPlanner.entities.Appointment.Appointment;
import com.iss4u.BackendPlanner.entities.Patient;
import com.iss4u.BackendPlanner.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {


        @Autowired
        private AppointmentService appointmentService;

        @GetMapping("/listAppoint")
        public List<Appointment> retrieveAppointment() {
            return appointmentService.retrieveAppointment();
        }

        @GetMapping("/getbyid/{id}")
        public ResponseEntity<Appointment> getAppointmentById(@PathVariable("id") Long id) {
            Optional<Appointment>appointment = appointmentService.getAppointmentById(id);
            return appointment.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
            }



      @PostMapping("/createAppoint")
        public ResponseEntity<Appointment> create(@RequestBody Appointment appointment) {
            appointmentService.create(appointment);
            return new ResponseEntity<>(appointment, HttpStatus.CREATED);
        }
    @PostMapping("/createUrgentAppoint")
    public ResponseEntity<Appointment> createUrgent(@RequestBody Appointment appointment) {
        appointmentService.createUrgent(appointment);
        return new ResponseEntity<>(appointment, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
        public ResponseEntity<Appointment> update(@PathVariable Long id, @RequestBody Appointment updatedAppointment) {

            try {
                appointmentService.updateAppointment(id, updatedAppointment);
                return ResponseEntity.ok().build(); // Return 200 (OK) without a body
            } catch (EntityNotFoundException ex) {
                return ResponseEntity.notFound().build();
            } catch (Exception ex) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }


        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
            appointmentService.deleteAppointment(id);
            return ResponseEntity.noContent().build();
        }
    @GetMapping("/count")
    public long getAppointmentCount() {
        return appointmentService.getAppointmentCount();
    }

    @GetMapping("/staff/patients/{userKy}")
    public List<Patient> findPatientsByStaffId(@PathVariable Long userKy) {
        return appointmentService.findPatientsByStaffId(userKy);
    }
}
