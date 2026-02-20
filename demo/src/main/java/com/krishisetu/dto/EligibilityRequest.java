package com.krishisetu.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EligibilityRequest {

    @NotBlank(message = "State is required")
    private String state;

    @NotNull(message = "Land size is required")
    @Positive(message = "Land size must be positive")
    private Double landSize;

    @NotNull(message = "Annual income is required")
    @Positive(message = "Annual income must be positive")
    private Double annualIncome;

    private String cropType;
}
