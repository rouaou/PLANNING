package com.iss4u.BackendPlanner.controllers;

import com.iss4u.BackendPlanner.entities.eq.FixedEquipment;
import com.iss4u.BackendPlanner.services.FixedEquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/fixed-equipments")
public class FixedEquipmentController {

    @Autowired
    private FixedEquipmentService fixedEquipmentService;

    @GetMapping
    public List<FixedEquipment> getAllFixedEquipments() {
        return fixedEquipmentService.getAllFixedEquipments();
    }

    // Ajoutez d'autres méthodes du contrôleur en fonction des besoins
}