import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import './App.scss';
import CreateRace from './pages/CreateRace';
import Races from './pages/Races';
import RaceHorses from './pages/RaceHorses';
import RaceResults from './pages/RaceResults';
import AllResults from './pages/AllResults';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
                <Route path='/' element={<Races />}></Route>
                <Route path='/create' element={<CreateRace/>}></Route>
                <Route path='/horses' element={<RaceHorses />}></Route>
                <Route path='/raceresults' element={<RaceResults />}></Route>
                <Route path='/allresults' element={<AllResults />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
