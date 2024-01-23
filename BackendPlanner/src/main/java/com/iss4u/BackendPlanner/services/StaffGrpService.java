package com.iss4u.BackendPlanner.services;
import com.iss4u.BackendPlanner.entities.Staff.Staff;
import com.iss4u.BackendPlanner.entities.StaffGrp.StaffGroup;

import java.util.List;
import java.util.Optional;

public interface StaffGrpService {
    StaffGroup createStaffGrp(StaffGroup staffGroup);
    List<StaffGroup> getAllStaffGrp();
     Optional<StaffGroup> getStaffGrpById(Long stgrpKey);
    StaffGroup updateStaffGrp(StaffGroup updatedStaffGrp, Long stgrpKey);
    void deleteStaffGrp( Long stgrpKey);
    List<StaffGroup> findStaffGrpByGroupName( String groupName);


    List<Staff> getChildElements(StaffGroup staffGrp);

    void addChildElement(Optional<StaffGroup> staffGrp, Staff staff);
    long getStaffGrpCount();

}
