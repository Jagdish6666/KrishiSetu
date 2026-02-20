package com.krishisetu.controller;

import com.krishisetu.dto.*;
import com.krishisetu.model.Crop;
import com.krishisetu.model.Offer;
import com.krishisetu.service.BuyerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buyer")
@RequiredArgsConstructor
public class BuyerController {

    private final BuyerService buyerService;

    @GetMapping("/crops")
    public ResponseEntity<ApiResponse<List<Crop>>> getAllCrops(
            @RequestParam(required = false) String location) {
        try {
            List<Crop> crops;
            if (location != null && !location.isEmpty()) {
                crops = buyerService.getCropsByLocation(location);
            } else {
                crops = buyerService.getAllAvailableCrops();
            }
            return ResponseEntity.ok(ApiResponse.success("Crops retrieved successfully", crops));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/offer")
    public ResponseEntity<ApiResponse<Offer>> placeOffer(
            Authentication authentication,
            @Valid @RequestBody OfferRequest request) {
        try {
            Offer offer = buyerService.placeOffer(authentication.getName(), request);
            return ResponseEntity.ok(ApiResponse.success("Offer placed successfully", offer));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/offers")
    public ResponseEntity<ApiResponse<List<Offer>>> getMyOffers(Authentication authentication) {
        try {
            List<Offer> offers = buyerService.getMyOffers(authentication.getName());
            return ResponseEntity.ok(ApiResponse.success("Offers retrieved successfully", offers));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
