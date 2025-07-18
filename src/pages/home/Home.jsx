import AnalogClock from "analog-clock-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaDiscord, FaGithub, FaLinkedin, FaStar } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Avatar from "../../img/home/avatar/Avatar.png";
import "./Home.css";
import AboutMe from "./AboutMe.jsx";
import ColorBlock from "./ColorBlock.jsx";

const HomePage = () => {
  const [themeColor, setThemeColor] = useState({"color":"red","rgb":"rgb(189, 17, 17)"});
  const [boxShadowClass, setBoxShadowClass] = useState("red");
  const [balloonGame, setBalloonGame] = useState(false);
  const [balloonGameOnOrOff, setBalloonGameOnOrOff] = useState("Off");
  const [balloonSpeed, setBalloonSpeed] = useState(4);
  const [balloonsPopped, setBalloonsPopped] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  let spawnTimeout;

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
          background: "rgba(20, 20, 20, 1.0)",
          color: "#f9f9f9",
        });
      });
    };

    return (
      /* Icons content (inside of the main content box) */
      <div className="flex justify-start py-4">
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


    const clockOptions = {
      width: "3vw",
      border: true,
      borderColor: "#2e2e2e",
      baseColor: "#d7d3d3",
      centerColor: "#2f2e2e",
      centerBorderColor: "#d7d3d3",
      handColors: {
        second: themeColor.rgb,
        minute: "#1a1919",
        hour: "#1a1919",
      },
    };

    return (
      <div className="flex-[0.66666666] flex justify-between items-center gap-8">
        <span>
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
      clearTimeout(spawnTimeout);
    }

    return () => clearTimeout(spawnTimeout);
  }, [balloonGame]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function spawnBalloon() {
    if (balloonGame) {
      const balloon = document.createElement("div");
      balloon.textContent = "🎈";
      balloon.style.position = "absolute";
      balloon.style.fontSize = "6.5rem";
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

    // changing to explosion
    balloon.textContent = "💥";
    balloon.style.filter = "none";

    setTimeout(() => {
      balloon.remove(); // removing the balloon after a short delay
    }, 100);

    setBalloonsPopped((prevCount) => prevCount + 1);
  }

  const ChangeBalloonSpeed = (e) => {
    let speed = e.target.value;
    setBalloonSpeed(speed);

    //resetting game to apply speed change
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
      <span className="balloonGameOnOrOff">{balloonGameOnOrOff}&nbsp;</span>
    );
  };

  const BalloonGameCounter = () => {
    return (
      <div id="balloonCounter" className="balloonCounter">
        <span className="balloonCounterSpan">{balloonsPopped} 🎈</span>
      </div>
    );
  };

  // END BALLOON GAME



  return (
    <div className="relative h-screen">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgb(20, 20, 20)",
            backgroundSize: "5.2rem 5.2rem",
            backgroundImage: `
            linear-gradient(to right, rgba(44, 43, 43, 1) 1px, transparent 0),
            linear-gradient(to bottom, rgb(44, 43, 43) 1px, transparent 0)
          `,
          }}
        />
      </div>

      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,20,20,0.8) 1%, rgba(20,20,20,0.96) 40%, rgba(23,23,23,1) 100%)",
          }}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">
        <div className="grid [grid-template-columns:78%_22%] [grid-template-rows:subgrid] gap-4 mt-[4.5%] mx-[20%] max-h-[5px] !important items-start">
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
            <div className="col-start-1 col-end-2 row-start-1 px-4 py-[0.9rem] border-[#2f2f2f] border-1 text-[#dbdbdb] text-[1.15vw] bg-[rgba(53,53,53,0.192)] shadow-[rgba(0,0,0,0.4)_0px_4px_7px,rgba(0,0,0,0.3)_0px_9px_15px_-5px,rgba(0,0,0,0.2)_0px_-3px_0px] backdrop-blur-[7.5px] rounded-[10px] font-medium redHoverBorderEffectHome">
              <div className="row">
                <div className="w-full md:col-span-8 lg:col-span-8 xl:col-span-8 flex flex-col justify-between flex-1 my-[0.3rem]">
                  <h4>
                    Hi, I'm
                    <span className="font-bold text-white">&nbsp;Caleb</span>, a
                    software developer.
                  </h4>
                  <h4 id="sm:display-none">
                    Feel free to reach out about any projects you may have in
                    mind, or just to say hello.
                  </h4>
                  <IconGroup />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 relative">
                  <img
                    src={Avatar}
                    className="w-[95%]"
                    alt="An avatar of Caleb smiling wearing a white button-up shirt"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* MOBILE ONLY ABOUT ME */}
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
            className="max-h-full min-h-full h-fit text-[0.78vw] border border-[#2f2f2f] col-start-2 col-end-3 row-start-1 row-span-2 pt-[0.825rem] pr-4 pb-[0.2rem] pl-4 text-[#dbdbdb] bg-[rgba(53,53,53,0.192)] shadow-[rgba(0,0,0,0.4)_0px_4px_7px,rgba(0,0,0,0.3)_0px_9px_15px_-5px,rgba(0,0,0,0.2)_0px_-3px_0px] backdrop-blur-[7.5px] rounded-[10px] redHoverBorderEffectHome"
            id="mobileHomeAboutMe"
          >
            <AboutMe themeColor={themeColor} />
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
            <div
              className="grid grid-cols-3 grid-rows-[auto_auto] gap-y-0 gap-x-4 text-[#dbdbdb]"
              id="balloonGameBlock"
            >
              <div className="col-start-1 row-start-1 row-span-2 min-h-full px-[0.9rem] py-[0.6rem] bg-[rgba(53,53,53,0.192)] shadow-[rgba(0,0,0,0.4)_0px_4px_7px,rgba(0,0,0,0.3)_0px_9px_15px_-5px,rgba(0,0,0,0.2)_0px_-3px_0px] backdrop-blur-[7.5px] rounded-[10px] border-1 border-[#2f2f2f] redHoverBorderEffectHome">
                <div className="flex flex-col text-left justify-start items-start gap-[0.75rem] p-[0.35rem]">
                  <div className="text-left">Balloon Game 🎮</div>
                  <div className="text-left">
                    Speed{" "}
                    <input
                      type="range"
                      min="1"
                      max="14"
                      defaultValue="7"
                      onChange={ChangeBalloonSpeed}
                      style={{ accentColor: themeColor }}
                    />
                  </div>
                  <div className="flex justify-start gap-8">
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

              <a href="/portfolio" className="no-underline">
                <div className="flex-[0.33333333333] min-h-[2.75vw] h-[65%] px-[0.9rem] py-[0.6rem] bg-[rgba(53,53,53,0.192)] shadow-[rgba(0,0,0,0.4)_0px_4px_7px,rgba(0,0,0,0.3)_0px_9px_15px_-5px,rgba(0,0,0,0.2)_0px_-3px_0px] backdrop-blur-[7.5px] rounded-[10px] border-1 border-[#2f2f2f] relative z-[5] transition-all duration-1000 ease-in-out flex items-center text-[1.25vw] portfolioBackground redHoverBorderEffectHome">
                  <div className="flex justify-between items-center w-full">
                    <span>Portfolio</span>
                    <FiArrowUpRight color={themeColor} />
                  </div>
                </div>
              </a>

              <ColorBlock
                themeColor={themeColor}
                setThemeColor={setThemeColor}
                setBoxShadowClass={setBoxShadowClass}
              />

              <div
                className="col-start-2 col-end-[-1] row-start-2 grid gap-4"
                style={{ gridTemplateColumns: "7.75fr 2.25fr" }}
              >
                <div className="col-start-1 px-[0.9rem] border-1 border-[#2f2f2f] bg-[rgba(53,53,53,0.192)] shadow-[rgba(0,0,0,0.4)_0px_4px_7px,rgba(0,0,0,0.3)_0px_9px_15px_-5px,rgba(0,0,0,0.2)_0px_-3px_0px] backdrop-blur-[7.5px] rounded-[10px] redHoverBorderEffectHome">
                  <div className="flex justify-around items-center h-full min-h-[2.75rem] text-[1.2vw] text-center">
                    <LocalTime />
                  </div>
                </div>
                <div className="col-start-2 px-[0.9rem] py-[0.2rem] text-[0.8vw] border-1 border-[#2f2f2f] bg-[rgba(53,53,53,0.192)] shadow-[rgba(0,0,0,0.4)_0px_4px_7px,rgba(0,0,0,0.3)_0px_9px_15px_-5px,rgba(0,0,0,0.2)_0px_-3px_0px] backdrop-blur-[7.5px] rounded-[10px] redHoverBorderEffectHome">
                  <div className="flex justify-around items-center h-full min-h-[2.75rem] text-[0.8vw] text-center">
                    <div>
                      Built with{" "}
                      <span
                        style={{
                          color: themeColor,
                          fontSize: "0.9vw",
                          fontWeight: "700",
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
            className="max-h-full min-h-full h-fit text-[0.78vw] border-1 border-[#2f2f2f] col-start-2 col-end-3 row-start-1 row-span-2 pt-[0.825rem] pr-4 pb-[0.2rem] pl-4 text-[#dbdbdb] bg-[rgba(53,53,53,0.192)] shadow-[rgba(0,0,0,0.4)_0px_4px_7px,rgba(0,0,0,0.3)_0px_9px_15px_-5px,rgba(0,0,0,0.2)_0px_-3px_0px] backdrop-blur-[7.5px] rounded-[10px] redHoverBorderEffectHome"
            id="sideHome"
          >
            <AboutMe themeColor={themeColor} />
          </motion.div>
          
        </div>
      </div>
    </div>
  );
};

export default HomePage;
