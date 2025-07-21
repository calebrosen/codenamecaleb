import { useEffect, useState } from "react";

function BalloonGame({ themeColor }) {
  const [balloonGame, setBalloonGame] = useState(false);
  const [balloonGameOnOrOff, setBalloonGameOnOrOff] = useState("Off");
  const [balloonSpeed, setBalloonSpeed] = useState(4);
  const [balloonsPopped, setBalloonsPopped] = useState(0);

  let spawnTimeout;

  // About me content

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
      spawnTimeout = setTimeout(spawnBalloon, Math.random() * 400 + 400); // random delay for spawning
    }
  }

  function moveBalloon(balloon) {
    let moveInterval = setInterval(() => {
      let currentBottom = parseInt(balloon.style.bottom, 10);
      let speed = { balloonSpeed };
      currentBottom += parseInt(speed.balloonSpeed); // move up
      balloon.style.bottom = `${currentBottom}px`;

      if (currentBottom > window.innerHeight) {
        clearInterval(moveInterval);
        balloon.remove(); // cleaninmg up off-screen
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
    }, 85);

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
    <div className="col-start-1 row-start-1 row-span-2 min-h-full px-[0.9rem] py-[0.6rem] bg-[rgba(53,53,53,0.192)] shadow-[rgba(0,0,0,0.4)_0px_4px_7px,rgba(0,0,0,0.3)_0px_9px_15px_-5px,rgba(0,0,0,0.2)_0px_-3px_0px] backdrop-blur-[7.5px] rounded-[10px] border-1 border-[#2f2f2f] redHoverBorderEffectHome">
      <div className="flex flex-col text-left justify-start items-start gap-[0.75rem] p-[0.35rem] text-[1.3rem]">
        <div className="text-left">Balloon Game 🎮</div>
        <div className="text-left">
          Speed{" "}
          <input
            type="range"
            min="1"
            max="14"
            defaultValue="7"
            onChange={ChangeBalloonSpeed}
            style={{ accentColor: themeColor.rgb }}
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
  );
}

export default BalloonGame;
