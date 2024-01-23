package com.iss4u.BackendPlanner.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iss4u.BackendPlanner.entities.Appointment.Appointment;
import com.iss4u.BackendPlanner.entities.User.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Patient")
public class Patient extends User {

    boolean isAvailable;
    @Size(min = 8)
    @Column(name = "phoneNumber")
    private String phoneNumber;

    @Email
    @Column(name = "Email")
    private String email;
    @OneToMany(mappedBy = "patient")
    @JsonIgnore
    private List<Appointment> appointments = new ArrayList<>();
}
