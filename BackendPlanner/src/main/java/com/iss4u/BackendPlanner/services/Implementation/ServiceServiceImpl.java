package com.iss4u.BackendPlanner.services.Implementation;

import com.iss4u.BackendPlanner.entities.Service;
import com.iss4u.BackendPlanner.entities.ServiceArea;
import com.iss4u.BackendPlanner.repositories.ServiceRepository;
import com.iss4u.BackendPlanner.services.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ServiceServiceImpl implements ServiceService {

    private final ServiceRepository serviceRepository;

    @Autowired
    public ServiceServiceImpl(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @Override
    public void create(Service service) {
        serviceRepository.save(service);
    }

    @Override
    public List<Service> retrieveServices() {
        return serviceRepository.findAll();
    }

    @Override
    public Optional<Service> getServiceByKy(Long serviceKy) {
        return serviceRepository.findById(serviceKy);
    }

    @Override
    public Service getServiceByNm(String serviceNm) {
        return serviceRepository.findByServiceNm(serviceNm);
    }

    @Override
    public String getServiceNameByKey(Long serviceKy) {
        Optional<Service> serviceOptional = serviceRepository.findById(serviceKy);
        return serviceOptional.isPresent() ? serviceOptional.get().getServiceNm() : "";
    }

    @Override
    public void update(Long serviceKy, Service updatedService) {
        Service existingService = serviceRepository.findById(serviceKy)
                .orElseThrow(() -> new EntityNotFoundException("Service with id " + serviceKy + " not found"));

        // Update the properties
        existingService.setServiceNm(updatedService.getServiceNm());
        existingService.setServiceUnxTmUpdt(updatedService.getServiceUnxTmUpdt());

        serviceRepository.save(existingService);
    }

    @Override
    public void delete(Long serviceKy) {
        serviceRepository.deleteById(serviceKy);
    }

    @Override
    public List<ServiceArea> getChildElements(Service service) {
        return service.getServiceAreas();
    }

    @Override
    public void addChildElement(Service service, ServiceArea serviceArea) {
        List<ServiceArea> serviceAreas = service.getServiceAreas();
        serviceAreas.add(serviceArea);
        serviceArea.setService(service);
        serviceRepository.save(service);
    }
}
