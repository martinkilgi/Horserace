package com.example.backend.services;

import com.example.backend.models.Horse;
import com.example.backend.models.Race;
import com.example.backend.models.RaceResult;
import com.example.backend.repositories.HorseRepository;
import com.example.backend.repositories.RaceRepository;
import com.example.backend.repositories.RaceResultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Array;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j

public class RaceServiceImpl implements RaceService {

    private final RaceRepository raceRepository;
    private final HorseRepository horseRepository;
    private final RaceResultRepository raceResultRepository;


    @Override
    public List<Race> getRaces() {
        return raceRepository.findAll();
    }

    @Override
    public List<RaceResult> getRaceResults() {
        return raceResultRepository.findAll();
    }

    @Override
    public Horse saveHorse(Horse horse) {
        return horseRepository.save(horse);
    }

    @Override
    public List<Horse> alterHorses(List<Horse> horses) {
        int length = horses.size();

        for (int i = 0; i < length; i++) {
            horseRepository.save(horses.get(i));
        }

        return horses;
    }

    @Override
    public Race saveRace(Race race) {
        return raceRepository.save(race);
    }

    @Override
    public Race getRace(Long id) {
        return raceRepository.getById(id);
    }

    @Override
    public List<Horse> getHorsesByRaceId(Long raceid) {
        return horseRepository.findAllByRaceId(raceid);
    }

    @Override
    public RaceResult saveRaceResult(RaceResult raceResult) {

        return raceResultRepository.save(raceResult);
    }
}
