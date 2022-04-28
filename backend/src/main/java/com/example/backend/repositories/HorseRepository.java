package com.example.backend.repositories;

import com.example.backend.models.Horse;
import com.example.backend.models.Race;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HorseRepository extends JpaRepository<Horse, Long> {
    List<Horse> findAllByRaceId(Long raceid);
}
