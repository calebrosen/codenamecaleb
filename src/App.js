import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import StickyHeader from './components/header/StickyHeader';
import HomePage from './pages/home/Home.jsx';
import OverWatchRandomCharacterGenerator from './pages/overwatch-random-character-generator/OW-RNG';
import VacationExpenseCalculator from './pages/vacation-expense/vacation-expense.jsx';
import Wasted from './pages/wasted/Wasted.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StickyHeader><HomePage /></StickyHeader>} />
                <Route path="/overwatch-random-character-generator" element={<StickyHeader><OverWatchRandomCharacterGenerator /></StickyHeader>} />
                <Route path="/gta-v-wasted-overlay-generator" element={<StickyHeader><Wasted /></StickyHeader>}></Route>
                <Route path="/vacation-expense-calculator" element={<StickyHeader><VacationExpenseCalculator/></StickyHeader>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
