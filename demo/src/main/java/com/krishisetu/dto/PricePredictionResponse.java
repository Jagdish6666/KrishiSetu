package com.krishisetu.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PricePredictionResponse {
    private String cropName;
    private String imageUrl;
    private Double currentPrice;
    private Double predictedPrice7Days;
    private String trend; // UP/DOWN
}
