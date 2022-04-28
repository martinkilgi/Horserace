import React, { useEffect, useRef, useState } from "react";
import "../style/raceHorses.scss";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

export interface Horse {
    id: number,
    name: String,
    color: String,
    runTime?: String,
    betOn?: boolean,
    winner?: boolean 
}

interface raceData {
    race: any,
    horses: Horse[],
    winnerId?: number
}

const RaceHorses: React.FC = (props: any) => {

    const [name, setName] = useState<String>("");
    const [color, setColor] = useState<String>("");
    const [error, setError] = useState();
    const [horses, setHorses] = useState<Horse[]>([]);
    const [allHorses, setAllHorses] = useState<any>([]);
    const [bet, setBet] = useState<number>(0);
    const [betSubmitted, setBetSubmitted] = useState<boolean>(false);

    const raceDataRef: any = useRef({
        race: undefined,
        horses: []
    });

    const location = useLocation();
    const state: any = location.state;
    console.log(state);

    useEffect(() => {
        axios.get("http://localhost:8080/api/horsesbyrace", {
            params: {
                raceid: state.id
            }
        }).then((response) => {
            console.log(response.data);
            setHorses(response.data);
            setAllHorses(response.data);
            raceDataRef.current.horses = response.data;
            raceDataRef.current.race = state;
            console.log(state.id);
            if (response.data) {
            }
        }).catch((err) => {
            const error = err.response.data.error;
            console.log(error);
            setError(error);
        })

        console.log(state.id);
        console.log(horses);
        
    }, [state])

    
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        let newHorse = {
            name: name,
            color: color
        }

        setAllHorses([...allHorses, newHorse])


        axios.post("http://localhost:8080/api/horse/save", {
            name: name,
            color: color,
            race: state
        }).then((response) => {
            console.log(response.data);
        }).catch((err) => {
            const error = err.response.data.error;
            console.log(error);
            setError(error);
        })

        window.location.reload();

    }

    const submitBet = () => {
        console.log(horses);

        for (let i = 0; i < horses.length; i++) {
            if (horses[i].id === bet) {
                horses[i].betOn = true;
            }
        }

        setBetSubmitted(true);
    }

    return (
        <>
            <h1>Add horses</h1>
            <div className="raceContainer">
                <div className="raceInfo">
                    <h2>{state.location}</h2>
                    <h2>{state.time}</h2>  
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" onChange={e => {setName(e.currentTarget.value)}}/>
                    </label>

                    <label>
                        Color:
                        <input type="text" name="color" onChange={e => {setColor(e.currentTarget.value)}}/>
                    </label>

                    <button type="submit" value="Create">Add horse</button>

                </form>

                <div>
                    {horses.length === 0 ? <h2>There aren't any horses registered to this race yet</h2> : null}
                </div>
        
                <div className="horses">
                    {horses.map((horse: any) => {
                        return (
                            <div className="horse">
                                <h3>{horse.id}</h3>
                                <h3>{horse.name}</h3>
                                <h3>{horse.color}</h3>
                            </div>
                        )
                    })}
                </div>
                {horses.length !== 0 ? 
                    <div>
                        {betSubmitted ? null : 
                            <div className="bet">
                                <h3>Enter a horse number that you would like to bet on</h3>
                                <input type="number" onChange={e => {setBet(parseInt(e.currentTarget.value))}}/>
                                <button onClick={submitBet}>Submit bet</button>
                            </div>
                        }

                        {/* <Link to="/raceresults" state={horses}>
                            Start race
                        </Link> */}

                        <Link to="/raceresults" state={raceDataRef}>
                            Start race
                        </Link>
                    </div>
                    : null
                }


            </div>
        </>
    )
}

export default RaceHorses;