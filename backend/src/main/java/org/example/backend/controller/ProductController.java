package org.example.backend.controller;


import org.example.backend.Db;
import org.example.backend.dto.CategoryDeleteDto;
import org.example.backend.entity.Category;
import org.example.backend.entity.Product;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/products")

public class ProductController {

// All products for All users

    @GetMapping
    public List<Product> getProducts() {
        return Db.products;
    }

//    { ID } only for you

    @GetMapping("/{userId}")
    public List<Product> getUserProducts(@PathVariable UUID userId) {
        List<Product> products = new ArrayList<>();
        for (Product product : Db.products) {
            if (product.getUserId().equals(userId)) {
                products.add(product);
            }

        }
        return products;
    }


    @PostMapping
    public String addProduct(@RequestBody Product product) {
        product.setId(UUID.randomUUID());
        Db.products.add(product);
        return "Successfully added";
    }


    @DeleteMapping("/{id}")
    public String deleteInId(@PathVariable UUID id) {
        Db.products.removeIf(product -> product.getId().equals(id));
        return "Muvaffaqiyatli o'chirildi";
    }


    @DeleteMapping
    public ResponseEntity<String> deleteProduct(@RequestBody CategoryDeleteDto categoryDeleteDto) {
        // O‘chirilmoqchi bo‘lgan productni topish
        Product productToDelete = Db.products.stream()
                .filter(p -> p.getId().equals(categoryDeleteDto.getProductId()))
                .findFirst()
                .orElse(null);

        if (productToDelete == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Product not found");
        }

        // Egasi ekanligini tekshirish
        if (!productToDelete.getUserId().equals(categoryDeleteDto.getUserId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You are not allowed to delete this product");
        }

        // O‘chirish
        Db.products.remove(productToDelete);
        return ResponseEntity.ok("Successfully deleted product");
    }


    @PutMapping
    public ResponseEntity<String> updateProduct(@RequestBody Product product) {
        for (Product p : Db.products) {
            if (p.getId().equals(product.getId())) {
                p.setProductName(product.getProductName());
                p.setDescription(product.getDescription());
                return ResponseEntity.ok("Successfully updated product");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Product not found");
    }


}
