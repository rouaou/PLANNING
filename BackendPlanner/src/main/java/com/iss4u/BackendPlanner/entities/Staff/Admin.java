package com.iss4u.BackendPlanner.entities.Staff;

import com.iss4u.BackendPlanner.entities.User.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "Admin")
public class Admin extends User {
}
