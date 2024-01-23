package com.iss4u.BackendPlanner.services;

import com.iss4u.BackendPlanner.entities.Appointment.Appointment;
import com.iss4u.BackendPlanner.entities.Patient;

import java.util.List;
import java.util.Optional;

public interface AppointmentService {
    void create(Appointment appointment);
    void createUrgent(Appointment appointment);

    List<Appointment> retrieveAppointment();

    Optional<Appointment> getAppointmentById(Long id);

    void updateAppointment(Long id, Appointment updatedAppointment);

    void deleteAppointment(Long id);
     long getAppointmentCount();

    List<Patient> findPatientsByStaffId(Long staffId);


}
