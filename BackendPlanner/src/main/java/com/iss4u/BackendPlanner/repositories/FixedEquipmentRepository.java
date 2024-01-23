package com.iss4u.BackendPlanner.repositories;

import com.iss4u.BackendPlanner.entities.eq.FixedEquipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FixedEquipmentRepository extends JpaRepository<FixedEquipment, Long> {
}
