import React, { useState, useEffect } from 'react';
import "../style/allResults.scss";
import axios from 'axios';



const AllResults: React.FC = () => {
    const [error, setError] = useState();
    const [results, setResults] = useState([]);
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        axios.get("http://localhost:8080/api/raceresults"
        ).then((response) => {
            console.log(response.data);
            if (response.data) {
                setResults(response.data);
            }
        }).catch((err) => {
            const error = err.response.data.error;
            console.log(error);
            setError(error);
        })
    }, [])

    const toggleShow = () => {
        setVisible(!visible);
    }

    // Motle valja kuidas saab nii, et alguses kui race teed, siis salvestab hobused,
    // Aga parast kui race labi, et saaks tulemused jne kylge panna

    // Winning horse number fixi ka ara

    return (
        <div>
            <h2>Here you can browse all the race results</h2>
            <div className="results">
                {results.map((result: any) => {
                    return (
                        <div className="result">
                            <h3>{result.race.location}</h3>
                            <h4>{result.race.time}</h4>
                            <h4>Winning horse number: {result.winnerHorse}</h4>
                            <button onClick={toggleShow}>Arrow</button>
                            {visible ? 
                            <div className="horses">
                                {result.horses.map((horse: any) => {
                                    
                                    return (
                                        <div className="horseResult">
                                            <h2>{horse.id}</h2>
                                            <h2>{horse.name}</h2>
                                            <h2>{horse.runTime}</h2>
                                        </div>
                                    )
                                    
                                })}
                            </div> : null}
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default AllResults;