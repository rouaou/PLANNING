package com.iss4u.BackendPlanner.repositories;

import com.iss4u.BackendPlanner.entities.Staff.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface StaffRepository extends JpaRepository<Staff, Long> {
    List<Staff> findBySpeciality(String speciality);

    List<Staff> findByFirstName(String firstName);
    Staff findByProfessionalEmail(String professionalEmail);
    Staff findByIdentifier(String identifier);
    Staff findByPhoneNumber(Number phoneNumber);

    Optional<Staff> getByLoginAndPassword(String login, String password);
     //List<Staff> getStaffsByService(String serviceType) ;
     @Query("SELECT s FROM Staff s " +
             "JOIN s.services service " +
             "JOIN s.staffGrpLinks staffGrpLink " +
             "WHERE service.serviceKy = :serviceId " +
             "AND staffGrpLink.staffGroup.stgrpKey = :staffGroupId")
     List<Staff> findByServiceAndStaffGroup(@Param("serviceId") Long serviceId, @Param("staffGroupId") Long staffGroupId);
}

