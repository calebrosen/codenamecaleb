import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Menu from './components/header/Menu';
import { UserProvider } from "./components/header/UserContext";
import HomePage from './pages/home/Home.jsx';
import Portfolio from './pages/portfolio/Portfolio.jsx';
import Wasted from './pages/wasted/Wasted.jsx';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Menu>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/gta-v-wasted-overlay-generator" element={<Wasted />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                    </Routes>
                </Menu>
            </Router>
        </UserProvider>
    );
}

export default App;
