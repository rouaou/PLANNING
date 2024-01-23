package com.iss4u.BackendPlanner.services.Implementation;


import com.iss4u.BackendPlanner.entities.Staff.Staff;
import com.iss4u.BackendPlanner.entities.WorkAvailability;
import com.iss4u.BackendPlanner.repositories.StaffRepository;
import com.iss4u.BackendPlanner.repositories.WorkAvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.iss4u.BackendPlanner.services.WorkAvailabilityService;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class WorkAvailabilityServiceImpl implements WorkAvailabilityService {

    private final WorkAvailabilityRepository workAvailabilityRepository;
    private final StaffRepository staffRepository;

    @Autowired
    public WorkAvailabilityServiceImpl(WorkAvailabilityRepository workAvailabilityRepository, StaffRepository staffRepository) {
        this.workAvailabilityRepository = workAvailabilityRepository;
        this.staffRepository = staffRepository;
    }

    @Override
    public List<WorkAvailability> getAllWorkAvailability() {
        return workAvailabilityRepository.findAll();
    }

    @Override
    public WorkAvailability getWorkAvailabilityById(Long id) {
        Optional<WorkAvailability> optionalWorkAvailability = workAvailabilityRepository.findById(id);
        return optionalWorkAvailability.orElse(null);
    }

    @Override
    public WorkAvailability createWorkAvailability(WorkAvailability workAvailability) {
        return workAvailabilityRepository.save(workAvailability);
    }

    @Override
    public WorkAvailability updateWorkAvailability(Long id, WorkAvailability workAvailability) {
        if (workAvailabilityRepository.existsById(id)) {
            workAvailability.setId(id);
            return workAvailabilityRepository.save(workAvailability);
        }
        return null; // Handle the case when the entity with the given id is not found
    }

    @Override
    public void deleteWorkAvailability(Long id) {
        workAvailabilityRepository.deleteById(id);
    }

    public void addAvailabilityToStaff(Long staffId, WorkAvailability workAvailability) {
        // Find the staff by ID
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new EntityNotFoundException("Staff not found with id: " + staffId));

        workAvailability.setStaff(staff);
        workAvailabilityRepository.save(workAvailability);

        staff.getAvailabilities().add(workAvailability);
        staffRepository.save(staff);
    }

    public List<WorkAvailability> getAvailabilityForStaff(Long userKy) {
        Staff staff = staffRepository.findById(userKy)
                .orElseThrow(() -> new EntityNotFoundException("Staff not found with id: " + userKy));

        return staff.getAvailabilities();
    }
}