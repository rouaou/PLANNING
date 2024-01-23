package com.iss4u.BackendPlanner.controllers;

import com.iss4u.BackendPlanner.entities.RoomGrp;
import com.iss4u.BackendPlanner.entities.Room;
import com.iss4u.BackendPlanner.services.RoomGrpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/parameterization/roomgrp")
public class RoomGrpController {

    @Autowired
    private RoomGrpService roomGrpService;

    @PostMapping
    public ResponseEntity<RoomGrp> createRoomGrp(@RequestBody RoomGrp roomGrp) {
        roomGrpService.create(roomGrp);
        return new ResponseEntity<>(roomGrp, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<RoomGrp>> getAllRoomGrps() {
        List<RoomGrp> roomGrps = roomGrpService.retrieveRoomGroups();
        return new ResponseEntity<>(roomGrps, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomGrp> getRoomGrpById(@PathVariable("id") Long roomGrpId) {
        Optional<RoomGrp> roomGrp = roomGrpService.getRoomGrpByKy(roomGrpId);
        return roomGrp.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/roomGrpName/{roomGrpNm}")
    public ResponseEntity<RoomGrp> getRoomGrpByRoomGrpNm(@PathVariable("roomGrpNm") String roomGrpNm) {
        RoomGrp roomGrp = roomGrpService.getRoomGrpByNm(roomGrpNm);
        if (roomGrp != null) {
            return new ResponseEntity<>(roomGrp, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{roomGroupKey}/name")
    public String getRoomGroupNameByKey(@PathVariable("roomGrpKy") Long roomGrpKy) {
        return roomGrpService.getRoomGrpNameByKey(roomGrpKy);
    }

    @PutMapping("/{roomGrpKy}")
    public ResponseEntity<RoomGrp> updateRoomGrp(@PathVariable Long roomGrpKy, @RequestBody RoomGrp updatedRoomGrp) {
        try {
            roomGrpService.update(roomGrpKy, updatedRoomGrp);
            return ResponseEntity.ok().build(); // Return 200 (OK) without a body
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteRoomGrp(@PathVariable("id") Long roomGrpId) {
        Optional<RoomGrp> existingRoomGrp = roomGrpService.getRoomGrpByKy(roomGrpId);
        if (existingRoomGrp.isPresent()) {
            roomGrpService.delete(roomGrpId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/child-elements")
    public ResponseEntity<List<Room>> getChildElements(@PathVariable("id") Long roomGrpId) {
        Optional<RoomGrp> roomGrp = roomGrpService.getRoomGrpByKy(roomGrpId);
        if (roomGrp.isPresent()) {
            List<Room> childElements = roomGrpService.getChildElements(roomGrp.get());
            return new ResponseEntity<>(childElements, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{id}/child-elements")
    public ResponseEntity<HttpStatus> addChildElement(@PathVariable("id") Long roomGrpId, @RequestBody Room room) {
        Optional<RoomGrp> roomGrpOptional = roomGrpService.getRoomGrpByKy(roomGrpId);
        if (roomGrpOptional.isPresent()) {
            roomGrpService.addChildElement(roomGrpOptional.get(), room);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
