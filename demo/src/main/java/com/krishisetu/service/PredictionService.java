package com.krishisetu.service;

import com.krishisetu.dto.PricePredictionResponse;
import com.krishisetu.model.*;
import com.krishisetu.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PredictionService {

    private final UserRepository userRepository;
    private final FarmerDetailRepository farmerDetailRepository;
    private final MandiPriceRepository mandiPriceRepository;
    private final CropRepository cropRepository;
    private final WebClient.Builder webClientBuilder;

    private static final String ML_SERVICE_URL = "http://localhost:8000/predict";

    public PricePredictionResponse getPricePrediction(String email, Long cropId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        FarmerDetail farmerDetail = farmerDetailRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Farmer details not found"));

        Crop crop = cropRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException("Crop not found"));

        // 1. Get region info
        String region = farmerDetail.getDistrict() + ", " + farmerDetail.getState();

        // 2. Get latest mandi price
        Optional<MandiPrice> latestMandi = mandiPriceRepository
                .findFirstByCropAndStateAndDistrictOrderByDateDesc(crop, farmerDetail.getState(),
                        farmerDetail.getDistrict());

        Double currentPrice = latestMandi.isPresent() ? latestMandi.get().getPrice()
                : (crop.getAvgMarketPrice() != null ? crop.getAvgMarketPrice() : crop.getPrice());

        // 3. Call ML Service
        Map<String, Object> mlRequest = Map.of(
                "crop_name", crop.getName(),
                "region", region,
                "current_price", currentPrice,
                "demand_index", crop.getDemandIndex() != null ? crop.getDemandIndex() : 0.5);

        try {
            Map mlResponse = webClientBuilder.build()
                    .post()
                    .uri(ML_SERVICE_URL)
                    .bodyValue(mlRequest)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (mlResponse == null)
                throw new RuntimeException("Prediction service returned empty response");

            return PricePredictionResponse.builder()
                    .cropName(crop.getName())
                    .imageUrl(crop.getImageUrl())
                    .currentPrice(currentPrice)
                    .predictedPrice7Days((Double) mlResponse.get("predicted_price"))
                    .trend((String) mlResponse.get("trend"))
                    .build();
        } catch (Exception e) {
            // Log error and return mock/fallback in case ML service is down
            return PricePredictionResponse.builder()
                    .cropName(crop.getName())
                    .imageUrl(crop.getImageUrl())
                    .currentPrice(currentPrice)
                    .predictedPrice7Days(currentPrice * 1.05) // Fallback +5%
                    .trend("UP (Simulated)")
                    .build();
        }
    }
}
