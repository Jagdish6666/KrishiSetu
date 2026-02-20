package com.krishisetu.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SchemeRequest {

    @NotBlank(message = "Scheme name is required")
    private String name;

    private String description;

    // Criteria
    private Double minIncome;
    private Double maxIncome;
    private Double minLandSize;
    private Double maxLandSize;
    private String state;
    private String cropType;
}
