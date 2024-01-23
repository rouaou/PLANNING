package com.iss4u.BackendPlanner.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iss4u.BackendPlanner.entities.Staff.Staff;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Entity
@Table(name = "Staff_Password")
public class StaffPassword {
    @Id

    @Column(name="StaffPwd_Ky", nullable=false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long staffPwdKy;

    @Column(name="StaffPwd_Txt", nullable=false)
    private String staffPwdTxt ;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="StaffPwd_UnxTmBgn", nullable=false)
    private Date staffPwdUnxtmbgn ;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="StaffPwd_UnxTmEnd", nullable=false)
    private Date staffPwdUnxtmend ;

    // ( RELATIONSHIP )
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "Staff_Ky")
    private Staff staff;
}