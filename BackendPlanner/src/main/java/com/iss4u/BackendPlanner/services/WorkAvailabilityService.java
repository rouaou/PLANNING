package com.iss4u.BackendPlanner.services;

import com.iss4u.BackendPlanner.entities.WorkAvailability;

import java.util.List;

public interface WorkAvailabilityService {

    List<WorkAvailability> getAllWorkAvailability();

    WorkAvailability getWorkAvailabilityById(Long id);

    WorkAvailability createWorkAvailability(WorkAvailability workAvailability);

    WorkAvailability updateWorkAvailability(Long id, WorkAvailability workAvailability);

    void deleteWorkAvailability(Long id);

     void addAvailabilityToStaff(Long staffId, WorkAvailability workAvailability);
     List<WorkAvailability> getAvailabilityForStaff(Long userKy) ;

    }