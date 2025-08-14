package org.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.rmi.server.UID;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class User {
    private UUID id;
    private String username;
    private String password;
    private Role role;


}
