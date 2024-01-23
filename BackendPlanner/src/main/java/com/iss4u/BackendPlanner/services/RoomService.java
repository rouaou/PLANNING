package com.iss4u.BackendPlanner.services;

import com.iss4u.BackendPlanner.entities.eq.Equipment;
import com.iss4u.BackendPlanner.entities.Room;

import java.util.List;
import java.util.Optional;

public interface RoomService {
    void create(Room room);

    List<Room> retrieveRooms();

    Optional<Room> getRoomByKy(Long roomKy);

    Room getRoomByNm(String roomLabel);

    String getRoomNameByKey(Long roomKy);

    void update(Long roomKy, Room updatedRoom);

    void delete(Long RoomKy);

    List<Equipment> getChildElements(Room room);

    void addChildElement(Room room, Equipment equipment);

    public Room assignEquipmentToRoom(Long roomId, List<Equipment> equipments);

    Room unassignEquipmentFromRoom(Long roomId, Equipment equipment);
}
