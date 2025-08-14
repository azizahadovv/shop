package org.example.backend.controller;


import org.example.backend.Db;
import org.example.backend.entity.Product;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/products")

public class ProductController {

//    All users

    @GetMapping
    public List<Product> getProducts() {
        return Db.products;
    }






}
