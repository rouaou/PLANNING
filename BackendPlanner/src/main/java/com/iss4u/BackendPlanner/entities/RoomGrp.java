package com.iss4u.BackendPlanner.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iss4u.BackendPlanner.entities.ExploitationUnit;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Entity
@Table(name = "RoomGroup")
public class RoomGrp {

    //--- ROOM GROUP PRIMARY KEYS
    @Id

    @Column(name="RoomGrp_Ky", nullable=false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomGrpKy;

    //--- ROOM GROUP DATA FIELDS
    @Column(name="RoomGrp_Nm", nullable=false)
    private String roomGrpNm ;

    //--- ROOM GROUP TEMPORAL DATA
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="RoomGrp_UnxTmCrt", nullable=false)
    private Date roomGrpUnxTmCrt ;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="RoomGrp_UnxTmUpdt", nullable=false)
    private Date roomGrpUnxTmUpdt;

    @Column(name="RoomGrp_RcrdSts", nullable=false)
    private Integer roomGrpRcrdSts ;

    //--- ROOM GROUP LINKS ( RELATIONSHIP )
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "ExploitationUnit_Ref")
    private ExploitationUnit exploitationUnit;

    @OneToMany(mappedBy = "roomGrp", cascade = CascadeType.ALL)
    private List<Room> rooms ;
}
