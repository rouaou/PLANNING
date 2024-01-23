package com.iss4u.BackendPlanner.services.Implementation;

import com.iss4u.BackendPlanner.entities.eq.MobileEquipment;
import com.iss4u.BackendPlanner.repositories.MobileEquipmentRepository;
import com.iss4u.BackendPlanner.services.MobileEquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service

public class MobileEquipmentServiceImpl implements MobileEquipmentService {
    @Autowired
    private MobileEquipmentRepository mobileEquipmentRepository;

    public List<MobileEquipment> getAllMobileEquipments() {
        return mobileEquipmentRepository.findAll();
    }
}
