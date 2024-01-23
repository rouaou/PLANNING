package com.iss4u.BackendPlanner.controllers;

import com.iss4u.BackendPlanner.entities.StaffGrpLink;
import com.iss4u.BackendPlanner.services.StaffGrpLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Controller
@RestController
@RequestMapping("/api/staffGrpLink")

public class StaffGrpLinkController {

    @Autowired
    private StaffGrpLinkService staffGrpLinkService;

    @GetMapping("/listStaffsGrpLink")
    public ResponseEntity<List<StaffGrpLink>> getAllStaffGrpLinks() {
        List<StaffGrpLink> staffGrpLinks = staffGrpLinkService.getAllStaffGrpLinks();
        return new ResponseEntity<>(staffGrpLinks, HttpStatus.OK);
    }

    @PostMapping("/assign")
    public ResponseEntity<String> assignStaffToGroup(
            @RequestParam Long staffKy,
            @RequestParam Long staffGrpKy) {
        staffGrpLinkService.assignStaffToGroup(staffKy, staffGrpKy);
        return ResponseEntity.ok("Staff assigned to group successfully.");
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStaffGrpLink(@PathVariable Long id) {
        try {
            staffGrpLinkService.deleteStaffGrpLink(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete StaffGrpLink");
        }
    }
    @PostMapping("/unassign")
    public ResponseEntity<String> unassignStaffFromGroup(
            @RequestParam Long staffKy,
            @RequestParam Long staffGrpKy) {
        staffGrpLinkService.unassignStaffFromGroup(staffKy, staffGrpKy);
        return ResponseEntity.ok("Staff unassigned from group successfully.");
    }

@GetMapping("/grpLinkKey/{staffGroup}/{staff}")
public Long findStaffGrpLinkKy(@PathVariable Long staffGroup,@PathVariable Long staff){
       return staffGrpLinkService.findStaffGrpLinkKyByStaffGrpKyAndStaffKy(staffGroup,staff);
}

}