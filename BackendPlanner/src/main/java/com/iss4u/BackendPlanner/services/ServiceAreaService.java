package com.iss4u.BackendPlanner.services;

import com.iss4u.BackendPlanner.entities.ExploitationUnit;
import com.iss4u.BackendPlanner.entities.ServiceArea;

import java.util.List;
import java.util.Optional;

public interface ServiceAreaService {
    void create(ServiceArea serviceArea);

    List<ServiceArea> retrieveServiceAreas();

    Optional<ServiceArea> getServiceAreaByKy(Long serviceAreaKy);

    ServiceArea getServiceAreaByNm(String serviceAreaNm);

    String getServiceAreaNameByKey(Long serviceAreaKy);

    void update(Long serviceAreaKy, ServiceArea updatedServiceArea);

    void delete(Long serviceAreaKy);

    List<ExploitationUnit> getChildElements(ServiceArea serviceArea);

    void addChildElement(ServiceArea serviceArea, ExploitationUnit exploitationUnit);
}
