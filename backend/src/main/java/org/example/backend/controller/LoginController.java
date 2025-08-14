package org.example.backend.controller;

import org.example.backend.Db;
import org.example.backend.entity.Role;
import org.example.backend.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/v1")
public class LoginController {



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> foundUser = Db.users.stream()
                .filter(u -> u.getUsername().equals(user.getUsername()) &&
                        u.getPassword().equals(user.getPassword()))
                .findFirst();

        if (foundUser.isPresent()) {
            return ResponseEntity.ok(foundUser.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> postLogin(@RequestBody User user) {
        user.setId(UUID.randomUUID());
        user.setRole(Role.USER);
        Db.users.add(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Created successfully");
    }
}
