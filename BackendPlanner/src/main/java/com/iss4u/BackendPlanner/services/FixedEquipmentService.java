package com.iss4u.BackendPlanner.services;

import com.iss4u.BackendPlanner.entities.eq.FixedEquipment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FixedEquipmentService {
    public List<FixedEquipment> getAllFixedEquipments();
}
