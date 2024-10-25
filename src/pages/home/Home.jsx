import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
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
      '.greenHoverBorderEffectHome, .blueHoverBorderEffectHome, .yellowHoverBorderEffectHome, .pinkHoverBorderEffectHome, .redHoverBorderEffectHome'
    );
    
    // looping
    elementWithBorderHoverColorClasses.forEach((element) => {
      const classList = Array.from(element.classList);

      // Looping through classes and removing the hover ones
      classList.forEach((className) => {
        if (className.endsWith('HoverBorderEffectHome')) {
          element.classList.remove(className);
          element.classList.add(color + 'HoverBorderEffectHome');
        }
      });
    });
  }

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

  // This function just returns the local time for use below
  const LocalTime = () => {
    const [currentTime, setCurrentTime] = useState(
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );

    useEffect(() => {
      const updateTime = () => {
        setCurrentTime(
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        );
      };

      updateTime();

      // Setting interival to update time every 5 seconds
      const intervalId = setInterval(updateTime, 5000);

      return () => clearInterval(intervalId);
    }, []);

    return <div>{currentTime} EST</div>;
  };

  return (
    <div className="homePageContainer">
      <div className="fsBackground">
        <div className="main-content">
          {/* Main content section */}
          <div className="mainContentHome redHoverBorderEffectHome">
            {/* Inside of main content box */}
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 mainContentDivIntro">
                <h4>
                  Hi, I'm{" "}
                  <span style={{ fontWeight: "bold", color: "#fff" }}>
                    Caleb
                  </span>
                  , a software developer.
                </h4>
                <h4>
                  Feel free to reach out about any projects you may have in
                  mind, or just to say hello.
                </h4>
                <IconGroup />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <img
                  src={Avatar}
                  className="homePageAvatar"
                  alt="An avatar of Caleb smiling wearing a white button-up shirt"
                ></img>
              </div>
            </div>
          </div>

          <div className="triGridColumn">
            {/* Content block below main content */}
            <div className="triBlockHome redHoverBorderEffectHome">
              <div className="homeLocalTime">
                <LocalTime />
              </div>
            </div>
            
            <div className="triBlockHome portfolioBackground redHoverBorderEffectHome">
              <a href="/portfolio" className='anchorNoDecoration'>
                <div className="portfolioBlockHome">
                  Portfolio <FiArrowUpRight />
                </div>
              </a>
            </div>
            <div className="triBlockHome redHoverBorderEffectHome">
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
                  onClick={(e) => ChangeThemeColor("red", "rgb(189, 17, 17)")}
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
                  onClick={(e) =>
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
                  onClick={(e) => ChangeThemeColor("green", "rgb(36, 163, 19)")}
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
                    onClick={(e) =>
                      ChangeThemeColor("blue", "rgb(9, 176, 226)")
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
                  className="circle pinkBG hoverEffectHomePage"
                  onClick={(e) => ChangeThemeColor("pink", "rgb(212, 13, 238)")}
                ></div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Side content section */}
          <div className="sideContentHome redHoverBorderEffectHome">
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
                      <Star amount={5} />
                    </li>
                    <li>
                      <span className="homeListItemsStack">React</span>{" "}
                      <Star amount={5} />
                    </li>
                    <li>
                      <span className="homeListItemsStack">MySQL</span>{" "}
                      <Star amount={5} />
                    </li>
                    <li>
                      <span className="homeListItemsStack">NodeJS</span>{" "}
                      <Star amount={4} />
                    </li>
                    <li>
                      <span className="homeListItemsStack">CSS</span>{" "}
                      <Star amount={4} />
                    </li>
                    <li>
                      <span className="homeListItemsStack">PHP</span>{" "}
                      <Star amount={4} />
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
        </div>
      </div>
    </div>
  );
};

export default HomePage;
