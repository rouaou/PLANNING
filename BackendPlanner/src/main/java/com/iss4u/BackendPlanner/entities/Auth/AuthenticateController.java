package com.iss4u.BackendPlanner.entities.Auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authenticate")
public class AuthenticateController {
    private final AuthenticationService authenticationService;

    public AuthenticateController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthDTO authdata) {
        AuthResponseDTO response = authenticationService.getByLoginAndPasswordAndRole(authdata);
        return new ResponseEntity<>(response, HttpStatus.OK);

    }
}
