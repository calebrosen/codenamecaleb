import React from "react";
import "sweetalert2/dist/sweetalert2.min.css";
import "./Home.css";

const HomePage = () => {
  /*const [imageSrc, setImageSrc] = useState(AvatarDrawing);
  const [clicks, setClicks] = useState(0);
  const [particles, setParticles] = useState([]);
  const [fadeClass, setFadeClass] = useState("");
  const [showEasterEggPopup, setShowEasterEggPopup] = useState(false);
  const [showSection, setShowSection] = useState(false);
  const [easterEggTriggered, setEasterEggTriggered] = useState(false);
  const [easterEggInProgress, setEasterEggInProgress] = useState(false);
  const [scrollTriggeredByClick, setScrollTriggeredByClick] = useState(false);
  const wordsToShow = ["Websites", "Solutions", "Projects", "Tools"];
  const [wordToShow, setWordToShow] = useState(wordsToShow[0]);
  const [isEntering, setIsEntering] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsExiting(false);
        setWordToShow((prevWord) => {
          const currentIndex = wordsToShow.indexOf(prevWord);
          const nextIndex = (currentIndex + 1) % wordsToShow.length;
          return wordsToShow[nextIndex];
        });
        setIsEntering(true);
        setTimeout(() => {
          setIsEntering(false);
        }, 1000);
      }, 1000);
    }, 3500);

    return () => clearInterval(interval);
  }, []);*/

  const AboutMe = () => {
    /*const [timeDifference, setTimeDifference] = useState("");

    useEffect(() => {
      const originDate = new Date("2024-08-15T12:10");

      const updateTimeDifference = () => {
        const now = new Date();
        const diff = now - originDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeDifference(
          `<span style="color: #11c4db; text-shadow: 1px 1px 2px #000;">${days} days</span>,
           <span style="color: #9ae7f1; text-shadow: 1px 1px 2px #000;">${hours} hours</span>,
           <span style="color: #f0a6e0; text-shadow: 1px 1px 2px #000;">${minutes} minutes</span>,
           <span style='color: #df46b1; text-shadow: 1px 1px 2px #000;'>${seconds} seconds</span>`
        );
      };

      updateTimeDifference();

      const intervalId = setInterval(updateTimeDifference, 1000); // updating date every second

      return () => clearInterval(intervalId);
    }, []);*/

    return (
      <div className="aboutMeBorder">
        <div className="aboutMeSection" name="aboutMeSection">
          <div className="about-container">
            <div className="about-content">
              <div className="aboutMeH3Container">
                <h3 className="aboutMeH3">About Me</h3>
              </div>
              <div className="flexAboutMeHome">
                <div className='homeBlocks'>
                  <h4 className='aboutMeH4'>Experience</h4>
                  <p>
                    I've been developing full stack applications for 3 years.
                  </p>
                </div>
                <div className='homeBlocks'>
                  <h4 className='aboutMeH4'>Front End</h4>
                  <p>React • JavaScript • JQuery • TypeScript • HTML • CSS</p>
                </div>
                <div className='homeBlocks'>
                  <h4 className='aboutMeH4'>Back End</h4>
                  <p>SQL • PHP • NodeJS</p>
                </div>
                <div className='homeBlocks'>
                  <h4 className='aboutMeH4'>Styling</h4>
                  <p>CSS • Boostrap • SASS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /*
  const IconGroup = () => {
    return (
      <nav className="iconContainer">
        <div className="iconBackground">
          <a
            href="https://www.x.com/caleberosen"
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
              <FontAwesomeIcon icon={faDiscord} className="homeIcon" />
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
*/

  /*
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
*/

  return (
    <div>
      <div className="fsBackground">
      <section>
            <span className='star'></span>
            <span className='star'></span>
            <span className='star'></span>
            <span className='star'></span>
            <span className='star'></span>
            <span className='star'></span>
            <span className='star'></span>
            <span className='star'></span>
            <span className='star'></span>
            <span className='star'></span>
        </section>
        <h1 className="h1Home">Hi! I'm Caleb.</h1>
        <h2 className="h2Home">I'm a full stack web developer.</h2>
      </div>

      <div className="showOnArrowClick">
        <AboutMe />
      </div>
    </div>
  );
};

export default HomePage;
