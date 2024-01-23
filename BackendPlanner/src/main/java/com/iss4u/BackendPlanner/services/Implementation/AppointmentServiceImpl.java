package com.iss4u.BackendPlanner.services.Implementation;

import com.iss4u.BackendPlanner.entities.Appointment.Appointment;
import com.iss4u.BackendPlanner.entities.Appointment.CategoryAppoint;
import com.iss4u.BackendPlanner.entities.Patient;
import com.iss4u.BackendPlanner.entities.Staff.Staff;
import com.iss4u.BackendPlanner.repositories.AppointmentRepository;
import com.iss4u.BackendPlanner.repositories.StaffRepository;
import com.iss4u.BackendPlanner.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;

    private final StaffRepository staffRepository;

    @Autowired
    public AppointmentServiceImpl(AppointmentRepository appointmentRepository, StaffRepository staffRepository) {
        this.appointmentRepository = appointmentRepository;
        this.staffRepository = staffRepository;
    }

    @Override
        public List<Appointment> retrieveAppointment() {
            return appointmentRepository.findAll();
        }
    @Override

        public Optional<Appointment> getAppointmentById(Long id) {
            return appointmentRepository.findById(id);
        }


    @Override

    public void create(Appointment appointment) {

        appointmentRepository.save(appointment);

}
    public void createUrgent(Appointment appointment) {

        List<Appointment> appointmentsDate = new ArrayList<>();

        List<Appointment> appointments = appointmentRepository.findAll();
        for (Appointment app : appointments) {
            if (app.getStartDate().compareTo(appointment.getEndDate()) <= 0 && app.getEndDate().compareTo(appointment.getStartDate()) >= 0 && app.getCategoryAppoint().equals(CategoryAppoint.normal)) {
                appointmentsDate.add(app);
            }
        }

        if (!appointmentsDate.isEmpty()) {
            Appointment firstAppointment = appointmentsDate.get(0);

            firstAppointment.setStartDate(new Date());
            firstAppointment.setEndDate(new Date());

            appointmentRepository.save(appointment);
        }else{
            appointmentRepository.save(appointment);
        }

    }
    public List<Patient> findPatientsByStaffId(Long userKy){
        List<Appointment> appointments = this.appointmentRepository.findAll();
        Staff existingStaff = this.staffRepository.findById(userKy)
                .orElseThrow(() -> new EntityNotFoundException("Staff with id" + userKy+ "not found"));
        List<Patient> patients = new ArrayList<>();

        for (Appointment appointment : appointments) {
            if (appointment.getStaff() == existingStaff){
                patients.add(appointment.getPatient());
            }
        }

        return patients;

    }
    @Override

    public void updateAppointment(Long id, Appointment updatedAppointment) {
            Appointment existingAppointment = appointmentRepository.findById(id).orElse(null);
            if (existingAppointment != null) {
                // Update the fields as needed
                if(updatedAppointment.getStartDate() != null){
                    existingAppointment.setStartDate(updatedAppointment.getStartDate());
                }

                if(updatedAppointment.getEndDate() != null){
                    existingAppointment.setEndDate(updatedAppointment.getEndDate());
                }

                if(updatedAppointment.getStaff() != null){
                    existingAppointment.setStaff(updatedAppointment.getStaff());
                }

                if(updatedAppointment.getPatient() != null){
                    existingAppointment.setPatient(updatedAppointment.getPatient());
                }

                if(updatedAppointment.getDetails() != null){
                    existingAppointment.setDetails(updatedAppointment.getDetails());
                }

                if(updatedAppointment.getCategoryAppoint() != null){
                    existingAppointment.setCategoryAppoint(updatedAppointment.getCategoryAppoint());
                }

                if(updatedAppointment.getTitle() != null){
                    existingAppointment.setTitle(updatedAppointment.getTitle());
                }
                if(updatedAppointment.getStatus() != null){
                    existingAppointment.setStatus(updatedAppointment.getStatus());
                }
                
                appointmentRepository.save(existingAppointment);
            }
        }
    @Override

        public void deleteAppointment(Long id) {
            appointmentRepository.deleteById(id);
        }
    public long getAppointmentCount() {
        return appointmentRepository.count();
    }


}
