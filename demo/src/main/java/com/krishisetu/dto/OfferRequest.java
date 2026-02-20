package com.krishisetu.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OfferRequest {

    @NotNull(message = "Crop ID is required")
    private Long cropId;

    @NotNull(message = "Offer price is required")
    @Positive(message = "Offer price must be positive")
    private Double offerPrice;
}
