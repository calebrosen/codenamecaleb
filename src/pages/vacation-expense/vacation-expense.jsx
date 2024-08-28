import {
  faUmbrellaBeach
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useContext } from "react";
import { UserContext } from "../../components/header/UserContext";
import "./vacation-expense.css";

const NotLoggedIn = ({ onLogin }) => (
  <div className="centeredContainer">
    <h1><FontAwesomeIcon icon={faUmbrellaBeach}/> Vacation Expense Calculator</h1>
      <h2 style={{fontSize: "1.5rem"}}>Planning a trip soon but don't know how much you might be spending? You've come to the right place.</h2>
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
      <button className="buttonLoadOrCreate" aria-label="Start a new vacation expense calculator">
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

const VacationExpenseCalculator = () => {
  const { userID } = useContext(UserContext);

  const openLoginOrRegisterMenu = useCallback(() => {
    document.getElementById("loginOrRegister").click();
  }, []);

  return (
    <div>
      {userID ? (
        <LoggedInOptions />
      ) : (
        <NotLoggedIn onLogin={openLoginOrRegisterMenu} />
      )}
    </div>
  );
};

export default VacationExpenseCalculator;
