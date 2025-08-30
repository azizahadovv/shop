package org.example.backend.controller;


import org.example.backend.Db;
import org.example.backend.entity.Role;
import org.example.backend.entity.User;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/user")

public class UserController {

    @GetMapping
    public List<User> getUsers() {
        return Db.users;
    }

    @PostMapping
    public ResponseEntity<?> postUser(@RequestBody User user) {

        user.setId(UUID.randomUUID());
        user.setRole(Role.ADMIN);
        Db.users.add(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Created successfully");
    }


}
