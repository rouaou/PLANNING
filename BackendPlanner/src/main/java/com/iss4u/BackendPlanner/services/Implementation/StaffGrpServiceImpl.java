package com.iss4u.BackendPlanner.services.Implementation;
import com.iss4u.BackendPlanner.entities.Staff.Staff;
import com.iss4u.BackendPlanner.entities.StaffGrp.StaffGroup;
import com.iss4u.BackendPlanner.entities.StaffGrpLink;
import com.iss4u.BackendPlanner.repositories.StaffGroupRepository;
import com.iss4u.BackendPlanner.repositories.StaffGrpLinkRepository;
import com.iss4u.BackendPlanner.repositories.StaffRepository;
import com.iss4u.BackendPlanner.services.StaffGrpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StaffGrpServiceImpl implements StaffGrpService {
    //inject staffGroupRepository
    @Autowired
     private final StaffGroupRepository staffGroupRepository;

    @Autowired
    private final StaffRepository staffRepository;
    @Autowired
     private final StaffGrpLinkRepository staffGrpLinkRepository;
    @Autowired
    public StaffGrpServiceImpl(StaffGroupRepository staffGrpRepository, StaffRepository staffRepository, StaffGrpLinkRepository staffGrpLinkRepository) {
        this.staffGroupRepository = staffGrpRepository;
        this.staffRepository = staffRepository;
        this.staffGrpLinkRepository = staffGrpLinkRepository;

    }

    @Override
    public StaffGroup createStaffGrp(StaffGroup staffGroup){
        return staffGroupRepository.save(staffGroup);
    }
    @Override
    public List<StaffGroup> getAllStaffGrp(){
        return this.staffGroupRepository.findAll();
    }
    @Override
    public Optional<StaffGroup> getStaffGrpById(Long stgrpKey){
        return this.staffGroupRepository.findById(stgrpKey);
    }
    @Override
    public StaffGroup updateStaffGrp(StaffGroup updatedStaffGrp, Long stgrpKey) {

        StaffGroup existingStaffGrp = staffGroupRepository.findById(stgrpKey)
                .orElseThrow(() -> new EntityNotFoundException("Staff Group with id " + stgrpKey + " not found"));

        existingStaffGrp.setGroupName(updatedStaffGrp.getGroupName());
        existingStaffGrp.setType(updatedStaffGrp.getType());
        existingStaffGrp.setPrivilege(updatedStaffGrp.isPrivilege());
        //existingStaffGrp.setStaffGrpLinks(updatedStaffGrp.getStaffGrpLinks());
        return staffGroupRepository.save(existingStaffGrp);
    }

    @Override
    /*public ResponseEntity<StaffGroup> deleteStaffGrp(@PathVariable("id") Long stgrpKey){
        StaffGroup existingStaffGrp = this.staffGroupRepository.findById(stgrpKey)
                .orElseThrow(() -> new ResourceNotFoundException("Staff Group not found with id :" + stgrpKey));
        this.staffGroupRepository.delete(existingStaffGrp);
        return ResponseEntity.ok().build();
    }*/
    public void deleteStaffGrp(Long stgrpKey) {
        staffGroupRepository.deleteById(stgrpKey);
    }
    @Override
    public List<StaffGroup> findStaffGrpByGroupName( String groupName) {
        return staffGroupRepository.findByGroupName(groupName);
    }


    @Override
    public List<Staff> getChildElements(StaffGroup staffGroup) {
        Optional<StaffGroup> staffGrpOptional = staffGroupRepository.findById(staffGroup.getStgrpKey());

        if(staffGrpOptional.isPresent()) {
            return staffGrpOptional.get().getStaffs();
        }
        return new ArrayList<>();
    }


    @Override
    public void addChildElement(Optional<StaffGroup> staffGrpOptional, Staff staff) {
        if (staffGrpOptional.isPresent()) {

            staffRepository.save(staff);
            StaffGroup staffGrp = staffGrpOptional.get();
            StaffGrpLink staffGrpLink = new StaffGrpLink();

            staffGrpLink.setStaffGroup(staffGrp);
            staffGrpLink.setStaff(staff);
            staffGrp.getStaffGrpLinks().add(staffGrpLink);
            staff.getStaffGrpLinks().add(staffGrpLink);
            //staffGroupRepository.save(staffGrp);
           staffGrpLinkRepository.save(staffGrpLink);
           // staff.setStaffGrpLinks(staffGrp.getStaffGrpLinks());
        } else {
            throw new EntityNotFoundException("Staff Group not found");
        }
    }
    public long getStaffGrpCount() {
        return staffGroupRepository.count();
    }
}
