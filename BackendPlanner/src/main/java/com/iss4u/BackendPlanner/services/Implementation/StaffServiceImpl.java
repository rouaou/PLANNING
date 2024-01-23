package com.iss4u.BackendPlanner.services.Implementation;



import com.iss4u.BackendPlanner.entities.Staff.Staff;
import com.iss4u.BackendPlanner.entities.StaffPassword;
import com.iss4u.BackendPlanner.repositories.StaffGrpLinkRepository;
import com.iss4u.BackendPlanner.repositories.StaffPasswordRepository;
import com.iss4u.BackendPlanner.repositories.StaffRepository;
import com.iss4u.BackendPlanner.services.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Service
public class StaffServiceImpl implements StaffService {
    private final StaffRepository staffRepository;
    private final StaffPasswordRepository staffPasswordRepository;
    private StaffGrpLinkRepository staffGrpLinkRepository;
    //inject staffRepository
    @Autowired
    public StaffServiceImpl(StaffRepository staffRepository, StaffPasswordRepository staffPasswordRepository) {
        this.staffRepository = staffRepository;
        this.staffPasswordRepository = staffPasswordRepository;
    }
    public boolean isProfessionalEmailUnique(String professionalEmail) {
        // Implement your logic to check uniqueness
        Staff existingStaff = staffRepository.findByProfessionalEmail(professionalEmail);
        return existingStaff == null; // Return true if the email is unique, false otherwise
    }
    // Method to check if the identifier is unique
    public boolean isIdentifierUnique(String identifier) {
        // Implement your logic to check uniqueness
        Staff existingStaff = staffRepository.findByIdentifier(identifier);
        return existingStaff == null; // Return true if the identifier is unique, false otherwise
    }

    @Override
    public Optional<Staff> getByLoginAndPassword(String login, String password) {
        return staffRepository.getByLoginAndPassword(login, password);
    }

    @Override
    public Staff createStaff(Staff staff){
        staff.setLogin(staff.getProfessionalEmail());
        staff.setUserImage("https://thumbs.dreamstime.com/b/young-doctor-16088825.jpg");
       return staffRepository.save(staff);
    }

    @Override
    public StaffPassword createStaffPassword(Optional<Staff> staffOptional, StaffPassword password) {
        if (staffOptional.isEmpty()) {
            throw new IllegalArgumentException("Staff not found");
        }

        Staff staff = staffOptional.get();
        password.setStaff(staff);
        return staffPasswordRepository.save(password);
    }
    @Override
    public List<Staff> getAllStaffs(){

        return staffRepository.findAll();
    }
    @Override

    public Optional<Staff> getStaffById(Long staffKey) {
        return staffRepository.findById(staffKey);
    }
    @Override

    public Staff updateStaff(Long staffkey,@RequestBody  Staff updatedStaff){
        Staff existingStaff = this.staffRepository.findById(staffkey)
                .orElseThrow(() -> new EntityNotFoundException("Staff with id" + staffkey+ "not found"));
        //existingStaff.setUserImage(updatedStaff.getUserImage());
        existingStaff.setFirstName(updatedStaff.getFirstName());
        existingStaff.setLastName(updatedStaff.getLastName());
        existingStaff.setProfessionalEmail(updatedStaff.getProfessionalEmail());
        existingStaff.setIdentifier(updatedStaff.getIdentifier());
        //existingStaff.setInitials(updatedStaff.getInitials());
       // existingStaff.setSignature(updatedStaff.getSignature());
        existingStaff.setSpeciality(updatedStaff.getSpeciality());
        existingStaff.setGender(updatedStaff.getGender());
        existingStaff.setTypeStaff(updatedStaff.getTypeStaff());
        existingStaff.setAdresse(updatedStaff.getAdresse());

        //existingStaff.setUserUnxTmUpdt(updatedStaff.getUserUnxTmUpdt());
       return this.staffRepository.save(existingStaff);

    }

    @Override
    @Transactional
    public void deleteStaff(Long staffKy) {

        staffRepository.deleteById(staffKy);
    }
    public List<Staff> findStaffByFirstName( String firstName) {
        return staffRepository.findByFirstName(firstName);
    }

    public boolean isPhoneNumberUnique(Long phoneNumber) {
        // Implement your logic to check the uniqueness of the phone number
        Staff existingStaff = staffRepository.findByPhoneNumber(phoneNumber);
        return existingStaff == null;
    }

    public long getStaffCount() {
        return staffRepository.count();
    }

    public List<Staff> getStaffByService(String service) {
        // Assuming 'speciality' in Staff entity corresponds to the service
        return staffRepository.findBySpeciality(service);
    }
    public List<Staff> findByServiceAndStaffGroup(Long serviceId, Long staffGroupId) {
        // Implement your logic to fetch staff members based on service and staff group
        return staffRepository.findByServiceAndStaffGroup(serviceId, staffGroupId);
    }
}
