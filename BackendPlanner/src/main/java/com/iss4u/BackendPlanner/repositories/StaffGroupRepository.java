package com.iss4u.BackendPlanner.repositories;

import com.iss4u.BackendPlanner.entities.StaffGrp.StaffGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffGroupRepository extends JpaRepository<StaffGroup, Long> {

    List<StaffGroup> findByGroupName(String groupName);


}
