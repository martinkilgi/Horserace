import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "../style/raceResults.scss"
import { Horse } from './RaceHorses';
import { updateIntersectionTypeNode } from 'typescript';

interface raceResult {
    race: any,
    horses: Horse[],
    winnerId: number
}

const RaceResults: React.FC = () => {

    const [scoresLoaded, setScoresLoaded] = useState(false);
    const [minScore, setMinScore] = useState(10.00);
    const [betWon, setBetWon] = useState(false);
    const [winnerId, setWinnerId] = useState(0);
    const [error, setError] = useState();
    const raceResultRef = useRef({
        race: undefined,
        horses: [],
        winnerHorse: 0
    })

    const location = useLocation();
    const state: any = location.state;


    useEffect(() => {
        console.log(state);

        //Siit tulevad andmed labi, tee siit edasi

        let length = state.current.horses.length;
        let minScore = 10.00;
        console.log(length);

        for (let i = 0; i < length; i++) {
            state.current.horses[i].runTime = (Math.random() * (10.00 - 4.00) + 4.00).toFixed(2);
            if (state.current.horses[i].runTime < minScore) {
                minScore = state.current.horses[i].runTime;
            }
            console.log(state.current.horses[i]);
        }

        setMinScore(minScore);

        for (let i = 0; i < length; i++) {
            console.log(minScore);
            if (state.current.horses[i].runTime === minScore) {
                console.log("score");
                state.current.horses[i].winner = true;
                raceResultRef.current.winnerHorse = i;
            }
        }

        for (let i = 0; i < length; i++) {
            if (state.current.horses[i].winner && state.current.horses[i].betOn) {
                setBetWon(true);
            }
        }

        raceResultRef.current.horses = state.current.horses;
        raceResultRef.current.race = state.current.race;

        setScoresLoaded(true);

        console.log(state.current);
        
        axios.post("http://localhost:8080/api/horse/alter", {
            horses: state.current.horses
        }).then((response) => {
            console.log(response.data);
        }).catch((err) => {
            const error = err.response.data.error;
            console.log(error);
            setError(error);
        })

        // Siit tuleb bad request, fixi see ara voi tee ymber kuidagi see systeem

        axios.post("http://localhost:8080/api/raceresult/save", {
            race: state.current.race,
            horses: state.current.horses,
            winnerHorse: raceResultRef.current.winnerHorse
        }).then((response) => {
            console.log(response.data);
        }).catch((err) => {
            const error = err.response.data.error;
            console.log(error);
            setError(error);
        })

    }, [state])

    return (
        <div className="resultsContainer">
            {betWon ? 
                <div>
                    <h1>Congratulations!</h1>
                    <h2>You won</h2>
                </div>
                :
                <div>
                    <h1>You lost!</h1>
                    <h2>Unfortunately the horse you bet on wasn't the fastest</h2>
                </div>
            }
            {scoresLoaded ? 
            <div className="results">
                {state.current.horses.map((horse: any) => {
                    return (
                        <div style={{backgroundColor: horse.winner === true ? 'green' : 'lightblue'}} className="horse">
                            <h2>{horse.id}</h2>
                            <h2>{horse.name}</h2>
                            <h2>{horse.color}</h2>
                            <h4>{horse.runTime}</h4>
                        </div>
                    )
                })}
            </div> : null
            }
        </div>

    );
}

export default RaceResults;