import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import './OW-RNG.css';

const OverWatchRandomCharacterGenerator = () => {
    const [selectedRole, setSelectedRole] = useState('Tank');
    const [randomHero, setRandomHero] = useState('');
    const [history, setHistory] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState('');
    const [showGeneratedHero, setShowGeneratedHero] = useState(false);
    const [audioStatus, setAudioStatus] = useState(false);

    const roles = {
        Tank: ["D.Va", "Doomfist", "Junker Queen", "Mauga", "Orisa", "Ramattra", 
               "Reinhardt", "Roadhog", "Sigma", "Winston", "Wrecking Ball", "Zarya"],
        DPS: ["Ashe", "Bastion", "Cassidy", "Echo", "Genji", "Hanzo", "Junkrat", 
              "Mei", "Pharah", "Reaper", "Soldier: 76", "Sojourn", "Sombra", 
              "Symmetra", "Torbjörn", "Tracer", "Venture", "Widowmaker"],
        Support: ["Ana", "Baptiste", "Brigitte", "Kiriko", "Lifeweaver", "Lucio", 
                  "Mercy", "Moira", "Zenyatta", "Illari", "Juno"]
    };

    const updateRole = (e) => {
        setSelectedRole(e.target.value);
    };

    const getRandomElement = (array) => {
        return array[Math.floor(Math.random() * array.length)];
    };

    const setBackground = (hero) => {
        let imagePath = require(`../../img/ow-characters/${hero.toLowerCase().replace(/[: ]/g, '-')}.webp`);
        setBackgroundImage(imagePath);
    };

    const generateHero = (e) => {

        createParticles(e);

        const heroes = roles[selectedRole];
        const randomHero = getRandomElement(heroes);
        setRandomHero(randomHero);
        setBackground(randomHero);
        setHistory(prevHistory => [{ role: selectedRole, hero: randomHero }, ...prevHistory]);

        playVoiceLine(randomHero)

        setShowGeneratedHero(false);
        setTimeout(() => {
            setShowGeneratedHero(true);
        }, 1);
    };

    const handleCheckbox = (e) => {
        setAudioStatus(e.target.checked);
    }

    const playVoiceLine = (hero) => {
        // aivoicegenerator.com - [standard, male] matthew
        if (audioStatus) { 
            const voiceLinePath = require(`../../../public/audio/ow-voicelines/${hero.toLowerCase().replace(/[: ]/g, '-')}.mp3`);
            const audio = new Audio(voiceLinePath);
            audio.play();
        }
    };

    const createParticles = (e) => {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particlesContainer';
        document.body.appendChild(particlesContainer);
    
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('span');
            particle.className = 'particle';
            particlesContainer.appendChild(particle);
    
            const size = Math.random() * 10 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
    
            const initialX = e.clientX;
            const initialY = e.clientY;
    
            particle.style.left = `${initialX}px`;
            particle.style.top = `${initialY}px`;
    
            const xOffset = (Math.random() - 0.75) * 100; 
            const yOffset = (Math.random() - 0.75) * 100; 
    
            particle.style.setProperty('--x', `${xOffset}px`);
            particle.style.setProperty('--y', `${yOffset}px`);
    
            particle.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
        }
    
        setTimeout(() => {
            particlesContainer.remove();
        }, 1500);
    };

    const clearHistory = (e) => {
        setHistory([]);
        setRandomHero('');
        setBackgroundImage('');
    } 
    
    return (
        <div className="backgroundContainer">
            <div 
                className="fullScreenContainer"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    overflow: 'hidden',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="contentWrapper">
                    <div className='space-between marginBottom1'>
                        <label className='smLabel'>Play audio&nbsp;
                            <input type="checkbox" onClick={handleCheckbox} />
                        </label>
                        {history.length > 0 && (
                            <div onClick={clearHistory}>
                                <span className='pointer whiteText'>Clear History <FontAwesomeIcon icon={faEraser} /></span>
                            </div>
                        )}
                    </div>
                    <p className="marginTop4 largeHeader">Choose your role</p>
                    <select className="selectDropdown marginTop3" onChange={updateRole} value={selectedRole}>
                        <option value="Tank">Tank</option>
                        <option value="DPS">DPS</option>
                        <option value="Support">Support</option>
                    </select>
                    <div className="marginTop2">
                        <button className="generateButton" onClick={generateHero}>Generate</button>
                    </div>
                    {randomHero && (
                        <div className={`generatedHero marginTop3 ${showGeneratedHero ? 'show' : ''}`}>
                            <p className="generatedHeroP">{randomHero}</p>
                        </div>
                    )}
                    {history.length > 0 && (
                    <div className="historyContainer marginTop4">
                        <h3>History:</h3>
                        <ul className="historyList">
                            {history.map((entry, index) => (
                                <li key={index} className="historyItem">
                                    <span className="role">{entry.role}:</span> {entry.hero}
                                </li>
                            ))}
                        </ul>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OverWatchRandomCharacterGenerator;
