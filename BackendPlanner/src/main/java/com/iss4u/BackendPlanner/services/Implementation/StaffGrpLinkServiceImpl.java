package com.iss4u.BackendPlanner.services.Implementation;


import com.iss4u.BackendPlanner.entities.Staff.Staff;
import com.iss4u.BackendPlanner.entities.StaffGrp.StaffGroup;
import com.iss4u.BackendPlanner.entities.StaffGrpLink;
import com.iss4u.BackendPlanner.repositories.StaffGroupRepository;
import com.iss4u.BackendPlanner.repositories.StaffGrpLinkRepository;
import com.iss4u.BackendPlanner.repositories.StaffRepository;
import com.iss4u.BackendPlanner.services.StaffGrpLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffGrpLinkServiceImpl implements StaffGrpLinkService {
    @Autowired
    private StaffGrpLinkRepository staffGroupLinkRepository;
    private final StaffRepository staffRepository;
    private final StaffGrpLinkRepository staffGrpLinkRepository;
    private final StaffGroupRepository staffGroupRepository ;

    public StaffGrpLinkServiceImpl(StaffGrpLinkRepository staffGroupLinkRepository, StaffRepository staffRepository, StaffGrpLinkRepository staffGrpLinkRepository, StaffGroupRepository staffGroupRepository) {
        this.staffGroupLinkRepository = staffGroupLinkRepository;
        this.staffRepository = staffRepository;
        this.staffGrpLinkRepository = staffGrpLinkRepository;
        this.staffGroupRepository = staffGroupRepository;
    }

    @Override
    public List<StaffGrpLink> getAllStaffGrpLinks() {
        return staffGrpLinkRepository.findAll();
    }
    @Override
    public void assignStaffToGroup(Long staffKy, Long staffGrpKy) {
        Optional<Staff> staffOptional = staffRepository.findById(staffKy);
        Optional<StaffGroup> staffGrpOptional = staffGroupRepository.findById(staffGrpKy);

        if (staffOptional.isPresent() && staffGrpOptional.isPresent()) {
            Staff staff = staffOptional.get();
            StaffGroup staffGrp = staffGrpOptional.get();

            StaffGrpLink staffGrpLink = new StaffGrpLink();
            staffGrpLink.setStaff(staff);
            staffGrpLink.setStaffGroup(staffGrp);

            staff.getStaffGrpLinks().add(staffGrpLink);
            staffGrp.getStaffGrpLinks().add(staffGrpLink);

            staffRepository.save(staff);
            staffGroupRepository.save(staffGrp);

            staffGrpLinkRepository.save(staffGrpLink);
        } else {
            throw new IllegalArgumentException("Staff or StaffGroup not found. Please provide valid IDs.");
        }
    }
    @Override
    public void unassignStaffFromGroup(Long staffKy, Long staffGrpKy) {
        Optional<Staff> staffOptional = staffRepository.findById(staffKy);
        Optional<StaffGroup> staffGrpOptional = staffGroupRepository.findById(staffGrpKy);

        if (staffOptional.isPresent() && staffGrpOptional.isPresent()) {
            Staff staff = staffOptional.get();
            StaffGroup staffGrp = staffGrpOptional.get();

            StaffGrpLink staffGrpLinkToRemove = null;
            for (StaffGrpLink staffGrpLink : staff.getStaffGrpLinks()) {
                if (staffGrpLink.getStaffGroup().equals(staffGrp)) {
                    staffGrpLinkToRemove = staffGrpLink;
                    break;
                }
            }

            if (staffGrpLinkToRemove != null) {
                staff.getStaffGrpLinks().remove(staffGrpLinkToRemove);
                staffGrp.getStaffGrpLinks().remove(staffGrpLinkToRemove);

                staffRepository.save(staff);
                staffGroupRepository.save(staffGrp);

                staffGrpLinkRepository.delete(staffGrpLinkToRemove);
            }
        } else {
            throw new IllegalArgumentException("Staff or StaffGroup not found. Please provide valid IDs.");
        }
    }
    @Override
    public void deleteStaffGrpLink(Long id) {
        staffGrpLinkRepository.deleteById(id);
    }
@Override
    public Long findStaffGrpLinkKyByStaffGrpKyAndStaffKy(Long staffGroup, Long staff) {
        return staffGrpLinkRepository.findStaffGrpLinkKyByStaffGroupAndStaff(staffGroup, staff);
    }
}