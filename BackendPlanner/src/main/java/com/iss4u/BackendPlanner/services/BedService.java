package com.iss4u.BackendPlanner.services;


import com.iss4u.BackendPlanner.entities.Bed;

import java.util.List;
import java.util.Optional;

public interface BedService {
    void create(Bed bed);

    List<Bed> retrieveBeds();

    Optional<Bed> getBedByKy(Long bedKy);

    void update(Long bedKy, Bed updatedBed);

    void delete(Long bedKy);
}
