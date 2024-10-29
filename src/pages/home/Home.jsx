import AnalogClock from "analog-clock-react";
import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaDiscord, FaGithub, FaLinkedin, FaStar } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Avatar from "../../img/home/avatar/Avatar.png";
import "./Home.css";

const HomePage = () => {
  const [themeColor, setThemeColor] = useState("red");
  const [boxShadowClass, setBoxShadowClass] = useState("red");
  const [starsColor, setStarsColor] = useState("red");
  const [balloonGame, setBalloonGame] = useState(false);
  const [balloonGameOnOrOff, setBalloonGameOnOrOff] = useState("Off");
  const [balloonSpeed, setBalloonSpeed] = useState(4);
  const [balloonsPopped, setBalloonsPopped] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [RGBColor, setRGBColor] = useState("rgb(189, 17, 17)");
  const [weather, setWeather] = useState("");
  let spawnTimeout;

  //API call to get weather
  /* const WeatherComponent = ({ latitude, longitude }) => {
    const [dataFetched, setDataFetched] = useState(false);


   useEffect(() => {
      if (!dataFetched) {
        const fetchWeatherData = async () => {
          try {
            const res = await axios.post(`https://api.openweathermap.org/data/2.5/weather`, null, {
              params: {
                lat: latitude,
                lon: longitude,
                appid: process.env.REACT_APP_WEATHER_API_KEY,
              },
            });
  
            if (res.data.weather && res.data.weather.length > 0) {
              const weatherMain = res.data.weather[0].main;
              console.log('Weather Main:', weatherMain);
              setWeather(weatherMain.lower());
            }
          } catch (error) {
            console.error('Error fetching weather data:', error);
          } finally {
            // Set to true after fetching data
            setDataFetched(true);
          }
        };
  
        fetchWeatherData();
      }
    }, [dataFetched, latitude, longitude]);
  
    return null;
  };*/

  const IconGroup = () => {
    /* This is for the Icons Group of the Main Content box */

    const copyDiscUserNameToClipboard = () => {
      /* Since you cannot go to a discord username with a link, I am copying my discord username to the clipboard */
      const textToCopy = "im.caleb";
      navigator.clipboard.writeText(textToCopy).then(() => {
        Swal.fire({
          title: "Copied username!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          background: "rgba(53, 53, 53, 0.192)",
          color: "#f9f9f9",
        });
      });
    };

    return (
      /* Icons content (inside of the main content box) */
      <div className="homeIcons">
        {/* Github */}
        <a
          href="https://www.github.com/calebrosen"
          target="_blank"
          rel="noreferrer"
        >
          <div className={boxShadowClass}>
            <FaGithub size={35} />
          </div>
        </a>

        {/* Discord */}
        <div className={boxShadowClass}>
          <FaDiscord size={35} onClick={copyDiscUserNameToClipboard} />
        </div>

        {/* X/Twitter */}
        <a
          href="https://www.x.com/caleberosen"
          target="_blank"
          rel="noreferrer"
        >
          <div className={boxShadowClass}>
            <BsTwitterX size={35} />
          </div>
        </a>

        {/* Email */}
        <a href="mailto:calebethanrosen@gmail.com" rel="noreferrer">
          <div className={boxShadowClass}>
            <MdOutlineEmail size={35} />
          </div>
        </a>

        {/* Linkedin */}
        <a
          href="https://www.linkedin.com/in/caleb-rosen-390b7a178"
          target="_blank"
          rel="noreferrer"
        >
          <div className={boxShadowClass}>
            <FaLinkedin size={35} />
          </div>
        </a>
      </div>
    );
  };

  // CHANGING
  // THEME
  // COLOR
  // SECTION

  useEffect(() => {
    ChangeThemeColor("red", "rgb(189, 17, 17)");
  }, []);

  const ChangeThemeColor = (color, rgb) => {
    setThemeColor(color);
    setRGBColor(rgb);

    const classNames = require("classnames");

    // box shadows
    const boxShadowClasses = classNames(
      "homeIndividualIcon",
      "hoverEffectHomePage",
      color + "BoxShadow"
    );
    setBoxShadowClass(boxShadowClasses);

    // stars
    setStarsColor(rgb);

    // borders (on hover)
    // using native JS instead of defining many className objects
    const elementWithBorderHoverColorClasses = document.querySelectorAll(
      ".greenHoverBorderEffectHome, .blueHoverBorderEffectHome, .yellowHoverBorderEffectHome, .pinkHoverBorderEffectHome, .redHoverBorderEffectHome"
    );

    // looping
    elementWithBorderHoverColorClasses.forEach((element) => {
      const classList = Array.from(element.classList);

      // Looping through classes and removing the hover ones
      classList.forEach((className) => {
        if (className.endsWith("HoverBorderEffectHome")) {
          element.classList.remove(className);
          element.classList.add(color + "HoverBorderEffectHome");
        }
      });
    });
  };

  // END
  // OF
  // CHANGING
  // THEME
  // COLOR
  // SECTION

  const Star = ({ amount }) => {
    // Looping through number passed and returning stars of that amount
    return (
      <>
        {Array.from({ length: amount }, (_, index) => (
          <FaStar key={index} color={starsColor} size={10} />
        ))}
      </>
    );
  };

  // This function is the content of the time block
  const LocalTime = () => {
    const updateTime = useCallback(() => {
      const newTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      // Only update state if the time has changed
      if (newTime !== currentTime) {
        setCurrentTime(newTime);
      }
    }, [currentTime]); // Use currentTime as a dependency

    useEffect(() => {
      const intervalId = setInterval(updateTime, 1000);

      // Initial call to set the time immediately
      updateTime();

      return () => clearInterval(intervalId);
    }, [updateTime]); // Depend on updateTime function

    let handColor = { RGBColor };

    const clockOptions = {
      width: "3vw",
      border: true,
      borderColor: "#2e2e2e",
      baseColor: "#d7d3d3",
      centerColor: "#2f2e2e",
      centerBorderColor: "#d7d3d3",
      handColors: {
        second: handColor.RGBColor,
        minute: "#1a1919",
        hour: "#1a1919",
      },
    };

    // You can call updateTime here if needed
    // updateTime();

    return (
      <div className="clockFlexGroup">
        <span className="clockSpan">
          Local Time:
          <br />
          {currentTime} EST
        </span>
        <span>
          <AnalogClock {...clockOptions} />
        </span>
      </div>
    );
  };

  // START
  // BALLOON
  // GAME

  useEffect(() => {
    if (balloonGame) {
      spawnBalloon();
    } else {
      clearTimeout(spawnTimeout); // Clear the timeout if the game is disabled
    }

    return () => clearTimeout(spawnTimeout);
  }, [balloonGame]);

  function spawnBalloon() {
    if (balloonGame) {
      const balloon = document.createElement("div");
      balloon.textContent = "🎈";
      balloon.style.position = "absolute";
      balloon.style.fontSize = "8vw";
      // Random horizontal position
      balloon.style.left = `${Math.random() * (window.innerWidth - 90)}px`;
      balloon.style.bottom = "0px";
      // Random color
      balloon.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
      balloon.style.zIndex = "9999";
      balloon.style.cursor = "pointer";
      document.body.appendChild(balloon);

      // Start moving the balloon
      let moveInterval = moveBalloon(balloon);

      balloon.addEventListener("click", function () {
        popBalloon(balloon, moveInterval);
      });
      balloon.addEventListener("touchstart", function (event) {
        event.preventDefault();
        popBalloon(balloon, moveInterval);
      });

      // Set the timeout to spawn the next balloon
      spawnTimeout = setTimeout(spawnBalloon, Math.random() * 400 + 400); // Random delay for spawning
    }
  }

  function moveBalloon(balloon) {
    let moveInterval = setInterval(() => {
      let currentBottom = parseInt(balloon.style.bottom, 10);
      let speed = { balloonSpeed };
      currentBottom += parseInt(speed.balloonSpeed); // Move up
      balloon.style.bottom = `${currentBottom}px`;

      if (currentBottom > window.innerHeight) {
        clearInterval(moveInterval);
        balloon.remove(); // Clean up off-screen
      }
    }, 20);
    return moveInterval;
  }

  function popBalloon(balloon, moveInterval) {
    clearInterval(moveInterval);

    // Changing to explosion
    balloon.textContent = "💥";
    balloon.style.filter = "none";

    setTimeout(() => {
      balloon.remove(); // Remove the balloon after a short delay
    }, 100);

    setBalloonsPopped((prevCount) => prevCount + 1);
  }

  const ChangeBalloonSpeed = (e) => {
    let speed = e.target.value;
    setBalloonSpeed(speed);

    //Resetting game to apply speed change
    if (balloonGame) {
      setBalloonGame(false);
      setTimeout(function () {
        setBalloonGame(true);
      }, 100);
    }
  };

  const enableDisableBalloonGame = (e) => {
    const value = e.target.checked;
    setBalloonGame(value);
    if (value) {
      setBalloonGameOnOrOff("On");
    } else {
      setBalloonGameOnOrOff("Off");
    }
  };

  const BalloonGameOnOrOffText = () => {
    return (
      <div
        style={{
          color: "rgb(219, 219, 219)",
          marginRight: "0.5rem",
          verticalAlign: "top",
          display: "inline-block",
        }}
      >
        {balloonGameOnOrOff}
      </div>
    );
  };

  const BalloonGameCounter = () => {
    return (
      <div id="balloonCounter" className="balloonCounter">
        <span
          style={{
            color: "rgb(219, 219, 219)",
            verticalAlign: "top",
          }}
        >
          {balloonsPopped}
        </span>
        🎈
      </div>
    );
  };

  // END BALLOON GAME

  // const WeatherCondition = () => {
  //   switch (weather) {
  //     case 'clouds':
  //       return (

  //       )
  //     case 'clear':

  //     case 'rain':

  //     default:
  //       break;
  //   }
  // }

  return (
    <div className="homePageContainer">
      <div className="fsBackground">
        <div className="main-content">
          {/* Main content section */}
          <motion.div
            initial={{ scale: 0.8, y: 500 }}
            animate={{ scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 12,
              duration: 0.5,
            }}
          >
            <div className="mainContentHome redHoverBorderEffectHome">
              {/* Inside of main content box */}
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 mainContentDivIntro">
                  <h4>
                    Hi, I'm
                    <span style={{ fontWeight: "bold", color: "#fff" }}>
                      &nbsp;Caleb
                    </span>
                    , a software developer.
                  </h4>
                  <h4>
                    Feel free to reach out about any projects you may have in
                    mind, or just to say hello.
                  </h4>
                  <IconGroup />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 avatarSection">
                  <img
                    src={Avatar}
                    className="homePageAvatar"
                    alt="An avatar of Caleb smiling wearing a white button-up shirt"
                  ></img>
                </div>
              </div>
            </div>
          </motion.div>


          <motion.div
            initial={{ scale: 0.6, y: 700 }}
            animate={{ scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 12,
              duration: 0.5,
              delay: 0.1,
            }}
          >
          <div className="triGridColumn">
            {/* Tall Block for Balloon Game */}
            <div className="tallHomeBlock redHoverBorderEffectHome">
              <div className="balloonGame">
                <div className="balloonGameElement">Balloon Game 🎮</div>
                <div className="balloonGameElement">
                  Speed{" "}
                  <input
                    type="range"
                    min="1"
                    max="14"
                    defaultValue="7"
                    onChange={ChangeBalloonSpeed}
                    style={{
                      accentColor: RGBColor,
                    }}
                  />
                </div>
                <div className="balloonGameFlexOnOffAndCounter">
                  <div>
                    <BalloonGameOnOrOffText />
                    <span className="checkbox-wrapper-22">
                      <label className="switch" htmlFor="checkbox">
                        <input
                          type="checkbox"
                          id="checkbox"
                          onClick={enableDisableBalloonGame}
                        />
                        <div
                          className="slider round"
                          style={{ display: "inline-block" }}
                        ></div>
                      </label>
                    </span>
                  </div>
                  <BalloonGameCounter />
                </div>
              </div>
            </div>

            {/* Portfolio Block */}
            <div className="triBlockHome portfolioBackground redHoverBorderEffectHome" id="portfolioBlock">
              <a href="/portfolio" className="anchorNoDecoration">
                <div className="portfolioBlockHome">
                  Portfolio <FiArrowUpRight />
                </div>
              </a>
            </div>

            {/* Color Block with animated color circles */}
            <div className="triBlockHome redHoverBorderEffectHome" id="colorBlock">
              <div className="colorBlockHome">
                <motion.div
                  animate={{
                    scale: [1, 1.18, 0.3, 1],
                    rotate: [0, 0, 180, 180, 0],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                  }}
                >
                  <div
                    className="circle redBG hoverEffectHomePage"
                    onClick={() => ChangeThemeColor("red", "rgb(189, 17, 17)")}
                  ></div>
                </motion.div>

                <motion.div
                  animate={{
                    scale: [1, 1.18, 0.3, 1],
                    rotate: [0, 0, 180, 180, 0],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                  }}
                >
                  <div
                    className="circle yellowBG hoverEffectHomePage"
                    onClick={() =>
                      ChangeThemeColor("yellow", "rgb(212, 177, 21)")
                    }
                  ></div>
                </motion.div>

                <motion.div
                  animate={{
                    scale: [1, 1.18, 0.3, 1],
                    rotate: [0, 0, 180, 180, 0],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                  }}
                >
                  <div
                    className="circle greenBG hoverEffectHomePage"
                    onClick={() =>
                      ChangeThemeColor("green", "rgb(36, 163, 19)")
                    }
                  ></div>
                </motion.div>

                <motion.div
                  animate={{
                    scale: [1, 1.18, 0.3, 1],
                    rotate: [0, 0, 180, 180, 0],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                  }}
                >
                  <div
                    className="circle blueBG hoverEffectHomePage"
                    onClick={() => ChangeThemeColor("blue", "rgb(9, 176, 226)")}
                  ></div>
                </motion.div>

                <motion.div
                  animate={{
                    scale: [1, 1.18, 0.3, 1],
                    rotate: [0, 0, 180, 180, 0],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                  }}
                >
                  <div
                    className="circle pinkBG hoverEffectHomePage"
                    onClick={() =>
                      ChangeThemeColor("pink", "rgb(212, 13, 238)")
                    }
                  ></div>
                </motion.div>
              </div>
            </div>

            {/* Bottom Grid Long */}
            <div className="bottomGrid">
              {/* Bottom Grid Long */}
              <div className="bottomGridLong redHoverBorderEffectHome">
                <div className="homeBottomInterior">
                  <LocalTime />
                </div>
              </div>

              <div className="bottomGridShort redHoverBorderEffectHome">
                <div className="madeWithReact">
                  <div>
                    Built with{" "}
                    <span
                      style={{
                        color: RGBColor,
                        fontSize: '0.9vw',
                        fontWeight: '700'
                      }}
                    >
                      ♡
                    </span>{" "}
                    in React
                  </div>
                </div>
              </div>
            </div>
          </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.6, y: 700 }}
            animate={{ scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 12,
              duration: 0.5,
              delay: 0.2,
            }}
            className="sideContentHome redHoverBorderEffectHome"
            id="sideHome"
          >
            {/* Side content section */}
            <div>
              <h5 className="aboutMeH5">About me</h5>
              <div className="aboutMeSidePanel">
                I'm a full stack developer with a strong desire to learn and
                improve everyday.
                <div className="homeMyStack">
                  My stack:
                  <div className="homeMyStackInner">
                    <ul>
                      <li>
                        <span className="homeListItemsStack">JavaScript</span>{" "}
                        {/* <Star amount={5} /> */}
                      </li>
                      <li>
                        <span className="homeListItemsStack">React</span>{" "}
                        {/* <Star amount={5} /> */}
                      </li>
                      <li>
                        <span className="homeListItemsStack">MySQL</span>{" "}
                        {/* <Star amount={5} /> */}
                      </li>
                      <li>
                        <span className="homeListItemsStack">NodeJS</span>{" "}
                        {/* <Star amount={4} /> */}
                      </li>
                      <li>
                        <span className="homeListItemsStack">CSS</span>{" "}
                        {/* <Star amount={4} /> */}
                      </li>
                      <li>
                        <span className="homeListItemsStack">PHP</span>{" "}
                        {/* <Star amount={4} /> */}
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="sidePanelLowerPart">
                  Beyond coding, I love to cook, work out, and watch anime.
                </p>
                <p className="sidePanelLowerPart">
                  I'm always learning and eager to work with new technologies.
                  Currently, it's on my roadmap to learn Angular and C#/.NET.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
