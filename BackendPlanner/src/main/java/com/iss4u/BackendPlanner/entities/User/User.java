package com.iss4u.BackendPlanner.entities.User;


import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Entity
@Table(name = "User")
public class User {
    @Id
    @Column(name = "User_Ky", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userKy;

    @Column(name="User_Image", nullable=true)
    private String userImage;

    @Column(name="Last_Name", nullable=true)
    private String lastName;

    @Column(name="First_Name", nullable=true)
    private String firstName;

    @Column(name="User_Id", nullable=true, unique = true)
    private String userId ;

    @Column(name="Maiden_Name", nullable=true)
    private String maidenName;

    @Column(name="Birth_Date", nullable=true)
    private LocalDate birthDate;

    @Column(name="Gender", nullable=true)
    private String gender;

    @Column(name="civil_status", nullable=true)
    private String cvlStatus;

    @Column(name="nationality", nullable=true)
    private String nationality;

    @Column(name = "login", nullable = true)
    private String login;

    @Column(name = "password", nullable = true)
    private String password;

    @Column(name = "email", nullable = true)
    private String email;
    /*@Temporal(TemporalType.TIMESTAMP)
    @Column(name="User_UnxTmCrt", nullable=true)
    private Date userUnxTmCrt ;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="User_UnxTmUpdt", nullable=true)
    private Date userUnxTmUpdt ;

    @Column(name="User_RcrdSts", nullable=true)
    private Integer userRcrdSts ;*/
}