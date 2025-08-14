package org.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Basket {
    private String productName;
    private Integer count;
    private Double price;
    private Integer userId;
}
