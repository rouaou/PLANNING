package com.iss4u.BackendPlanner.services;


import com.iss4u.BackendPlanner.entities.StaffGrp.StaffGroup;
import com.iss4u.BackendPlanner.entities.StaffGrpLink;

import java.util.List;

public interface StaffGrpLinkService {

    List<StaffGrpLink> getAllStaffGrpLinks();

    void assignStaffToGroup(Long staffKy, Long staffGrpKy);

    void unassignStaffFromGroup(Long staffKy, Long staffGrpKy);
     void deleteStaffGrpLink(Long id) ;

     Long findStaffGrpLinkKyByStaffGrpKyAndStaffKy(Long staffGroup, Long staff) ;

}