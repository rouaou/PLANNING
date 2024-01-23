package com.iss4u.BackendPlanner.repositories;

import com.iss4u.BackendPlanner.entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Room findByRoomLabel(String roomLabel);
}
