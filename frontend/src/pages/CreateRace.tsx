import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../style/createRace.scss"

const CreateRace: React.FC = () => {

    const [location, setLocation] = useState("");
    const [time, setTime] = useState("");
    const [error, setError] = useState();

    const navigate = useNavigate();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        axios.post("http://localhost:8080/api/race/save", {
            location: location,
            time: time 
        }).then((response) => {
            console.log(response.data);
        }).catch((err) => {
            const error = err.response.data.error;
            console.log(error);
            setError(error);
        })

        navigate("/");
    }

    return(
        <div className="container">
            <h2>Create race!</h2>
            <div className="inputs">
                <form onSubmit={handleSubmit}>
                    <label>
                        Race location:
                        <input type="text" name="location" onChange={e => {setLocation(e.currentTarget.value)}}/>
                    </label>

                    <label>
                        Race time:
                        <input type="text" name="time" onChange={e => {setTime(e.currentTarget.value)}}/>
                    </label>

                    <button type="submit" value="Create">Create</button>

                </form>
            </div>
        </div>
    )
}

export default CreateRace;