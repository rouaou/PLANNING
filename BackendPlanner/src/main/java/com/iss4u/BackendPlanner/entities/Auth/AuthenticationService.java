package com.iss4u.BackendPlanner.entities.Auth;

public interface AuthenticationService {


    AuthResponseDTO getByLoginAndPasswordAndRole(AuthDTO authdata);
}
