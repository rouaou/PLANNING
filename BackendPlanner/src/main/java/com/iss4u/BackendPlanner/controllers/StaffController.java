package com.iss4u.BackendPlanner.controllers;

import antlr.ASTFactory;
import com.iss4u.BackendPlanner.entities.Staff.Staff;

import com.iss4u.BackendPlanner.entities.StaffPassword;
import com.iss4u.BackendPlanner.services.Implementation.StaffServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:4200") // Replace with your frontend URL
@RestController
@RequestMapping("/api/staff")
public class StaffController {

    //autowired permet d'injecter service dans controller
    @Autowired
    private StaffServiceImpl staffService;

    // create staff
    @PostMapping("/createStaff")
    public Staff createStaff(@RequestBody Staff staff) {
    return staffService.createStaff(staff);

    }
    //createStaffPsw
    @PostMapping("/{staffId}/password")
    public ResponseEntity<StaffPassword> createStaffPassword(
            @PathVariable Long staffId, @RequestBody StaffPassword password) {
        Optional<Staff> staff = staffService.getStaffById(staffId);
        if (staff.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        StaffPassword savedPassword = staffService.createStaffPassword(staff, password);
        return ResponseEntity.ok(savedPassword);
    }

    //update staff
    @PutMapping("/update/{id}")
    public  Staff updateStaff(@PathVariable (value = "id") Long staffKey, @RequestBody Staff updatedStaff) {

            Staff updated = staffService.updateStaff(staffKey, updatedStaff);
            return this.staffService.updateStaff( staffKey,updatedStaff);

    }


    // delete staff by id
    @DeleteMapping("/delete/{id}")
    /*public ResponseEntity<Staff> deleteStaff(@PathVariable(value = "id") Integer staffKey){
        return this.staffService.deleteStaff(staffKey);
    }*/
    public ResponseEntity<HttpStatus> deleteStaff(@PathVariable(value = "id") Long staffKey) {
        Optional<Staff> existingStaff = staffService.getStaffById(staffKey);
        if (existingStaff.isPresent()) {
            staffService.deleteStaff(staffKey);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    // get all staffs
    @GetMapping("/listStaffs")
    public List<Staff> getAllStaffs(){

        return this.staffService.getAllStaffs();
    }

    //get staff by id
    @GetMapping("/getStaff/{id}")
   /* public Staff getStaffById(@PathVariable (value = "id") Long staffKey){
        return this.staffService.getStaffById(staffKey);
    }*/
    public ResponseEntity<Staff> getStaffById(@PathVariable("id") Long staffKey) {
        Optional<Staff> staff = staffService.getStaffById(staffKey);
        return staff.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    //Search
    @GetMapping("/firstName/{firstName}")
    public List<Staff> findStaffByFirstName(@PathVariable(value = "firstName") String firstName) {
        return staffService.findStaffByFirstName(firstName);

    }

    @GetMapping("/count")
    public long getStaffCount() {
        return staffService.getStaffCount();
    }


    @GetMapping("/check-professional-email-unique/{professionalEmail}")
    public ResponseEntity<Boolean> checkProfessionalEmailUnique(@PathVariable String professionalEmail) {
        boolean isUnique = staffService.isProfessionalEmailUnique(professionalEmail);
        return ResponseEntity.ok(isUnique);
    }

    @GetMapping("/check-identifier-unique/{identifier}")
    public ResponseEntity<Boolean> checkIdentifierUnique(@PathVariable String identifier) {
        boolean isUnique = staffService.isIdentifierUnique(identifier);
        return ResponseEntity.ok(isUnique);
    }
    @GetMapping("/checkPhoneNumberUniqueness")
    public ResponseEntity<Boolean> checkPhoneNumberUniqueness(@RequestParam Long phoneNumber) {

            // Your logic to check phone number uniqueness
            boolean isUnique = staffService.isPhoneNumberUnique(phoneNumber);
            return ResponseEntity.ok(isUnique);

    }
    @GetMapping("/byservice/{service}")
    public ResponseEntity<List<Staff>> getStaffByService(@PathVariable String service) {
        List<Staff> staffList = staffService.getStaffByService(service);
        return new ResponseEntity<>(staffList, HttpStatus.OK);
    }
    @GetMapping("/getByServiceAndStaffGroup/{serviceId}/{staffGroupId}")
    public ResponseEntity<List<Staff>> getStaffByServiceAndStaffGroup(
            @PathVariable Long serviceId,
            @PathVariable Long staffGroupId) {

        List<Staff> staffMembers = staffService.findByServiceAndStaffGroup(serviceId, staffGroupId);

        return new ResponseEntity<>(staffMembers, HttpStatus.OK);
    }
}
