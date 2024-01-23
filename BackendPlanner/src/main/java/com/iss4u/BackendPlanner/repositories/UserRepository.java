package com.iss4u.BackendPlanner.repositories;


import com.iss4u.BackendPlanner.entities.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}