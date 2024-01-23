package com.iss4u.BackendPlanner.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "Site")
public class Site {

    //--- SITE PRIMARY KEYS
    @Id

    @Column(name="Site_Ky", nullable=false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long siteKy;

    //--- SITE DATA FIELDS
    @Column(name="Site_Nm", nullable=false)
    private String siteNm ;

    @Column(name="Site_Country")
    private String siteCountry ;

    //--- SITE TEMPORAL DATA
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="Site_UnxTmCrt", nullable=false)
    private Date siteUnxTmCrt ;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="site_UnxTmUpdt", nullable=false)
    private Date siteUnxTmUpdt;

    @Column(name="site_RcrdSts", nullable=false)
    private Integer siteRcrdSts ;

    //--- SITE LINKS ( RELATIONSHIP )
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "SiteGrp_Ref")
    private SiteGrp siteGrp;


}
