package com.iss4u.BackendPlanner.repositories;

import com.iss4u.BackendPlanner.entities.Service;
import com.iss4u.BackendPlanner.entities.Staff.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    Service findByServiceNm(String serviceNm);


    @Query("SELECT s.staff FROM Service s WHERE s.id = :serviceId")
    List<Staff> findStaffByServiceId(@Param("serviceId") Long serviceId);
}
