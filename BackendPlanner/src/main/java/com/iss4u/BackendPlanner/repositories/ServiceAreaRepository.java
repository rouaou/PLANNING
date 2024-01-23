package com.iss4u.BackendPlanner.repositories;

import com.iss4u.BackendPlanner.entities.ServiceArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceAreaRepository extends JpaRepository<ServiceArea, Long> {
    ServiceArea findByServAreaNm(String servAreaNm);
}
