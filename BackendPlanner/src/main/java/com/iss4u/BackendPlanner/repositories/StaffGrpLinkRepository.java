package com.iss4u.BackendPlanner.repositories;

import com.iss4u.BackendPlanner.entities.StaffGrp.StaffGroup;
import com.iss4u.BackendPlanner.entities.StaffGrpLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffGrpLinkRepository extends JpaRepository<StaffGrpLink, Long> {
    //List<StaffGrpLink> findByStaffGroup_Id(Long stgrpky);
    Long findStaffGrpLinkKyByStaffGroupAndStaff(Long staffGroup, Long staff);

}
