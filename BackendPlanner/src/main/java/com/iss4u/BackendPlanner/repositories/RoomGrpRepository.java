package com.iss4u.BackendPlanner.repositories;

import com.iss4u.BackendPlanner.entities.RoomGrp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomGrpRepository extends JpaRepository<RoomGrp, Long> {
    RoomGrp findByRoomGrpNm(String roomGrpNm);
}
