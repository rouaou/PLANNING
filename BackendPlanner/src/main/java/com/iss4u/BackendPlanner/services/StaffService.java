package com.iss4u.BackendPlanner.services;

import com.iss4u.BackendPlanner.entities.Staff.Staff;
import com.iss4u.BackendPlanner.entities.StaffPassword;


import java.util.List;
import java.util.Optional;

public interface StaffService {

    Staff createStaff(Staff staff);

    List<Staff> getAllStaffs();
    Optional<Staff> getStaffById(Long staffKey);
    Staff updateStaff(Long staffKey, Staff updatedStaff);
   void deleteStaff(Long staffKey);
    /*List<Staff> findStaffByIds(List<Long> staffIds);*/
    boolean isPhoneNumberUnique(Long phoneNumber);
    StaffPassword createStaffPassword(Optional<Staff> staff, StaffPassword password);
    List<Staff> findStaffByFirstName(String firstName);
   // List<Staff> getAssignedStaffByGroupId(Long staffGroupId) ;
   long getStaffCount();
   boolean isProfessionalEmailUnique(String professionalEmail);
    boolean isIdentifierUnique(String identifier);
    List<Staff> getStaffByService(String service);
    Optional<Staff> getByLoginAndPassword(String login, String password);
    List<Staff> findByServiceAndStaffGroup(Long serviceId, Long staffGroupId);
}
