package com.iss4u.BackendPlanner.controllers;

import com.iss4u.BackendPlanner.entities.eq.Equipment;
import com.iss4u.BackendPlanner.entities.Room;
import com.iss4u.BackendPlanner.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/parameterization/room")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        roomService.create(room);
        return new ResponseEntity<>(room, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        List<Room> rooms = roomService.retrieveRooms();
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable("id") Long roomId) {
        Optional<Room> room = roomService.getRoomByKy(roomId);
        return room.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/roomName/{roomLabel}")
    public ResponseEntity<Room> getRoomByRoomNm(@PathVariable("roomLabel") String roomLabel) {
        Room room = roomService.getRoomByNm(roomLabel);
        if (room != null) {
            return new ResponseEntity<>(room, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{roomKy}")
    public ResponseEntity<Room> updateRoom(@PathVariable Long roomKy, @RequestBody Room updatedRoom) {
        try {
            roomService.update(roomKy, updatedRoom);
            return ResponseEntity.ok().build(); // Return 200 (OK) without a body
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteRoom(@PathVariable("id") Long roomId) {
        Optional<Room> existingRoom = roomService.getRoomByKy(roomId);
        if (existingRoom.isPresent()) {
            roomService.delete(roomId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/child-elements")
    public ResponseEntity<List<Equipment>> getChildElements(@PathVariable("id") Long roomId) {
        Optional<Room> room = roomService.getRoomByKy(roomId);
        if (room.isPresent()) {
            List<Equipment> childElements = roomService.getChildElements(room.get());
            return new ResponseEntity<>(childElements, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{roomId}/assignEquipments")
    public ResponseEntity<Room> assignEquipmentsToRoom(@PathVariable Long roomId, @RequestBody List<Equipment> equipments) {
        Room assignedRoom = roomService.assignEquipmentToRoom(roomId, equipments);
        return ResponseEntity.ok().body(assignedRoom);
    }

    @PostMapping("/{roomId}/unassignEquipment")
    public ResponseEntity<Room> unassignEquipmentFromRoom(@PathVariable Long roomId, @RequestBody Equipment equipment) {
        Room updatedRoom = roomService.unassignEquipmentFromRoom(roomId, equipment);
        return ResponseEntity.ok().body(updatedRoom);
    }

   /* @PostMapping("/{id}/child-elements")
    public ResponseEntity<HttpStatus> addChildElement(@PathVariable("id") Long roomId, @RequestBody Equipment equipment) {
        Optional<Room> roomOptional = roomService.getRoomByKy(roomId);
        if (roomOptional.isPresent()) {
            roomService.addChildElement(roomOptional.get(), equipment);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }*/
}
