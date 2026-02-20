package com.krishisetu.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "crops")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "farmer_id", nullable = false)
    private User farmer;

    @Column(nullable = false)
    private String name;

    private String season;
    private String region;
    private String imageUrl;
    private Double avgMarketPrice;
    private Double demandIndex;

    @Column(nullable = false)
    private Double quantity; // in kg or quintals

    @Column(nullable = false)
    private Double price; // per unit

    @Column(nullable = false)
    private String location;

    private String description;

    @Column(nullable = false)
    private Boolean available = true;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
