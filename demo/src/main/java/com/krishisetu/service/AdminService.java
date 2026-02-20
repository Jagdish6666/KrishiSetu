package com.krishisetu.service;

import com.krishisetu.dto.SchemeRequest;
import com.krishisetu.model.Scheme;
import com.krishisetu.model.SchemeCriteria;
import com.krishisetu.model.User;
import com.krishisetu.repository.SchemeCriteriaRepository;
import com.krishisetu.repository.SchemeRepository;
import com.krishisetu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final SchemeRepository schemeRepository;
    private final SchemeCriteriaRepository schemeCriteriaRepository;
    private final UserRepository userRepository;

    @Transactional
    public Scheme addScheme(SchemeRequest request) {
        Scheme scheme = Scheme.builder()
                .name(request.getName())
                .description(request.getDescription())
                .active(true)
                .build();

        scheme = schemeRepository.save(scheme);

        // Create criteria if provided
        if (request.getMinIncome() != null || request.getMaxIncome() != null ||
                request.getMinLandSize() != null || request.getMaxLandSize() != null ||
                request.getState() != null || request.getCropType() != null) {

            SchemeCriteria criteria = SchemeCriteria.builder()
                    .scheme(scheme)
                    .minIncome(request.getMinIncome())
                    .maxIncome(request.getMaxIncome())
                    .minLandSize(request.getMinLandSize())
                    .maxLandSize(request.getMaxLandSize())
                    .state(request.getState())
                    .cropType(request.getCropType())
                    .build();

            schemeCriteriaRepository.save(criteria);
        }

        return scheme;
    }

    public List<Scheme> getAllSchemes() {
        return schemeRepository.findAll();
    }

    @Transactional
    public User approveFarmer(Long farmerId) {
        User farmer = userRepository.findById(farmerId)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        if (farmer.getRole() != User.Role.FARMER) {
            throw new RuntimeException("User is not a farmer");
        }

        farmer.setApproved(true);
        return userRepository.save(farmer);
    }

    public List<User> getAllFarmers() {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole() == User.Role.FARMER)
                .toList();
    }
}
