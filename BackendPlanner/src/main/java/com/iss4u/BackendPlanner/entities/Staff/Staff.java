package com.iss4u.BackendPlanner.entities.Staff;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iss4u.BackendPlanner.entities.Appointment.Appointment;
import com.iss4u.BackendPlanner.entities.Service;
import com.iss4u.BackendPlanner.entities.StaffGrpLink;
import com.iss4u.BackendPlanner.entities.StaffPassword;
import com.iss4u.BackendPlanner.entities.User.User;
import com.iss4u.BackendPlanner.entities.WorkAvailability;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "staffs")
public class Staff extends User {

    @Email
    @Column(name = "professionalEmail")
    private String professionalEmail;
    @Column(name = "ischeked")
    private boolean ischeked;
    @Size(min = 2, message = "Identifier have atleast 2 characters")
    @Column(name = "identifier")
    private String identifier;

    @Size(min = 2, message = "Initials have atleast 2 characters")
    @Column(name = "initials")
    private String initials;
    @Size(min = 2, message = "signature have atleast 2 characters")
    @Column(name = "signature")
    private String signature;

    @NotEmpty
    @Column(name = "TypeStaff")
    private String typeStaff;
    @NotEmpty
    @Column(name = "Speciality")
    private String speciality;

    @NotEmpty
    @Column(name = "adresse")
    private String adresse;
    @Size(min = 2, message = "color have atleast 2 characters")
    @Column(name = "color")
    private String color;
    @Size(min = 8)
    @Column(name = "phoneNumber")
    private Long phoneNumber;

    private boolean isAvailable;

    private String  password;



    @OneToMany(mappedBy = "staff")
  private List<StaffGrpLink> staffGrpLinks = new ArrayList<>();
    @OneToMany(mappedBy = "staff")
    @JsonIgnore
    private List<Appointment> appointments = new ArrayList<>();

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "staff_services",
            joinColumns = @JoinColumn(name = "staff_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id"))
    private List<Service> services = new ArrayList<>();

    @OneToMany(mappedBy = "staff")
    private List<StaffPassword> staffPasswords = new ArrayList<>();


    @OneToMany
    private List<WorkAvailability> availabilities = new ArrayList<>();


   /* @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL)
    private List<Planning> planningList;
*/



}

