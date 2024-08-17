import React, { useState } from 'react';
import AvatarDrawing from '../../img/avatar/Avatar.png';
import AvatarReal from '../../img/avatar/AvatarReal.png';

const AboutMe = () => {
  const [imageSrc, setImageSrc] = useState(AvatarDrawing);
  const [clicks, setClicks] = useState(0);
  const [particles, setParticles] = useState([]);
  const [fadeClass, setFadeClass] = useState('');
  const [showEasterEggPopup, setShowEasterEggPopup] = useState(false);
  const [easterEggTriggered, setEasterEggTriggered] = useState(false);

  const getRandomColor = () => {
    const colors = ['#ff9ff3', '#feca57', '#ff6b6b', '#48dbfb', '#1dd1a1', '#f368e0', '#ff9f43', '#54a0ff'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const EasterEggPopup = () => {
    return (
      <div className="easterEggPopupText">
        Congrats! You've discovered an easter egg.
      </div>
    );
  };

  const MagicEffect = ({ x, y }) => {
    return (
      <div className="magic-container" style={{ left: x, top: y }}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="magic-particle star-shape"
            style={{ backgroundColor: getRandomColor() }}
          ></div>
        ))}
      </div>
    );
  };

  const handleEasterEggClick = (e) => {
    if (easterEggTriggered) return;

    setClicks((prevClicks) => {
      const newClicks = prevClicks + 1;

      if (newClicks === 50 && !easterEggTriggered) {
        initiateEasterEgg(e);
      } else if (newClicks < 50) {
        const numberOfParticles = Math.floor(Math.random() * 2) + 1;
        const newParticles = Array.from({ length: numberOfParticles }, () => {
          const offsetX = (Math.random() - 0.5) * 50;
          const offsetY = (Math.random() - 0.5) * 50;
          return {
            x: e.clientX + offsetX,
            y: e.clientY + offsetY,
            id: Date.now() + Math.random()
          };
        });

        setParticles((prev) => [...prev, ...newParticles]);

        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
        }, 1500);
      }

      return newClicks;
    });
  };

  const initiateEasterEgg = (e) => {
    setEasterEggTriggered(true);
    setFadeClass('fade-out');
    setTimeout(() => {
      setImageSrc(AvatarReal);
      setFadeClass('fade-in');

      setShowEasterEggPopup(true);

      setTimeout(() => {
        setShowEasterEggPopup(false);
      }, 5500);
    }, 500);
  };

  return (
    <div className="about-container">
      <div className="profile-picture" onClick={handleEasterEggClick}>
        <img
          src={imageSrc}
          id="avatarImg"
          className={`${fadeClass} easterEggAvatar`}
          alt="Profile Picture"
        />
        {particles.map((p) => (
          <MagicEffect key={p.id} x={p.x} y={p.y} />
        ))}
      </div>
      <div className="about-content">
        <h1 className="about-me">Hey there! I'm Caleb.</h1>
        <p>
          I’m a full-stack developer who loves turning ideas into real things. I'm constantly adding new things as I think of them, so, look around. Stay a while.
        </p>
        <p>
          By the way, you can view the entire source code of this website <a href='https://github.com/calebrosen/codenamecaleb' target='_blank' rel="noopener noreferrer">here</a>, if you're interested.
        </p>
      </div>
      {showEasterEggPopup && <EasterEggPopup />}
    </div>
  );
};

export default AboutMe;
