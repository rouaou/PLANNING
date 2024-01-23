package com.iss4u.BackendPlanner.repositories;

import com.iss4u.BackendPlanner.entities.Appointment.Appointment;
import com.iss4u.BackendPlanner.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}

