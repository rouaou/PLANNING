package com.iss4u.BackendPlanner.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iss4u.BackendPlanner.entities.Appointment.Appointment;
import com.iss4u.BackendPlanner.entities.eq.Equipment;
import com.iss4u.BackendPlanner.entities.eq.FixedEquipment;
import com.iss4u.BackendPlanner.entities.eq.MobileEquipment;
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
@Table(name = "Room")
public class Room {

    //--- ROOM PRIMARY KEYS
    @Id

    @Column(name="Room_Ky", nullable=false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomKy;

    //--- ROOM DATA FIELDS
    @Column(name="Room_Label", nullable=false)
    private String roomLabel ;

    @Column(name="Room_Type", nullable=false)
    private String roomType ;

    @Column(name="Room_Class")
    private String roomClass ;

    //--- ROOM TEMPORAL DATA
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="Room_UnxTmCrt", nullable=false)
    private Date roomUnxTmCrt ;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="Room_UnxTmUpdt", nullable=false)
    private Date roomUnxTmUpdt;

    @Column(name="Room_RcrdSts", nullable=false)
    private Integer roomRcrdSts ;

    //--- ROOM LINKS ( RELATIONSHIP )
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "RoomGrp_Ref")
    private RoomGrp roomGrp;

    @JsonIgnore
    @OneToMany(mappedBy = "room")
    private List<Equipment> Equipments;
   /* @OneToMany(mappedBy = "room")
    private List<FixedEquipment> fixedEquipments;*/

   /* @ManyToMany(mappedBy = "rooms")
    private List<MobileEquipment> mobileEquipments;*/
    @JsonIgnore
    @OneToMany(mappedBy = "room")
    private List<Appointment> appointments = new ArrayList<>();
}
