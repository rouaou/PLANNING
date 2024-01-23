package com.iss4u.BackendPlanner.entities.Staff;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iss4u.BackendPlanner.entities.Service;
import com.iss4u.BackendPlanner.entities.User.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "Secretary")
public class Secretary extends User {


 private String service;
}
