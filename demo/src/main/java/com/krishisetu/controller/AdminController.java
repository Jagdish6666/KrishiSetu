package com.krishisetu.controller;

import com.krishisetu.dto.*;
import com.krishisetu.model.Scheme;
import com.krishisetu.model.User;
import com.krishisetu.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/scheme")
    public ResponseEntity<ApiResponse<Scheme>> addScheme(@Valid @RequestBody SchemeRequest request) {
        try {
            Scheme scheme = adminService.addScheme(request);
            return ResponseEntity.ok(ApiResponse.success("Scheme added successfully", scheme));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/schemes")
    public ResponseEntity<ApiResponse<List<Scheme>>> getAllSchemes() {
        try {
            List<Scheme> schemes = adminService.getAllSchemes();
            return ResponseEntity.ok(ApiResponse.success("Schemes retrieved successfully", schemes));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/approve-farmer/{farmerId}")
    public ResponseEntity<ApiResponse<User>> approveFarmer(@PathVariable Long farmerId) {
        try {
            User farmer = adminService.approveFarmer(farmerId);
            return ResponseEntity.ok(ApiResponse.success("Farmer approved successfully", farmer));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/farmers")
    public ResponseEntity<ApiResponse<List<User>>> getAllFarmers() {
        try {
            List<User> farmers = adminService.getAllFarmers();
            return ResponseEntity.ok(ApiResponse.success("Farmers retrieved successfully", farmers));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
