package com.iss4u.BackendPlanner.services;

import com.iss4u.BackendPlanner.entities.Bed;
import com.iss4u.BackendPlanner.entities.Room;
import com.iss4u.BackendPlanner.entities.eq.Equipment;

import java.util.List;
import java.util.Optional;

public interface EquipmentService {
    void create(Equipment equipment);

    List<Equipment> retrieveEquipments();

    Optional<Equipment> getEquipmentByKy(Long eqpmntKy);

    Equipment getEquipmentByLabel(String eqpmntLabel);

    String getEquipmentNameByKey(Long eqpmntKy);

    void update(Long eqpmntKy, Equipment updatedEquipment);

    void delete(Long eqpmntKy);

    List<Bed> getChildElements(Equipment equipment);

    void addChildElement(Equipment equipment, Bed bed);
    List<Equipment> getEquipmentByServiceId(Long serviceId);


}
