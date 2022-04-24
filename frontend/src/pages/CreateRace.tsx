import React from 'react';
import "../style/createRace.scss"

const CreateRace: React.FC = () => {

    return(
        <div className="container">
            <h2>Create race!</h2>
            <div className="inputs">
                <form>
                    <label>
                        Race name:
                        <input type="text" name="name" />
                    </label>

                    <label>
                        Race time:
                        <input type="text" name="time" />
                    </label>




                    <button type="submit" value="Create">Create</button>

                </form>
            </div>
        </div>
    )
}

export default CreateRace;