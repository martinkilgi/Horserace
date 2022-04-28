package com.example.backend.controllers;

import com.example.backend.models.Horse;
import com.example.backend.models.Race;
import com.example.backend.models.RaceResult;
import com.example.backend.repositories.RaceResultRepository;
import com.example.backend.services.RaceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class raceController {

    private final RaceService raceService;

    @GetMapping("/races")
    public List<Race> getRaces() {
        return raceService.getRaces();
    }

    @GetMapping("/raceresults")
    public List<RaceResult> getRaceResults() {
        return raceService.getRaceResults();
    }

    @GetMapping("/race/id")
    public Race getRace(@RequestBody Long id) {
        return raceService.getRace(id);
    }

    @PostMapping("/race/save")
    public ResponseEntity<Race> saveRace(@RequestBody Race race) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/race/save").toUriString());

        return ResponseEntity.created(uri).body(raceService.saveRace(race));
    }

    @PostMapping("/horse/save")
    public ResponseEntity<Horse> saveHorse(@RequestBody Horse horse) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/horse/save").toUriString());

        return ResponseEntity.created(uri).body(raceService.saveHorse(horse));
    }

    @PostMapping("/horse/alter")
    public ResponseEntity<List<Horse>> alterHorses(@RequestBody List<Horse> horses) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/horse/alter").toUriString());

        return ResponseEntity.created(uri).body(raceService.alterHorses(horses));
    }

    @GetMapping("/horsesbyrace")
    public List<Horse> getHorsesByRace(@RequestParam Long raceid){

        return raceService.getHorsesByRaceId(raceid);
    }

    @PostMapping("/raceresult/save")
    public ResponseEntity<RaceResult> saveRaceResult(@RequestBody RaceResult raceResult) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/raceresult/save").toUriString());

        return ResponseEntity.created(uri).body(raceService.saveRaceResult(raceResult));
    }



}
