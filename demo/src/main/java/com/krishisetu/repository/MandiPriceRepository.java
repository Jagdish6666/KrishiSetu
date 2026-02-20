package com.krishisetu.repository;

import com.krishisetu.model.Crop;
import com.krishisetu.model.MandiPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MandiPriceRepository extends JpaRepository<MandiPrice, Long> {
    List<MandiPrice> findByCropAndStateAndDistrictOrderByDateDesc(Crop crop, String state, String district);

    Optional<MandiPrice> findFirstByCropAndStateAndDistrictOrderByDateDesc(Crop crop, String state, String district);
}
