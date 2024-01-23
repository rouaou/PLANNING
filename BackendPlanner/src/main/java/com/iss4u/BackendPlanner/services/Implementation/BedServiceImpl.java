package com.iss4u.BackendPlanner.services.Implementation;

import com.iss4u.BackendPlanner.entities.Bed;
import com.iss4u.BackendPlanner.repositories.BedRepository;
import com.iss4u.BackendPlanner.services.BedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class BedServiceImpl implements BedService {

    private final BedRepository bedRepository;

    @Autowired
    public BedServiceImpl(BedRepository bedRepository) {
        this.bedRepository = bedRepository;
    }

    @Override
    public void create(Bed bed) {
        bedRepository.save(bed);
    }

    @Override
    public List<Bed> retrieveBeds() {
        return bedRepository.findAll();
    }

    @Override
    public Optional<Bed> getBedByKy(Long bedKy) {
        return bedRepository.findById(bedKy);
    }

    @Override
    public void update(Long bedKy, Bed updatedBed) {
        Bed existingBed = bedRepository.findById(bedKy)
                .orElseThrow(() -> new EntityNotFoundException("Bed with id " + bedKy + " not found"));

        // Update the properties
        existingBed.setBedNumber(updatedBed.getBedNumber());
        existingBed.setBedType(updatedBed.getBedType());
        existingBed.setBedNote(updatedBed.getBedNote());

        bedRepository.save(existingBed);
    }

    @Override
    public void delete(Long bedKy) {
        bedRepository.deleteById(bedKy);
    }
}
