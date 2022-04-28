package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RaceResult {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "race_id")
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    private Race race;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "horse_id")
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    private List<Horse> horses;

    private Long winnerHorse;

}
