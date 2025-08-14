package org.example.backend.controller;

import org.example.backend.Db;
import org.example.backend.entity.Category;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/category")
public class CategoryController {

    @GetMapping
    public List<Category> getCategories() {
        return Db.categories;
    }

    @PostMapping
    public ResponseEntity<String> createCategory(@RequestBody Category category) {
        category.setId(UUID.randomUUID());
        Db.categories.add(category);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Successfully created category");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable UUID id) {
        boolean removed = Db.categories.removeIf(c -> c.getId().equals(id));
        if (removed) {
            return ResponseEntity.ok("Successfully deleted category");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Category not found");
        }
    }

    @PutMapping
    public ResponseEntity<String> updateCategory(@RequestBody Category category) {
        for (Category existing : Db.categories) {
            if (existing.getId().equals(category.getId())) {
                existing.setName(category.getName());
                return ResponseEntity.ok("Successfully updated category");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Category not found");
    }


}
