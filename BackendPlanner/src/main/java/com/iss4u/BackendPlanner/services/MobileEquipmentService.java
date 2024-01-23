package com.iss4u.BackendPlanner.services;

import com.iss4u.BackendPlanner.entities.eq.MobileEquipment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public interface MobileEquipmentService {
    public List<MobileEquipment> getAllMobileEquipments() ;

    }
