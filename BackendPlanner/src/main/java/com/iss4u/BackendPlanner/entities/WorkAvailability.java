package com.iss4u.BackendPlanner.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iss4u.BackendPlanner.entities.Staff.Staff;
import com.iss4u.BackendPlanner.entities.StaffGrp.StaffGroup;
import lombok.*;

import javax.persistence.*;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Entity
@Table(name = "WorkAvailability")
public class WorkAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    //boolean isAvailable;

  /*  @Enumerated(EnumType.ORDINAL)
    private DayOfWeek day;*/
  @Column(name = "start_date")
  private Date startDate;

    @Column(name = "end_date")
    private Date endDate;
    @Column(name = "start_time")
    private String startTime;

    @Column(name = "end_time")
    private String endTime;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private AvailabilityType type;

    @Column(name = "description")
    private String description;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "Staff_Ref")
    private Staff staff;



}
