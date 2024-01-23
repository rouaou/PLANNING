package com.iss4u.BackendPlanner.controllers;

import com.iss4u.BackendPlanner.entities.Service;
import com.iss4u.BackendPlanner.entities.ServiceArea;
import com.iss4u.BackendPlanner.entities.Staff.Staff;
import com.iss4u.BackendPlanner.repositories.ServiceRepository;
import com.iss4u.BackendPlanner.services.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/parameterization/service")
public class ServiceController {

    @Autowired
    private ServiceService servService;
    @Autowired
    private ServiceRepository serviceRepository;
    @GetMapping("/{serviceKy}/staff")
    public ResponseEntity<List<Staff>> getStaffByServiceId(@PathVariable Long serviceKy) {
        List<Staff> staff = serviceRepository.findStaffByServiceId(serviceKy);

        return new ResponseEntity<>(staff, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Service> createService(@RequestBody Service service) {
        servService.create(service);
        return new ResponseEntity<>(service, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Service>> getAllServices() {
        List<Service> services = servService.retrieveServices();
        return new ResponseEntity<>(services, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Service> getServiceById(@PathVariable("id") Long serviceId) {
        Optional<Service> service = servService.getServiceByKy(serviceId);
        return service.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/ServiceName/{serviceNm}")
    public ResponseEntity<Service> getServiceByNm(@PathVariable("serviceNm") String serviceNm) {
        Service service = servService.getServiceByNm(serviceNm);
        if (service != null) {
            return new ResponseEntity<>(service, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{serviceKey}/name")
    public String getServiceNameByKey(@PathVariable("serviceKey") Long serviceKey) {
        return servService.getServiceNameByKey(serviceKey);
    }

    @PutMapping("/{serviceKey}")
    public ResponseEntity<Service> updateService(@PathVariable Long serviceKey, @RequestBody Service updatedService) {
        try {
            servService.update(serviceKey, updatedService);
            return ResponseEntity.ok().build(); // Return 200 (OK) without a body
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteService(@PathVariable("id") Long serviceId) {
        Optional<Service> existingService = servService.getServiceByKy(serviceId);
        if (existingService.isPresent()) {
            servService.delete(serviceId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/child-elements")
    public ResponseEntity<List<ServiceArea>> getChildElements(@PathVariable("id") Long serviceId) {
        Optional<Service> service = servService.getServiceByKy(serviceId);
        if (service.isPresent()) {
            List<ServiceArea> childElements = servService.getChildElements(service.get());
            return new ResponseEntity<>(childElements, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{id}/child-elements")
    public ResponseEntity<HttpStatus> addChildElement(@PathVariable("id") Long serviceId, @RequestBody ServiceArea serviceArea) {
        Optional<Service> service = servService.getServiceByKy(serviceId);
        if (service.isPresent()) {
            servService.addChildElement(service.get(), serviceArea);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
