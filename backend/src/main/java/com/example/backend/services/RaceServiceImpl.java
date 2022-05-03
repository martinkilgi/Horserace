package com.example.backend.services;

import com.example.backend.models.Horse;
import com.example.backend.models.HorseResult;
import com.example.backend.models.Race;
import com.example.backend.models.RaceResult;
import com.example.backend.repositories.HorseRepository;
import com.example.backend.repositories.HorseResultRepository;
import com.example.backend.repositories.RaceRepository;
import com.example.backend.repositories.RaceResultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Array;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j

public class RaceServiceImpl implements RaceService {

    private final RaceRepository raceRepository;
    private final HorseRepository horseRepository;
    private final RaceResultRepository raceResultRepository;
    private final HorseResultRepository horseResultRepository;

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
        log.info("Horses: {}", horses);

        for (int i = 0; i < length; i++) {
            Optional<Horse> optionalHorse = horseRepository.findById(horses.get(i).getId());

            Horse currHorse = optionalHorse.get();

            currHorse.setBetOn(horses.get(i).isBetOn());
            currHorse.setWinner(horses.get(i).isWinner());
            currHorse.setRunTime(horses.get(i).getRunTime());

            horseRepository.save(currHorse);
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

    @Override
    public List<HorseResult> saveHorseResult(List<HorseResult> horseResults) {

        int length = horseResults.size();

        for (int i = 0; i < length; i++) {
            horseResultRepository.save(horseResults.get(i));
        }

        return horseResults;
    }

    @Override
    public List<HorseResult> getHorseResults() {
        return horseResultRepository.findAll();
    }

    @Override
    public void deleteRace(Long raceId) {
        raceRepository.deleteById(raceId);
    }
}
