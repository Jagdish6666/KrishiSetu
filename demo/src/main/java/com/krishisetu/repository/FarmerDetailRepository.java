package com.krishisetu.repository;

import com.krishisetu.model.FarmerDetail;
import com.krishisetu.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface FarmerDetailRepository extends JpaRepository<FarmerDetail, Long> {
    Optional<FarmerDetail> findByUser(User user);
}
