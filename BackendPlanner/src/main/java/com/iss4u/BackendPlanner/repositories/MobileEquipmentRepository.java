package com.iss4u.BackendPlanner.repositories;

import com.iss4u.BackendPlanner.entities.eq.MobileEquipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MobileEquipmentRepository extends JpaRepository<MobileEquipment, Long> {
}
