package org.example.backend.dto;

import lombok.Data;

import java.util.UUID;

@Data

public class CategoryDeleteDto {
    private UUID productId;
    private UUID userId;


}
