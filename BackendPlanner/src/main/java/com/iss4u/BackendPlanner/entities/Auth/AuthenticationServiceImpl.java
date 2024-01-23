package com.iss4u.BackendPlanner.entities.Auth;

import com.iss4u.BackendPlanner.entities.Staff.Admin;
import com.iss4u.BackendPlanner.entities.Staff.Secretary;
import com.iss4u.BackendPlanner.entities.Staff.Staff;
import com.iss4u.BackendPlanner.services.AdminService;
import com.iss4u.BackendPlanner.services.SecretaryService;
import com.iss4u.BackendPlanner.services.StaffService;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final StaffService staffService;
    private final SecretaryService secretaryService;
    private final AdminService adminService;

    public AuthenticationServiceImpl(StaffService staffService, SecretaryService secretaryService, AdminService adminService) {

        this.staffService = staffService;
        this.secretaryService = secretaryService;
        this.adminService = adminService;
    }


    @Override
    public AuthResponseDTO getByLoginAndPasswordAndRole(AuthDTO authdata) {
        AuthResponseDTO authReponse = null;
        if (authdata.getRole() != null) {
            switch (authdata.getRole()) {
                case Doctor:
                    Optional<Staff> optDoctor = staffService.getByLoginAndPassword(authdata.getLogin(), authdata.getPassword());
                    if (optDoctor.isPresent()) {
                        Staff doctor = optDoctor.get();
                        authReponse = AuthResponseDTO.builder().role(authdata.getRole()).id(doctor.getUserKy()).img(doctor.getUserImage())
                                .firstName(doctor.getFirstName()).lastName(doctor.getLastName())
                                .email(doctor.getProfessionalEmail()).gender(doctor.getGender()).birthDate(doctor.getBirthDate())
                                .build();

                    }

                    break;
                case Secretary:
                    Optional<Secretary> optSecretary = secretaryService.getByLoginAndPassword(authdata.getLogin(), authdata.getPassword());
                    if (optSecretary.isPresent()) {
                        Secretary secretary = optSecretary.get();
                        authReponse = AuthResponseDTO.builder().role(authdata.getRole()).id(secretary.getUserKy()).img(secretary.getUserImage())
                                .firstName(secretary.getFirstName()).lastName(secretary.getLastName()) .service(secretary.getService())
                                .email(secretary.getEmail()).gender(secretary.getGender()).birthDate(secretary.getBirthDate())
                                .build();
                    }

                    break;
                case Admin:
                    Optional<Admin> optAdmin = adminService.getByLoginAndPassword(authdata.getLogin(), authdata.getPassword());
                    if (optAdmin.isPresent()) {
                        Admin admin = optAdmin.get();
                        authReponse = AuthResponseDTO.builder().role(authdata.getRole()).id(admin.getUserKy()).img(admin.getUserImage())
                                .firstName(admin.getFirstName()).lastName(admin.getLastName())
                                .email(admin.getEmail()).gender(admin.getGender()).birthDate(admin.getBirthDate())
                                .build();
                    }


                default:

            }
        }
        return authReponse;
    }
}
