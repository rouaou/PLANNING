package com.iss4u.BackendPlanner.controllers;


import com.iss4u.BackendPlanner.entities.eq.MobileEquipment;
import com.iss4u.BackendPlanner.services.MobileEquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/mobile-equipments")
public class MobileEquipmentController {

    @Autowired
    private MobileEquipmentService mobileEquipmentService;

    @GetMapping
    public List<MobileEquipment> getAllMobileEquipments() {
        return mobileEquipmentService.getAllMobileEquipments();
    }

}
