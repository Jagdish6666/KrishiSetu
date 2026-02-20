package com.krishisetu.repository;

import com.krishisetu.model.Offer;
import com.krishisetu.model.Crop;
import com.krishisetu.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
    List<Offer> findByCrop(Crop crop);

    List<Offer> findByBuyer(User buyer);

    List<Offer> findByCropFarmer(User farmer);
}
