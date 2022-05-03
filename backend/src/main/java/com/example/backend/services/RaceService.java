package com.example.backend.services;

import com.example.backend.models.Horse;
import com.example.backend.models.HorseResult;
import com.example.backend.models.Race;
import com.example.backend.models.RaceResult;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RaceService {
    public List<Race> getRaces();
    public Horse saveHorse(Horse horse);
    public List<Horse> alterHorses(List<Horse> horses);
    public Race saveRace(Race race);
    public Race getRace(Long id);
    public List<Horse> getHorsesByRaceId(Long raceid);
    public RaceResult saveRaceResult(RaceResult raceResult);
    public List<RaceResult> getRaceResults();
    public List<HorseResult> saveHorseResult(List<HorseResult> horseResults);
    public List<HorseResult> getHorseResults();
    public void deleteRace(Long raceId);
}
