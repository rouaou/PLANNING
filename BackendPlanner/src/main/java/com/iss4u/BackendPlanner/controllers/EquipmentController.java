package com.iss4u.BackendPlanner.controllers;

import com.iss4u.BackendPlanner.entities.Bed;
import com.iss4u.BackendPlanner.entities.eq.Equipment;
import com.iss4u.BackendPlanner.services.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/parameterization/equipment")
public class EquipmentController {

    @Autowired
    private EquipmentService equipmentService;

    @PostMapping
    public ResponseEntity<Equipment> createEquipment(@RequestBody Equipment equipment) {
        equipmentService.create(equipment);
        return new ResponseEntity<>(equipment, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Equipment>> getAllEquipments() {
        List<Equipment> equipments = equipmentService.retrieveEquipments();
        return new ResponseEntity<>(equipments, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Equipment> getEquipmentById(@PathVariable("id") Long equipmentId) {
        Optional<Equipment> equipment = equipmentService.getEquipmentByKy(equipmentId);
        return equipment.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/EquipmentName/{equipmentLabel}")
    public ResponseEntity<Equipment> getEquipmentByEquipmentLabel(@PathVariable("equipmentLabel") String eqpmntLabel) {
        Equipment equipment = equipmentService.getEquipmentByLabel(eqpmntLabel);
        if (equipment != null) {
            return new ResponseEntity<>(equipment, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{equipmentKy}/name")
    public String getEquipmentNameByKey(@PathVariable("equipmentKy") Long eqpmntKy) {
        return equipmentService.getEquipmentNameByKey(eqpmntKy);
    }

    @PutMapping("/{equipmentKy}")
    public ResponseEntity<Equipment> updateEquipment(@PathVariable Long equipmentKy, @RequestBody Equipment updatedEquipment) {
        try {
            equipmentService.update(equipmentKy, updatedEquipment);
            return ResponseEntity.ok().build(); // Return 200 (OK) without a body
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteEquipment(@PathVariable("id") Long equipmentId) {
        Optional<Equipment> existingEquipment = equipmentService.getEquipmentByKy(equipmentId);
        if (existingEquipment.isPresent()) {
            equipmentService.delete(equipmentId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/child-elements")
    public ResponseEntity<List<Bed>> getChildElements(@PathVariable("id") Long equipmentId) {
        Optional<Equipment> equipment = equipmentService.getEquipmentByKy(equipmentId);
        if (equipment.isPresent()) {
            List<Bed> childElements = equipmentService.getChildElements(equipment.get());
            return new ResponseEntity<>(childElements, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{id}/child-elements")
    public ResponseEntity<HttpStatus> addChildElement(@PathVariable("id") Long equipmentId, @RequestBody Bed bed) {
        Optional<Equipment> equipmentOptional = equipmentService.getEquipmentByKy(equipmentId);
        if (equipmentOptional.isPresent()) {
            equipmentService.addChildElement(equipmentOptional.get(), bed);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/byservice/{serviceId}")
    public List<Equipment> getEquipmentByServiceId(@PathVariable Long serviceId) {
        return equipmentService.getEquipmentByServiceId(serviceId);
    }

}
