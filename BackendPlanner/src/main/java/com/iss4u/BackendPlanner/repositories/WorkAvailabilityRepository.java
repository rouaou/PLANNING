package com.iss4u.BackendPlanner.repositories;

import com.iss4u.BackendPlanner.entities.WorkAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkAvailabilityRepository extends JpaRepository<WorkAvailability, Long> {
}