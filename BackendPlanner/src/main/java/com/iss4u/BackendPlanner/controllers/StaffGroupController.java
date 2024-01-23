package com.iss4u.BackendPlanner.controllers;
import com.iss4u.BackendPlanner.entities.Staff.Staff;
import com.iss4u.BackendPlanner.entities.StaffGrp.StaffGroup;
import com.iss4u.BackendPlanner.services.Implementation.StaffGrpServiceImpl;
import com.iss4u.BackendPlanner.services.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/staffGrp")

public class StaffGroupController {
    //autowired permet d'injecter service dans controller
    @Autowired
    private StaffGrpServiceImpl staffGrpService;
    private final StaffService staffService; // Inject StaffService

    public StaffGroupController(StaffService staffService) {
        this.staffService = staffService;
    }

    // create staff
    @PostMapping("/createStaffGrp")
    public StaffGroup createStaffGrp(@RequestBody StaffGroup staffGroup) {
        return staffGrpService.createStaffGrp(staffGroup);

    }
    // get all staffsGrp
    @GetMapping("/listStaffsGrp")
    public List<StaffGroup> getAllStaffGrp() {
        return this.staffGrpService.getAllStaffGrp();
    }

    //get staff by id
    @GetMapping("/getStaffGrp/{id}")
   /* public StaffGroup getStaffGrpById(@PathVariable(value = "id") Integer stgrpKey){
        return this.staffGrpService.getStaffGrpById(stgrpKey);
    }*/
    public ResponseEntity<StaffGroup> getStaffGrpById(@PathVariable("id") Long staffGrpId) {
        Optional<StaffGroup> staffGrp = staffGrpService.getStaffGrpById(staffGrpId);
        return staffGrp.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    //update staff
    @PutMapping("/updateStaffGrp/{staffGrpKy}")

    public ResponseEntity<StaffGroup> updateStaffGrp(
            @PathVariable Long staffGrpKy,
            @RequestBody StaffGroup updatedStaffGrp) {
        //Get the staff group by ID (staffGrpKy) and update it with the provided data.
        // Also, assign the selected staff members to the staff group.
        StaffGroup updatedGroup = staffGrpService.updateStaffGrp(updatedStaffGrp, staffGrpKy);
        return ResponseEntity.ok(updatedGroup);
    }


    // delete staff by id
    @DeleteMapping("/deleteStaffGrp/{id}")
    /*public ResponseEntity<StaffGroup> deleteStaffGrp(@PathVariable(value = "id") Integer stgrpKey){
        return this.staffGrpService.deleteStaffGrp(stgrpKey);
    }*/
    public ResponseEntity<HttpStatus> deleteStaffGrp(@PathVariable("id") Long staffGrpId) {
        Optional<StaffGroup> existingStaffGrp = staffGrpService.getStaffGrpById(staffGrpId);
        if (existingStaffGrp.isPresent()) {
            staffGrpService.deleteStaffGrp(staffGrpId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/{id}/child-elements")
    public ResponseEntity<List<Staff>> getChildElements(@PathVariable("id") Long staffGrpId) {
        Optional<StaffGroup> staffGrp = staffGrpService.getStaffGrpById(staffGrpId);
        if (staffGrp.isPresent()) {
            List<Staff> childElements = staffGrpService.getChildElements(staffGrp.get());
            return new ResponseEntity<>(childElements, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{stgrpKey}/addStaff")
    public ResponseEntity<String> addChildElement(@PathVariable Long stgrpKey, @RequestBody Staff staff) {
        Optional<StaffGroup> staffGrp = staffGrpService.getStaffGrpById(stgrpKey);
        if (staffGrp.isPresent()) {
            staffGrpService.addChildElement(staffGrp, staff);
            return ResponseEntity.ok("Staff added to StaffGrp successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    //Search
    @GetMapping("/groupName/{groupName}")
    public List<StaffGroup> findStaffGrpByGroupName(@PathVariable(value = "groupName") String groupName) {
        return staffGrpService.findStaffGrpByGroupName(groupName);

    }
    /*@GetMapping("/{staffGroupId}/assigned-staff")
    public ResponseEntity<List<Staff>> getAssignedStaffByGroupId(@PathVariable Long staffGroupId) {
        List<Staff> assignedStaff = staffService.getAssignedStaffByGroupId(staffGroupId);
        return ResponseEntity.ok(assignedStaff);
    }*/

    @GetMapping("/count")
    public long getStaffGrpCount() {
        return staffGrpService.getStaffGrpCount();
    }

}
