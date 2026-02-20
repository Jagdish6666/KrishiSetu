package com.krishisetu.service;

import com.krishisetu.dto.OfferRequest;
import com.krishisetu.model.Crop;
import com.krishisetu.model.Offer;
import com.krishisetu.model.User;
import com.krishisetu.repository.CropRepository;
import com.krishisetu.repository.OfferRepository;
import com.krishisetu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BuyerService {

    private final UserRepository userRepository;
    private final CropRepository cropRepository;
    private final OfferRepository offerRepository;

    public List<Crop> getAllAvailableCrops() {
        return cropRepository.findByAvailableTrue();
    }

    public List<Crop> getCropsByLocation(String location) {
        return cropRepository.findByLocationContainingIgnoreCaseAndAvailableTrue(location);
    }

    @Transactional
    public Offer placeOffer(String email, OfferRequest request) {
        User buyer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        Crop crop = cropRepository.findById(request.getCropId())
                .orElseThrow(() -> new RuntimeException("Crop not found"));

        if (!crop.getAvailable()) {
            throw new RuntimeException("Crop is no longer available");
        }

        Offer offer = Offer.builder()
                .crop(crop)
                .buyer(buyer)
                .offerPrice(request.getOfferPrice())
                .status(Offer.OfferStatus.PENDING)
                .build();

        return offerRepository.save(offer);
    }

    public List<Offer> getMyOffers(String email) {
        User buyer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Buyer not found"));
        return offerRepository.findByBuyer(buyer);
    }
}
