package com.iss4u.BackendPlanner.repositories;

import com.iss4u.BackendPlanner.entities.eq.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    Equipment findByEquipmentLabel(String equipmentLabel);
    @Query("SELECT e FROM Equipment e JOIN e.room r JOIN r.roomGrp rg JOIN rg.exploitationUnit eu JOIN eu.serviceArea sa WHERE sa.service.serviceKy = :serviceId")
    List<Equipment> findByServiceId(@Param("serviceId") Long serviceId);
}
