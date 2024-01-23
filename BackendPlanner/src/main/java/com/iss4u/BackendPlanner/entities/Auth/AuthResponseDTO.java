package com.iss4u.BackendPlanner.entities.Auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponseDTO {

    private Long id;
    private String lastName;
    private String firstName;
    private Role role;
    private String gender;
    private LocalDate birthDate;
    private String email;

    private String service;

    private String img;
}
