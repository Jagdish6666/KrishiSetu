package com.krishisetu.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "farmer_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FarmerDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Double landSize; // in acres

    @Column(nullable = false)
    private Double annualIncome; // in INR

    @Column(nullable = false)
    private String state;

    private String district;
}
