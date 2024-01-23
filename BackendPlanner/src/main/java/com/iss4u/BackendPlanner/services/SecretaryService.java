package com.iss4u.BackendPlanner.services;

import com.iss4u.BackendPlanner.entities.Staff.Secretary;
import com.iss4u.BackendPlanner.entities.Staff.Staff;

import java.util.Optional;

public interface SecretaryService  {
    Optional<Secretary> getByLoginAndPassword(String login, String password);

}
