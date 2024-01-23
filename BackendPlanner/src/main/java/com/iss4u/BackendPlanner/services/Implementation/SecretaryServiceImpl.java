package com.iss4u.BackendPlanner.services.Implementation;

import com.iss4u.BackendPlanner.entities.Staff.Secretary;
import com.iss4u.BackendPlanner.repositories.SecretaryRepository;
import com.iss4u.BackendPlanner.services.SecretaryService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SecretaryServiceImpl implements SecretaryService {
    private final SecretaryRepository secretaryRepository;

    public SecretaryServiceImpl(SecretaryRepository secretaryRepository) {
        this.secretaryRepository = secretaryRepository;
    }

    @Override
    public Optional<Secretary> getByLoginAndPassword(String login, String password) {
        return secretaryRepository.getByLoginAndPassword(login, password);
    }
}
