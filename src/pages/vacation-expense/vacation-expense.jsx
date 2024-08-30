import { faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { UserContext } from "../../components/header/UserContext";
import "./vacation-expense.css";

const VacationExpenseCalculator = () => {
  const { userID } = useContext(UserContext);
  const [showNameVacation, setShowNameVacation] = useState(false);
  const [vacationName, setVacationName] = useState("");
  const [vacations, setVacations] = useState([]);
  
  useEffect(() => {
    if (userID) {
      fetchVacations();
    }
  }, [userID]);

  const fetchVacations = () => {
    axios.post(
      `${process.env.REACT_APP_API_URL}/node/vacationCalc/fetchVacations`,
      {
        userID
      }
    )
    .then(response => {
      setVacations(response.data.vacations);
    })
    .catch(error => {
      console.error("Error fetching vacations:", error);
      Swal.fire({
        title: "Oh no! Something happened.",
        showConfirmButton: true,
        text: "We weren't able to fetch your vacations.",
        icon: "error",
        background: "#212529",
        color: "#fff",
        confirmButtonText: "OK",
        confirmButtonColor: "#9e3c4e",
      });
    });
  }
  


  const openLoginOrRegisterMenu = useCallback(() => {
    document.getElementById("loginOrRegister").click();
  }, []);

  const NotLoggedIn = ({ onLogin }) => (
    <div className="centeredContainer">
      <h1 className="vacation-expense">
        <FontAwesomeIcon icon={faUmbrellaBeach} /> Vacation Expense Calculator
      </h1>
      <h2 style={{ fontSize: "1.5rem" }}>
        Planning a trip soon but don't know how much you might be spending?
        You've come to the right place.
      </h2>
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
      <h1 className="vacation-expense">
        <FontAwesomeIcon icon={faUmbrellaBeach} /> Vacation Expense Calculator
      </h1>
      <h2 style={{ fontSize: "1.5rem" }}>
        Planning a trip soon but don't know how much you might be spending?
        You've come to the right place.
      </h2>
      <div className="space">
        <button
          className="buttonLoadOrCreate"
          onClick={() => setShowNameVacation(true)}
          aria-label="Start a new vacation expense calculator"
        >
          Start a new vacation expense calculator
        </button>
        <div className='previousVacations'>
          &nbsp;or choose a previous one:
          {vacations.length > 0 ? (
          vacations.map((vacation, index) => (
            <div key={index} data-custom-vacation-id={vacation.id} className='loadedVacationsText'>
              {vacation.vacation_name}
            </div>
          ))
        ) : (
          <p>No vacations found.</p>
        )}
        </div>
      </div>
      <div className="space"></div>
    </div>
  );

  const ConfirmName = () => {
    Swal.fire({
      title: `Create vacation with name "${vacationName}"?`,
      text: "You will be able to change this later.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      color: "#FFF",
      background: "#212529",
      confirmButtonText: "Yes, create it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(
            `${process.env.REACT_APP_API_URL}/node/vacationCalc/createVacationName`,
            {
              userID,
              vacationName,
            }
          );
          Swal.fire({
            title: "Created!",
            text: `Your vacation "${vacationName}" has been created.`,
            icon: "success",
            timer: "3000"
          });
        } catch (error) {
          Swal.fire({
            title: "Oh no! Something happened.",
            showConfirmButton: true,
            text: "We weren't able to create your vacation. Please try again.",
            icon: "error",
            background: "#212529",
            color: "#fff",
            confirmButtonText: "OK",
            confirmButtonColor: "#9e3c4e",
          });
        }
      }
    });
  };

  const handleVacationNameChange = (e) => {
    setVacationName(e.target.value);
  };

  const StartNew = () => {
    return (
      <div className="centeredContainer">
        <label htmlFor="vacationName">
          <span className="vacationNameLabel">Enter a name for your vacation</span>
          <div>
            <input
              id="vacationName"
              key="inputForVacationName"
              autoFocus="autoFocus"
              className="inputVacationName"
              placeholder="Enter vacation name"
              maxLength="255"
              value={vacationName}
              onChange={handleVacationNameChange}
            />
          </div>
        </label>
        <button
          className="primaryButton"
          onClick={ConfirmName}
          aria-label="Confirm vacation name"
        >
          Create Vacation
        </button>
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
