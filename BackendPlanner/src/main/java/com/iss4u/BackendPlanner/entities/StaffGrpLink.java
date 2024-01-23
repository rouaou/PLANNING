package com.iss4u.BackendPlanner.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iss4u.BackendPlanner.entities.Staff.Staff;
import com.iss4u.BackendPlanner.entities.StaffGrp.StaffGroup;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Staff_Grp_Link")
public class StaffGrpLink {
    @Id

    @Column(name="staffGrpLinkKy", nullable=false)  //StaffGrpLink_Ky
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long staffGrpLinkKy;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "staffGroup") //StaffGrp_Ky
    private StaffGroup staffGroup;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "staff") //Staff_Ky
    private Staff staff;

    public StaffGrpLink(StaffGroup randomStaffGroup, Staff staff) {
        this.staffGroup = randomStaffGroup;
        this.staff = staff;
    }

}

