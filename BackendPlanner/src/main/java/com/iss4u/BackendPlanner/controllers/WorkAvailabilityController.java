package com.iss4u.BackendPlanner.controllers;
import com.iss4u.BackendPlanner.entities.Appointment.Appointment;
import com.iss4u.BackendPlanner.entities.WorkAvailability;
import com.iss4u.BackendPlanner.services.StaffService;
import com.iss4u.BackendPlanner.services.WorkAvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/api/availability")
public class WorkAvailabilityController {

    private final WorkAvailabilityService workAvailabilityService;
    private final StaffService staffService;

    @Autowired
    public WorkAvailabilityController(WorkAvailabilityService workAvailabilityService, StaffService staffService) {
        this.workAvailabilityService = workAvailabilityService;
        this.staffService = staffService;
    }

    @GetMapping
    public ResponseEntity<List<WorkAvailability>> getAllWorkAvailability() {
        List<WorkAvailability> workAvailabilities = workAvailabilityService.getAllWorkAvailability();
        return new ResponseEntity<>(workAvailabilities, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkAvailability> getWorkAvailabilityById(@PathVariable Long id) {
        WorkAvailability workAvailability = workAvailabilityService.getWorkAvailabilityById(id);
        return new ResponseEntity<>(workAvailability, HttpStatus.OK);
    }


    @PostMapping("/createAvail")
    public ResponseEntity<WorkAvailability> createWorkAvailability(@RequestBody WorkAvailability workAvailability) {
        workAvailabilityService.createWorkAvailability(workAvailability);
        return new ResponseEntity<>(workAvailability, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkAvailability> updateWorkAvailability(
            @PathVariable Long id,
            @RequestBody WorkAvailability workAvailability) {
        WorkAvailability updatedWorkAvailability = workAvailabilityService.updateWorkAvailability(id, workAvailability);
        return new ResponseEntity<>(updatedWorkAvailability, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkAvailability(@PathVariable Long id) {
        workAvailabilityService.deleteWorkAvailability(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{staffId}/availability")
    public ResponseEntity<?> addAvailabilityToStaff(
            @PathVariable Long staffId,
            @RequestBody WorkAvailability workAvailability) {

        try {
            workAvailabilityService.addAvailabilityToStaff(staffId, workAvailability);
            return new ResponseEntity<>("Availability added successfully", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/workplan/{userKy}")
    public ResponseEntity<List<WorkAvailability>> getAvailabilityForStaff(@PathVariable Long userKy) {
        List<WorkAvailability> availability = workAvailabilityService.getAvailabilityForStaff(userKy);
        return ResponseEntity.ok(availability);
    }
}
