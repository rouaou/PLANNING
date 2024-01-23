package com.iss4u.BackendPlanner.controllers;

import com.iss4u.BackendPlanner.entities.ExploitationUnit;
import com.iss4u.BackendPlanner.entities.ServiceArea;
import com.iss4u.BackendPlanner.services.ServiceAreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/parameterization/serviceArea")
public class ServiceAreaController {

    @Autowired
    private ServiceAreaService serviceAreaService;

    @PostMapping
    public ResponseEntity<ServiceArea> createServiceArea(@RequestBody ServiceArea serviceArea) {
        serviceAreaService.create(serviceArea);
        return new ResponseEntity<>(serviceArea, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ServiceArea>> getAllServiceAreas() {
        List<ServiceArea> serviceAreas = serviceAreaService.retrieveServiceAreas();
        return new ResponseEntity<>(serviceAreas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceArea> getServiceAreaById(@PathVariable("id") Long serviceAreaId) {
        Optional<ServiceArea> serviceArea = serviceAreaService.getServiceAreaByKy(serviceAreaId);
        return serviceArea.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/ServiceAreaName/{servAreaNm}")
    public ResponseEntity<ServiceArea> getServiceAreaByNm(@PathVariable("serviceNm") String servAreaNm) {
        ServiceArea serviceArea = serviceAreaService.getServiceAreaByNm(servAreaNm);
        if (serviceArea != null) {
            return new ResponseEntity<>(serviceArea, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{serviceAreaKey}/name")
    public String getServiceAreaNameByKey(@PathVariable("servAreaKy") Long servAreaKy) {
        return serviceAreaService.getServiceAreaNameByKey(servAreaKy);
    }

    @PutMapping("/{servAreaKy}")
    public ResponseEntity<ServiceArea> updateServiceArea(@PathVariable Long servAreaKy, @RequestBody ServiceArea updatedServiceArea) {
        try {
            serviceAreaService.update(servAreaKy, updatedServiceArea);
            return ResponseEntity.ok().build(); // Return 200 (OK) without a body
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteServiceArea(@PathVariable("id") Long serviceAreaId) {
        Optional<ServiceArea> existingServiceArea = serviceAreaService.getServiceAreaByKy(serviceAreaId);
        if (existingServiceArea.isPresent()) {
            serviceAreaService.delete(serviceAreaId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/child-elements")
    public ResponseEntity<List<ExploitationUnit>> getChildElements(@PathVariable("id") Long serviceAreaId) {
        Optional<ServiceArea> serviceArea = serviceAreaService.getServiceAreaByKy(serviceAreaId);
        if (serviceArea.isPresent()) {
            List<ExploitationUnit> childElements = serviceAreaService.getChildElements(serviceArea.get());
            return new ResponseEntity<>(childElements, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{id}/child-elements")
    public ResponseEntity<HttpStatus> addChildElement(@PathVariable("id") Long serviceAreaId, @RequestBody ExploitationUnit exploitationUnit) {
        Optional<ServiceArea> serviceAreaOptional = serviceAreaService.getServiceAreaByKy(serviceAreaId);
        if (serviceAreaOptional.isPresent()) {
            serviceAreaService.addChildElement(serviceAreaOptional.get(), exploitationUnit);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
