package com.iss4u.BackendPlanner.repositories;

import com.iss4u.BackendPlanner.entities.Staff.Admin;
import com.iss4u.BackendPlanner.entities.Staff.Secretary;
import com.iss4u.BackendPlanner.entities.Staff.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> getByLoginAndPassword(String login, String password);

}
