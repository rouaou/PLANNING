package com.iss4u.BackendPlanner.entities.eq;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iss4u.BackendPlanner.entities.Appointment.Appointment;
import com.iss4u.BackendPlanner.entities.Bed;
import com.iss4u.BackendPlanner.entities.Room;
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
@Table(name = "Equipment")
public class Equipment {

    //--- EQUIPMENT PRIMARY KEYS
    @Id

    @Column(name="Eqpmnt_Ky", nullable=false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long equipmentKy;

    //--- EQUIPMENT DATA FIELDS
    @Column(name="Eqpmnt_Label", nullable=false)
    private String equipmentLabel ;

    @Column(name="Eqpmnt_Desc")
    private String description ;

    @Column(name="Eqpmnt_Type", nullable=false)
    private String equipmentType ;
    @Column(name="TypeFM")
    private String typeFM ;
    @Column(name="Eqpmnt_IPAdrs")
    private String addressIp ;

    @Column(name="Eqpmnt_MACAdrs")
    private String addressMac ;

    //--- EQUIPMENT TEMPORAL DATA
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="Eqpmnt_UnxTmCrt", nullable=false)
    private Date equipmentUnxTmCrt ;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="Eqpmnt_UnxTmUpdt", nullable=false)
    private Date equipmentUnxTmUpdt;

    @Column(name="Eqpmnt_RcrdSts", nullable=false)
    private Integer equipmentRcrdSts ;

    boolean isAvailable;

    //--- EQUIPMENT LINKS ( RELATIONSHIP )
//    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "Room_Ref")
    private Room room;

    @OneToMany(mappedBy = "equipment", cascade = CascadeType.ALL)
    private List<Bed> beds ;
    /*@OneToMany(mappedBy = "equipment", cascade = CascadeType.ALL)
    private List<Room> rooms ;*/

    @OneToMany(mappedBy = "equipment")
    @JsonIgnore
    private List<Appointment> appointments = new ArrayList<>();
}
