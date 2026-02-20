package com.krishisetu.repository;

import com.krishisetu.model.Crop;
import com.krishisetu.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CropRepository extends JpaRepository<Crop, Long> {
    List<Crop> findByFarmer(User farmer);

    List<Crop> findByAvailableTrue();

    List<Crop> findByLocationContainingIgnoreCaseAndAvailableTrue(String location);
}
