package com.krishisetu.service;

import com.krishisetu.dto.CropRequest;
import com.krishisetu.dto.EligibilityRequest;
import com.krishisetu.model.*;
import com.krishisetu.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FarmerService {

    private final UserRepository userRepository;
    private final CropRepository cropRepository;
    private final OfferRepository offerRepository;
    private final SchemeRepository schemeRepository;
    private final SchemeCriteriaRepository schemeCriteriaRepository;
    private final FarmerDetailRepository farmerDetailRepository;

    @Transactional
    public Crop addCrop(String email, CropRequest request) {
        User farmer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        Crop crop = Crop.builder()
                .farmer(farmer)
                .name(request.getName())
                .quantity(request.getQuantity())
                .price(request.getPrice())
                .location(request.getLocation())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .season(request.getSeason())
                .region(request.getRegion())
                .avgMarketPrice(request.getAvgMarketPrice())
                .demandIndex(request.getDemandIndex())
                .available(true)
                .build();

        return cropRepository.save(crop);
    }

    public List<Crop> getMyCrops(String email) {
        User farmer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));
        return cropRepository.findByFarmer(farmer);
    }

    @Transactional
    public Crop updateCrop(String email, Long cropId, CropRequest request) {
        User farmer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        Crop crop = cropRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException("Crop not found"));

        if (!crop.getFarmer().getId().equals(farmer.getId())) {
            throw new RuntimeException("Unauthorized to update this crop");
        }

        crop.setName(request.getName());
        crop.setQuantity(request.getQuantity());
        crop.setPrice(request.getPrice());
        crop.setLocation(request.getLocation());
        crop.setDescription(request.getDescription());

        return cropRepository.save(crop);
    }

    @Transactional
    public void deleteCrop(String email, Long cropId) {
        User farmer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        Crop crop = cropRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException("Crop not found"));

        if (!crop.getFarmer().getId().equals(farmer.getId())) {
            throw new RuntimeException("Unauthorized to delete this crop");
        }

        cropRepository.delete(crop);
    }

    public List<Offer> getMyOffers(String email) {
        User farmer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));
        return offerRepository.findByCropFarmer(farmer);
    }

    public List<Scheme> checkEligibility(String email, EligibilityRequest request) {
        User farmer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        List<Scheme> eligibleSchemes = new ArrayList<>();
        List<Scheme> allSchemes = schemeRepository.findByActiveTrue();

        for (Scheme scheme : allSchemes) {
            List<SchemeCriteria> criteriaList = schemeCriteriaRepository.findByScheme(scheme);

            boolean eligible = criteriaList.isEmpty()
                    || criteriaList.stream().anyMatch(criteria -> isEligible(criteria, request));

            if (eligible) {
                eligibleSchemes.add(scheme);
            }
        }

        return eligibleSchemes;
    }

    private boolean isEligible(SchemeCriteria criteria, EligibilityRequest request) {
        // Check income criteria
        if (criteria.getMinIncome() != null && request.getAnnualIncome() < criteria.getMinIncome()) {
            return false;
        }
        if (criteria.getMaxIncome() != null && request.getAnnualIncome() > criteria.getMaxIncome()) {
            return false;
        }

        // Check land size criteria
        if (criteria.getMinLandSize() != null && request.getLandSize() < criteria.getMinLandSize()) {
            return false;
        }
        if (criteria.getMaxLandSize() != null && request.getLandSize() > criteria.getMaxLandSize()) {
            return false;
        }

        // Check state criteria
        if (criteria.getState() != null && !criteria.getState().equalsIgnoreCase(request.getState())) {
            return false;
        }

        // Check crop type criteria
        if (criteria.getCropType() != null && request.getCropType() != null &&
                !criteria.getCropType().equalsIgnoreCase(request.getCropType())) {
            return false;
        }

        return true;
    }
}
