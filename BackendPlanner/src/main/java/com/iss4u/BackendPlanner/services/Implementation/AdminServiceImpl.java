package com.iss4u.BackendPlanner.services.Implementation;

import com.iss4u.BackendPlanner.entities.Staff.Admin;
import com.iss4u.BackendPlanner.repositories.AdminRepository;
import com.iss4u.BackendPlanner.services.AdminService;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class AdminServiceImpl implements AdminService {
    private final AdminRepository adminRepository;

    public AdminServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public Optional<Admin> getByLoginAndPassword(String login, String password) {
        return adminRepository.getByLoginAndPassword(login, password);
    }
}
