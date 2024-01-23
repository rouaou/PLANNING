package com.iss4u.BackendPlanner.entities.StaffGrp;
import com.iss4u.BackendPlanner.entities.Service;
import com.iss4u.BackendPlanner.entities.Staff.Staff;
import com.iss4u.BackendPlanner.entities.StaffGrpLink;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.*;
import java.util.stream.Collectors;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "staffGroup")
public class StaffGroup {

    //pour faire the primery key
    @Id
    @Column(name="staffGroup", nullable=false)//StaffGrp_Ky
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stgrpKey;


    @NotEmpty
    @Column(name = "GroupName", nullable = false)
    private String groupName;


    @NotEmpty
    @Column(name = "Type")
    @Enumerated(EnumType.STRING)
    private Type type;
    @NotEmpty
    @Column(name = "Privilege")
    private boolean privilege;

    public StaffGroup(String groupName, Type type, boolean privilege) {
        this.groupName = groupName;
        this.type=type;
        this.privilege = privilege;
    }

   /* @Temporal(TemporalType.TIMESTAMP)
    @Column(name="StaffGrp_UnxTmCrt", nullable=true)
    private Date staffGrpUnxTmCrt ;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="StaffGrp_UnxTmUpdt", nullable=true)
    private Date staffGrpUnxTmUpdt;

    @Column(name="StaffGrp_RcrdSts", nullable=true)
    private Integer staffGrpRcrdSts;*/
  /*  @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "GroupStaffLink",
            joinColumns = @JoinColumn(name = "staffGrp_id"),
            inverseJoinColumns = @JoinColumn(name = "staff_id"))
    private Set<Staff> staffs = new HashSet<>();*/

    //eager permet d'afficher l'erreu et lazzy aussi in many to many
  @OneToMany(mappedBy = "staffGroup",fetch = FetchType.EAGER)
  private List<StaffGrpLink> staffGrpLinks = new ArrayList<>();

    public List<Staff> getStaffs() {
        return staffGrpLinks.stream()
                .map(StaffGrpLink::getStaff)
                .collect(Collectors.toList());
    }


    @ElementCollection
    @CollectionTable(name = "selected_staff_members", joinColumns = @JoinColumn(name = "staff_group_id"))
    @Column(name = "staff_id")
    private List<Long> selectedStaff = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "service_ref")
    private Service service;

}

