import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import "../style/races.scss"
import RaceList from '../components/RaceList';

interface Race {
    id: number,
    location: String,
    time: String,
}

const Races: React.FC = () => {

    const [error, setError] = useState();
    const [races, setRaces] = useState<Race[]>([]);

    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/api/races").then((response) => {
            console.log(response.data);
            if (response.data) {
                setRaces(response.data);
            }
        }).catch((err) => {
            const error = err.response.data.error;
            console.log(error);
            setError(error);
        })
        
    }, [])

    const changeRoute = () => {
        let path = "/create";
        navigate(path);
    }

    return(
        <div className="container">
            <h2>All races</h2>
            {races.length === 0 ? <h2>There aren't any races created yet</h2> : null}
            <div className="races">
                {races.map((race) => {
                    const raceInfo = {
                        id: race.id,
                        location: race.location,
                        time: race.time
                    }
                    return (
                        <div className="race">
                            <h3>Location: {race.location}</h3>
                            <h3>Time: {race.time}</h3>
                            <Link className="horseButton" to="/horses" state={raceInfo}>
                                Horses
                            </Link>        
                        </div>
                    )
                })}
                <button type="button" onClick={changeRoute}>Create race</button>
            </div>
        </div>
    )
}

export default Races;