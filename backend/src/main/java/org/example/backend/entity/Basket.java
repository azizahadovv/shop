package org.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Basket {
    private UUID id;
    private String productName;
    private Integer count;
    private Double price;
    private Integer userId;
}
