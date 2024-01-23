package com.iss4u.BackendPlanner.controllers;

import com.iss4u.BackendPlanner.entities.Bed;
import com.iss4u.BackendPlanner.services.BedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/parameterization/bed")
public class BedController {
    @Autowired
    private BedService bedService;

    @PostMapping
    public ResponseEntity<Bed> createBed(@RequestBody Bed bed) {
        bedService.create(bed);
        return new ResponseEntity<>(bed, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Bed>> getAllBeds() {
        List<Bed> beds = bedService.retrieveBeds();
        return new ResponseEntity<>(beds, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bed> getBedById(@PathVariable("id") Long bedId) {
        Optional<Bed> bed = bedService.getBedByKy(bedId);
        return bed.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @PutMapping("/{bedKy}")
    public ResponseEntity<Bed> updateBed(@PathVariable Long bedKy, @RequestBody Bed updatedBed) {
        try {
            bedService.update(bedKy, updatedBed);
            return ResponseEntity.ok().build(); // Return 200 (OK) without a body
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteBed(@PathVariable("id") Long bedId) {
        Optional<Bed> existingBed = bedService.getBedByKy(bedId);
        if (existingBed.isPresent()) {
            bedService.delete(bedId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
