import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import StickyHeader from './components/header/StickyHeader';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StickyHeader />} />
            </Routes>
        </Router>
    );
}

export default App;
