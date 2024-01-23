package com.iss4u.BackendPlanner.entities.Appointment;

import com.iss4u.BackendPlanner.entities.eq.Equipment;
import com.iss4u.BackendPlanner.entities.Patient;
import com.iss4u.BackendPlanner.entities.Room;
import com.iss4u.BackendPlanner.entities.Service;
import com.iss4u.BackendPlanner.entities.Staff.Staff;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;


@NoArgsConstructor
@Data
@Getter
@Setter
@Entity
@Table(name = "Appointment")
public class Appointment {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name="idAppoint")
        private Long id;

        @Column(name="title")

        private String title;
        @Column(name="StartdateAppoint")

        private Date startDate;
        @Column(name="EnddateAppoint")

        private Date endDate;
        @Column(name="detailApp")

        private String details;

        private Integer status; // 0: pending; 1: accepted by the concerned staff

        @Column(name = "Category")
        @Enumerated(EnumType.STRING)
        private CategoryAppoint categoryAppoint;
        @ManyToOne
        private Staff staff;
        @ManyToOne
        private Patient patient;
        @ManyToOne
        private Room room;
        @ManyToOne
        private Equipment equipment;
        @ManyToOne
        @JoinColumn(name = "service_ref")
        private Service service;



}
