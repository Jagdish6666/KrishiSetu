package com.krishisetu.repository;

import com.krishisetu.model.SchemeCriteria;
import com.krishisetu.model.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SchemeCriteriaRepository extends JpaRepository<SchemeCriteria, Long> {
    List<SchemeCriteria> findByScheme(Scheme scheme);
}
