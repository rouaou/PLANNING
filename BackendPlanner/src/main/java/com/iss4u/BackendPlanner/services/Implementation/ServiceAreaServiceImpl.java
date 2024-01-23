package com.iss4u.BackendPlanner.services.Implementation;

import com.iss4u.BackendPlanner.entities.ExploitationUnit;
import com.iss4u.BackendPlanner.entities.ServiceArea;
import com.iss4u.BackendPlanner.repositories.ServiceAreaRepository;
import com.iss4u.BackendPlanner.services.ServiceAreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceAreaServiceImpl implements ServiceAreaService {
    private final ServiceAreaRepository serviceAreaRepository;

    @Autowired
    public ServiceAreaServiceImpl(ServiceAreaRepository serviceAreaRepository) {
        this.serviceAreaRepository = serviceAreaRepository;
    }

    @Override
    public void create(ServiceArea serviceArea) {
        serviceAreaRepository.save(serviceArea);
    }

    @Override
    public List<ServiceArea> retrieveServiceAreas() {
        return serviceAreaRepository.findAll();
    }

    @Override
    public Optional<ServiceArea> getServiceAreaByKy(Long serviceAreaKy) {
        return serviceAreaRepository.findById(serviceAreaKy);
    }

    @Override
    public ServiceArea getServiceAreaByNm(String serviceAreaNm) {
        return serviceAreaRepository.findByServAreaNm(serviceAreaNm);
    }

    @Override
    public String getServiceAreaNameByKey(Long serviceAreaKy) {
        Optional<ServiceArea> serviceAreaOptional = serviceAreaRepository.findById(serviceAreaKy);
        return serviceAreaOptional.isPresent() ? serviceAreaOptional.get().getServAreaNm() : "";
    }

    @Override
    public void update(Long serviceAreaKy, ServiceArea updatedServiceArea) {
        ServiceArea existingServiceArea = serviceAreaRepository.findById(serviceAreaKy)
                .orElseThrow(() -> new EntityNotFoundException("Service area with id " + serviceAreaKy + " not found"));

        // Update the properties
        existingServiceArea.setServAreaNm(updatedServiceArea.getServAreaNm());
        existingServiceArea.setServAreaUnxTmUpdt(updatedServiceArea.getServAreaUnxTmUpdt());

        serviceAreaRepository.save(existingServiceArea);
    }

    @Override
    public void delete(Long serviceAreaKy) {
        serviceAreaRepository.deleteById(serviceAreaKy);
    }

    @Override
    public List<ExploitationUnit> getChildElements(ServiceArea serviceArea) {

        return serviceArea.getExploitationUnits();
    }

    @Override
    public void addChildElement(ServiceArea serviceArea, ExploitationUnit exploitationUnit) {
        List<ExploitationUnit> exploitationUnits = serviceArea.getExploitationUnits();
        exploitationUnits.add(exploitationUnit);
        exploitationUnit.setServiceArea(serviceArea);
        serviceAreaRepository.save(serviceArea);
    }
}
