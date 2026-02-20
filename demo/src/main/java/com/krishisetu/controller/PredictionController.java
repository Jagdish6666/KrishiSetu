package com.krishisetu.controller;

import com.krishisetu.dto.ApiResponse;
import com.krishisetu.dto.PricePredictionResponse;
import com.krishisetu.service.PredictionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/prediction")
@RequiredArgsConstructor
public class PredictionController {

    private final PredictionService predictionService;

    @GetMapping("/{cropId}")
    public ResponseEntity<ApiResponse<PricePredictionResponse>> getPrediction(
            @PathVariable Long cropId,
            Authentication authentication) {

        PricePredictionResponse response = predictionService.getPricePrediction(authentication.getName(), cropId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Prediction fetched successfully", response));
    }
}
