package org.example.backend.controller;

import org.example.backend.Db;
import org.example.backend.entity.Role;
import org.example.backend.entity.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import java.util.UUID;

@RestController
@RequestMapping("/v1/admin")

public class AdminController {


    @GetMapping("/checking")
    public ResponseEntity<User> user() {
        return Db.users.stream()
                .filter(u -> u.getRole().equals(Role.ADMIN))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


}
