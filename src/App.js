import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import StickyHeader from './components/header/StickyHeader';
import OverWatchRandomCharacterGenerator from './pages/overwatch-random-character-generator/OW-RNG';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StickyHeader />} />
                <Route path="/overwatch-random-character-generator" element={<StickyHeader><OverWatchRandomCharacterGenerator /></StickyHeader>} />
            </Routes>
        </Router>
    );
}

export default App;
