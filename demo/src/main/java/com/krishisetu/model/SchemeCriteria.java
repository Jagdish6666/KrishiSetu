package com.krishisetu.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "scheme_criteria")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SchemeCriteria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "scheme_id", nullable = false)
    private Scheme scheme;

    private Double minIncome;
    private Double maxIncome;
    private Double minLandSize;
    private Double maxLandSize;

    private String state; // null means applicable to all states
    private String cropType; // null means applicable to all crops
}
