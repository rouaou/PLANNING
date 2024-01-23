package com.iss4u.BackendPlanner.services;

import com.iss4u.BackendPlanner.entities.Staff.Admin;
import com.iss4u.BackendPlanner.entities.Staff.Staff;

import java.util.Optional;

public interface AdminService {
    Optional<Admin> getByLoginAndPassword(String login, String password);

}
