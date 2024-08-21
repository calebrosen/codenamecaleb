import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faDiscord, faSteam } from "@fortawesome/free-brands-svg-icons";
import Swal from "sweetalert2";
import "./Home.css";
import "sweetalert2/dist/sweetalert2.min.css";
import AvatarDrawing from "../../img/avatar/Avatar.png";
import AvatarReal from "../../img/avatar/AvatarReal.png";
import { Element, scroller } from "react-scroll";

const HomePage = () => {
  const [imageSrc, setImageSrc] = useState(AvatarDrawing);
  const [clicks, setClicks] = useState(0);
  const [particles, setParticles] = useState([]);
  const [fadeClass, setFadeClass] = useState("");
  const [showEasterEggPopup, setShowEasterEggPopup] = useState(false);
  const [showSection, setShowSection] = useState(false);
  const [easterEggTriggered, setEasterEggTriggered] = useState(false);
  const [easterEggInProgress, setEasterEggInProgress] = useState(false);
  const [scrollTriggeredByClick, setScrollTriggeredByClick] = useState(false);

  const AboutMe = () => {
    return (
      <Element name="aboutMeSection">
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
              I’m a full-stack developer who loves turning ideas into real things - codenamecaleb is proof of that.
              I'm adding new things as I think of them, so feel free to
              look around.
            </p>
            <p>
              By the way, you can view the entire source code of this website{" "}
              <a
                href="https://github.com/calebrosen/codenamecaleb"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              , if you're interested.
            </p>
          </div>
          {showEasterEggPopup && <EasterEggPopup />}
        </div>
      </Element>
    );
  };

  const handleArrowClick = () => {
     setShowSection(true);
     setScrollTriggeredByClick(true);
     setTimeout(() => {
      scroller.scrollTo("aboutMeSection", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }, 50);
    setTimeout(() => {
      setScrollTriggeredByClick(false);
    }, 1000);
  };

  const handleScroll = () => {
    if (scrollTriggeredByClick) return;
    if (window.scrollY < 100) {
      setShowSection(false); 
    }
  };
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollTriggeredByClick]);

  const getRandomColor = () => {
    const colors = [
      "#ff9ff3",
      "#feca57",
      "#ff6b6b",
      "#48dbfb",
      "#1dd1a1",
      "#f368e0",
      "#ff9f43",
      "#54a0ff",
    ];
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
    if (easterEggTriggered || easterEggInProgress) return;

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
            id: Date.now() + Math.random(),
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

  const IconGroup = () => {
    return (
      <nav className="iconContainer">
        <div className="iconBackground">
          <a
            href="https://www.x.com/calebisdead"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div id="x_twitter" className="homeIcon pointer" alt="X/Twitter">
              <FontAwesomeIcon icon={faXTwitter} />
            </div>
          </a>
        </div>
        <div className="iconBackground">
          <a onClick={copyDiscUserNameToClipboard}>
            <div
              id="discord"
              className="homeIcon pointer"
              alt="Discord username"
            >
              <FontAwesomeIcon icon={faDiscord} />
            </div>
          </a>
        </div>
        <div className="iconBackground">
          <a
            href="http://steamcommunity.com/profiles/76561198258977132"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div id="steam" className="homeIcon pointer" alt="Steam Link">
              <FontAwesomeIcon icon={faSteam} />
            </div>
          </a>
        </div>
      </nav>
    );
  };

  const initiateEasterEgg = (e) => {
    setEasterEggInProgress(true);
    setEasterEggTriggered(true);
    setFadeClass("fade-out");
    setTimeout(() => {
      setImageSrc(AvatarReal);
      setFadeClass("fade-in");

      setShowEasterEggPopup(true);

      setTimeout(() => {
        setShowEasterEggPopup(false);
        setEasterEggInProgress(false);
      }, 5500);
    }, 500);
  };

  const copyDiscUserNameToClipboard = () => {
    const textToCopy = "im.caleb";
    navigator.clipboard.writeText(textToCopy).then(() => {
      Swal.fire({
        title: "Copied username!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-center",
        customClass: {
          popup: "my-popup",
        },
      });
    });
  };

  return (
    <div>
      <div className="fsBackground">
        <h1 className="h1Home">codenamecaleb.com</h1>
        <IconGroup />
        <div className="arrowContainer" onClick={handleArrowClick}>
          <div className="styledArrow">▼</div>
        </div>
      </div>

      {showSection && (
        <div className="showOnArrowClick">
          <AboutMe />
        </div>
      )}
    </div>
  );
};

export default HomePage;
