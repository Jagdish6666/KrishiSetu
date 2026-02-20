package com.krishisetu.controller;

import com.krishisetu.dto.*;
import com.krishisetu.model.Crop;
import com.krishisetu.model.Offer;
import com.krishisetu.model.Scheme;
import com.krishisetu.service.FarmerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farmer")
@RequiredArgsConstructor
public class FarmerController {

    private final FarmerService farmerService;

    @PostMapping("/crop")
    public ResponseEntity<ApiResponse<Crop>> addCrop(
            Authentication authentication,
            @Valid @RequestBody CropRequest request) {
        try {
            Crop crop = farmerService.addCrop(authentication.getName(), request);
            return ResponseEntity.ok(ApiResponse.success("Crop added successfully", crop));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/crops")
    public ResponseEntity<ApiResponse<List<Crop>>> getMyCrops(Authentication authentication) {
        try {
            List<Crop> crops = farmerService.getMyCrops(authentication.getName());
            return ResponseEntity.ok(ApiResponse.success("Crops retrieved successfully", crops));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/crop/{id}")
    public ResponseEntity<ApiResponse<Crop>> updateCrop(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody CropRequest request) {
        try {
            Crop crop = farmerService.updateCrop(authentication.getName(), id, request);
            return ResponseEntity.ok(ApiResponse.success("Crop updated successfully", crop));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/crop/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCrop(
            Authentication authentication,
            @PathVariable Long id) {
        try {
            farmerService.deleteCrop(authentication.getName(), id);
            return ResponseEntity.ok(ApiResponse.success("Crop deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/offers")
    public ResponseEntity<ApiResponse<List<Offer>>> getMyOffers(Authentication authentication) {
        try {
            List<Offer> offers = farmerService.getMyOffers(authentication.getName());
            return ResponseEntity.ok(ApiResponse.success("Offers retrieved successfully", offers));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/check-eligibility")
    public ResponseEntity<ApiResponse<List<Scheme>>> checkEligibility(
            Authentication authentication,
            @Valid @RequestBody EligibilityRequest request) {
        try {
            List<Scheme> schemes = farmerService.checkEligibility(authentication.getName(), request);
            return ResponseEntity.ok(ApiResponse.success("Eligible schemes retrieved", schemes));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
