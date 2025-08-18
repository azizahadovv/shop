package org.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Product {
    private UUID id;
    private String productName;
    private Integer price;
    private String description;
    private UUID categoryId;
    private UUID userId;

}
