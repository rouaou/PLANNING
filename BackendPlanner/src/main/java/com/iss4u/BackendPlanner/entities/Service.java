package com.iss4u.BackendPlanner.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iss4u.BackendPlanner.entities.Appointment.Appointment;
import com.iss4u.BackendPlanner.entities.Staff.Staff;
import com.iss4u.BackendPlanner.entities.StaffGrp.StaffGroup;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Entity
@Table(name = "Service")
public class Service {

    //--- SERVICE PRIMARY KEYS
    @Id

    @Column(name="Service_Ky", nullable=false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceKy;

    //--- SERVICE DATA FIELDS
    @Column(name="Service_Nm", nullable=false)
    private String serviceNm ;

    //--- SERVICE TEMPORAL DATA
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="Service_UnxTmCrt", nullable=false)
    private Date serviceUnxTmCrt ;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="Service_UnxTmUpdt", nullable=false)
    private Date serviceUnxTmUpdt;

    @Column(name="Service_RcrdSts", nullable=false)
    private Integer serviceRcrdSts ;

    //--- SERVICE LINKS ( RELATIONSHIP )

    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL)
    private List<ServiceArea> serviceAreas ;

    @ManyToMany(mappedBy = "services")
    private List<Staff> staff = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL)
    private List<Appointment> appointments ;

    @JsonIgnore
    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL)
    private List<StaffGroup> staffGroups ;}
