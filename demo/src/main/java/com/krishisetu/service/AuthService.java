package com.krishisetu.service;

import com.krishisetu.dto.*;
import com.krishisetu.model.FarmerDetail;
import com.krishisetu.model.User;
import com.krishisetu.repository.FarmerDetailRepository;
import com.krishisetu.repository.UserRepository;
import com.krishisetu.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final FarmerDetailRepository farmerDetailRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Create user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .approved(request.getRole() != User.Role.FARMER) // Auto-approve non-farmers
                .build();

        userRepository.save(user);

        // Save farmer details if role is FARMER
        if (request.getRole() == User.Role.FARMER) {
            FarmerDetail farmerDetail = FarmerDetail.builder()
                    .user(user)
                    .landSize(request.getLandSize())
                    .annualIncome(request.getAnnualIncome())
                    .state(request.getState())
                    .district(request.getDistrict())
                    .build();
            farmerDetailRepository.save(farmerDetail);
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole().name())
                .message("Registration successful")
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole().name())
                .message("Login successful")
                .build();
    }
}
