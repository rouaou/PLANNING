package com.iss4u.BackendPlanner.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iss4u.BackendPlanner.entities.eq.Equipment;
import iss4u.ehr.backoffice.parameterization.material_resources.entities.enumerations.BedType;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Data
@Getter
@Setter
@Entity
@Table(name = "Bed")
public class Bed {
    //--- BED PRIMARY KEYS
    @Id
    @Column(name="Bed_Ky", nullable=false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bedKy;

    @Column(name="Bed_Number", nullable=false)
    private Integer bedNumber ;

    @Column(name="Bed_Type", nullable=false)
    private BedType bedType ;

    @Column(name="Bed_Note", nullable=false)
    private String bedNote ;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "Equipment_Ref")
    private Equipment equipment;
}
