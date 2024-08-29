import {
  faUmbrellaBeach
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useContext, useState } from "react";
import { UserContext } from "../../components/header/UserContext";
import "./vacation-expense.css";


const VacationExpenseCalculator = () => {
  const { userID } = useContext(UserContext);
  const [showLoggedInOptions, setShowLoggedInOptions] = useState(false);
  const [showNameVacation, setShowNameVacation] = useState(false);

  const openLoginOrRegisterMenu = useCallback(() => {
    document.getElementById("loginOrRegister").click();
  }, []);

  const NotLoggedIn = ({ onLogin }) => (
    <div className="centeredContainer">
      <h1 className='vacation-expense'><FontAwesomeIcon icon={faUmbrellaBeach}/> Vacation Expense Calculator</h1>
      <h2 style={{ fontSize: "1.5rem" }}>
        Planning a trip soon but don't know how much you might be spending? You've come to the right place.
      </h2>
      <hr />
      <p className="mainInfoText">
        Please login or create an account so you can save your progress.
      </p>
      <div className="space">
        <button
          className="buttonLoadOrCreate"
          onClick={onLogin}
          aria-label="Login or Create an account"
        >
          Login or Create an account
        </button>
      </div>
    </div>
  );
  
  const LoggedInOptions = () => (
    <div className="centeredContainer">
      <div className="space">
        <button
          className="buttonLoadOrCreate"
          onClick={() => setShowNameVacation(true)}
          aria-label="Start a new vacation expense calculator"
        >
          Start a new vacation expense calculator
        </button>
      </div>
      <div className="space">
        <button className="buttonLoadOrCreate" aria-label="Resume an old one">
          Resume an old one
        </button>
      </div>
    </div>
  );
  
  const StartNew = () => {
    return (
      <div className="centeredContainer">
        <label htmlFor="vacationName">
          <span className='vacationNameLabel'>
          Enter a name for your vacation</span>
          <div>
            <input id="vacationName" className="inputVacationName" placeholder="Enter vacation name" />
          </div>
        </label>
      </div>
    );
  };

  return (
    <div>
      {userID ? (
        showNameVacation ? (
          <StartNew />
        ) : (
          <LoggedInOptions />
        )
      ) : (
        <NotLoggedIn onLogin={openLoginOrRegisterMenu} />
      )}
    </div>
  );
};

export default VacationExpenseCalculator;
