import React, { useState } from 'react';

const OverWatchRandomCharacterGenerator = () => {
    const [selectedRole, setSelectedRole] = useState('Tank');
    const [randomHero, setRandomHero] = useState('');

    const roles = {
        Tank: ["D.Va", "Doomfist", "Junker Queen", "Mauga", "Orisa", "Ramattra", 
               "Reinhardt", "Roadhog", "Sigma", "Winston", "Wrecking Ball", "Zarya"],
        DPS: ["Ashe", "Bastion", "Cassidy", "Echo", "Genji", "Hanzo", "Junkrat", 
              "Mei", "Pharah", "Reaper", "Soldier: 76", "Sojourn", "Sombra", 
              "Symmetra", "Torbjörn", "Tracer", "Venture", "Widowmaker"],
        Support: ["Ana", "Baptiste", "Brigitte", "Kiriko", "Lifeweaver", "Lucio", 
                  "Mercy", "Moira", "Zenyatta", "Illari"]
    };

    const updateRole = (e) => {
        setSelectedRole(e.target.value);
    };

    const getRandomElement = (array) => {
        return array[Math.floor(Math.random() * array.length)];
    };

    const generateHero = () => {
        const heroes = roles[selectedRole];
        const randomHero = getRandomElement(heroes);
        setRandomHero(randomHero);
    };

    return (
        <div id="container" className="centeredContainer">
            <p className='marginTop4 largeHeader'>Choose your role</p>
            <select className='marginTop3' onChange={updateRole} value={selectedRole}>
                <option value="Tank">Tank</option>
                <option value="DPS">DPS</option>
                <option value="Support">Support</option>
            </select>
            <div className='marginTop4'>
                <button onClick={generateHero}>Generate</button>
            </div>
            {randomHero && (
                <div className='marginTop3' id="appendTo">
                    <p>{randomHero}</p>
                </div>
            )}
        </div>
    );
};

export default OverWatchRandomCharacterGenerator;
