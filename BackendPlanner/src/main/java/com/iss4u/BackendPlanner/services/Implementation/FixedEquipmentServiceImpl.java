package com.iss4u.BackendPlanner.services.Implementation;

import com.iss4u.BackendPlanner.entities.eq.FixedEquipment;
import com.iss4u.BackendPlanner.repositories.FixedEquipmentRepository;
import com.iss4u.BackendPlanner.services.FixedEquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class FixedEquipmentServiceImpl implements FixedEquipmentService {

    @Autowired
    private FixedEquipmentRepository fixedEquipmentRepository;

    public List<FixedEquipment> getAllFixedEquipments() {
        return fixedEquipmentRepository.findAll();
    }
}
