package com.iss4u.BackendPlanner.entities;

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
@Table(name = "Site_Group")
public class SiteGrp {

    //--- SITE GROUP PRIMARY KEYS
    @Id

    @Column(name="SiteGrp_Ky", nullable=false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long siteGrpKy;

    //--- SITE GROUP DATA FIELDS
    @Column(name="SiteGrp_Nm", nullable=false, unique = true)
    private String siteGrpNm ;

    //--- SITE GROUP TEMPORAL DATA
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="SiteGrp_UnxTmCrt", nullable=false)
    private Date siteGrpUnxTmCrt ;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="siteGrp_UnxTmUpdt", nullable=false)
    private Date siteGrpUnxTmUpdt;

    @Column(name="siteGrp_RcrdSts", nullable=false)
    private Integer siteGrpRcrdSts ;

    //--- SITE GROUP LINKS ( RELATIONSHIP )
    @OneToMany(mappedBy = "siteGrp", cascade = CascadeType.ALL)
    private List<Site> sites ;

}
