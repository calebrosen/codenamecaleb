import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Menu from './components/header/Menu';
import HomePage from './pages/home/Home.jsx';
import OverWatchRandomCharacterGenerator from './pages/overwatch-random-character-generator/OW-RNG';
import VacationExpenseCalculator from './pages/vacation-expense/vacation-expense.jsx';
import Wasted from './pages/wasted/Wasted.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Menu><HomePage /></Menu>} />
                <Route path="/overwatch-random-character-generator" element={<Menu><OverWatchRandomCharacterGenerator /></Menu>} />
                <Route path="/gta-v-wasted-overlay-generator" element={<Menu><Wasted /></Menu>}></Route>
                <Route path="/vacation-expense-calculator" element={<Menu><VacationExpenseCalculator/></Menu>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
