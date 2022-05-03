package com.example.backend.repositories;

import com.example.backend.models.HorseResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HorseResultRepository extends JpaRepository<HorseResult, Long> {
}
