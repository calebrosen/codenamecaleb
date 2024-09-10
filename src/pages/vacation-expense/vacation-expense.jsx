import {
  faPlane,
  faPlaneArrival,
  faPlaneDeparture,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { UserContext } from "../../components/header/UserContext";
import "./vacation-expense.css";

const VacationExpenseCalculator = () => {
  const { userID, userName } = useContext(UserContext);
  const [showNameVacation, setShowNameVacation] = useState(false);
  const [vacationName, setVacationName] = useState("");
  const [vacations, setVacations] = useState([]);
  const [showToAndFrom, setShowToAndFrom] = useState(false);
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [vacationID, setVacationID] = useState("");
  const [vacationState, setVacationState] = useState("");
  const [mainScreenVar, setMainScreenVar] = useState(false);
  const [vacationMainData, setVacationMainData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);

  const SwalError = (message) => {
    Swal.fire({
      title: "Oh no! Something happened.",
      showConfirmButton: true,
      text: message,
      icon: "error",
      background: "#212529",
      color: "#fff",
      confirmButtonText: "OK",
      confirmButtonColor: "#9e3c4e",
    });
  };

  useEffect(() => {
    if (userID) {
      fetchVacations();
    }
  }, [userID]);

  useEffect(() => {
    if (vacationState) {
      RestorePreviousVacation();
    }
  }, [vacationState]);

  const fetchVacations = useCallback(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/node/vacationCalc/fetchVacations`,
        {
          userID,
        }
      )
      .then((response) => {
        setVacations(response.data.vacations);
      })
      .catch((error) => {
        console.error(error);
        SwalError("We weren't able to load your vacations.");
      });
  }, [userID]);

  const LoadPreviousVacation = (e) => {
    const element = e.currentTarget;
    const vacationIDTemp = element.getAttribute("data-custom-vacation-id");
    setVacationID(vacationIDTemp);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/node/vacationCalc/loadPreviousVacation`,
        {
          vacationID: vacationIDTemp,
        }
      )
      .then((response) => {
        setVacationState(response.data.result);
      })
      .catch((error) => {
        console.error(error);
        SwalError("We weren't able to load this vacation.");
      });
  };

  const RestorePreviousVacation = () => {
    switch (vacationState) {
      case "name":
        setShowToAndFrom(true);
        break;
      case "toAndFrom":
        setMainScreenVar(true);
        break;
      default:
    }
  };

  const openLoginOrRegisterMenu = useCallback(() => {
    document.getElementById("loginOrRegister").click();
  }, []);

  const handleVacationNameChange = useCallback((e) => {
    setVacationName(e.target.value);
  }, []);

  const handleFromChange = useCallback((e) => {
    setFrom(e.target.value);
  }, []);

  const handleToChange = useCallback((e) => {
    setTo(e.target.value);
  }, []);

  const formatDateForSQL = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDepartDateChange = useCallback((e) => {
    const formattedDate = formatDateForSQL(e.target.value);
    setDepartDate(formattedDate);
  }, []);

  const handleReturnDateChange = useCallback((e) => {
    const formattedDate = formatDateForSQL(e.target.value);
    setReturnDate(formattedDate);
  }, []);

  const ConfirmName = useCallback(() => {
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
          const createVacation = await axios.post(
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
            color: "#FFF",
            background: "#212529",
            timer: "3000",
          });
          setVacationID(createVacation.data.vacationID);
          setShowNameVacation(false);
          setShowToAndFrom(true);
        } catch (error) {
          SwalError(
            "We weren't able to create your vacation. Please try again."
          );
        }
      }
    });
  }, [vacationName, userID]);

  const ProceedFromTravelToAndFrom = useCallback(() => {
    if (returnDate && departDate && to && from) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/node/vacationCalc/insertToFromAndDates`,
          {
            vacationID,
            departDate,
            returnDate,
            from,
            to,
          }
        )
        .then((response) => {
          Swal.fire({
            title: "Got it.",
            showConfirmButton: false,
            text: "Your travel details have been saved.",
            icon: "success",
            background: "#212529",
            color: "#fff",
            timer: 3000,
          });
          setShowToAndFrom(false);
          setMainScreenVar(true);
        })
        .catch((error) => {
          console.error("Error saving travel details:", error);
          SwalError("We weren't able to save your changes. Please try again.");
        });
    } else {
      Swal.fire({
        title: "Incomplete Information",
        text: "Please fill in all the fields before proceeding.",
        icon: "warning",
        background: "#212529",
        color: "#fff",
        confirmButtonText: "OK",
        confirmButtonColor: "#9e3c4e",
      });
    }
  }, [returnDate, departDate, to, from, vacationID]);

  const StartNew = () => (
    <div className="centeredContainer">
      <label htmlFor="vacationName">
        <span className="vacationNameLabel">
          Enter a name for your vacation
        </span>
        <div>
          <input
            id="vacationName"
            autoFocus
            className="inputVacation1"
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

  function convertSQLDateToDate(dateString) {
    const tempDate = dateString.substring(0, 10);
    const [year, month, day] = tempDate.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  const MainScreen = () => {
    const handleAddTravelers = useCallback(() => {
      Swal.fire({
        title: "Add a Traveler",
        input: "text",
        inputAttributes: {
          autocapitalize: "on",
        },
        showCancelButton: true,
        confirmButtonText: "Add",
        customClass: {
          confirmButton: "gradient",
        },
        showLoaderOnConfirm: true,
        preConfirm: async (travelerName) => {
          try {
            const response = await axios.post(
              `${process.env.REACT_APP_API_URL}/node/vacationCalc/addTraveler`,
              { vacationID, travelerName }
            );
          } catch (error) {
            console.error("Error adding traveler:", error);
            SwalError("We weren't able to add this traveler.");
          }
        },
      })
    });
    useEffect(() => {
      if (vacationID && vacationMainData.length === 0 && !loading) {
        setLoading(true);
        axios
          .post(`${process.env.REACT_APP_API_URL}/node/vacationCalc/RetrieveVacation`, { vacationID })
          .then((response) => {
            setVacationMainData(response.data.result);
            setDateStart(convertSQLDateToDate(response.data.result[0].date_start));
            setDateEnd(convertSQLDateToDate(response.data.result[0].date_end));
            setShowNameVacation(false);
            setShowToAndFrom(false);
            setMainScreenVar(true);
          })
          .catch((error) => {
            console.error("Error loading main screen:", error);
            SwalError("We weren't able to load the main screen.");
            setLoading(false)
          })
          .finally(() => setLoading(false));
      }
    }, [vacationID, vacationMainData, loading]);
  
    return (
      <div>
        {vacationMainData &&
          vacationMainData.map((v, i) => (
            <div key={i}>
              <div className="centeredContainer">
                <p className="vacationNameMain glass-effect">{v.vacation_name}</p>
              </div>
              <div className="vacationDateGroupMain">
                <div className="vacationDatesMain">
                  From: {v.from} (
                  {dateStart ? dateStart.toDateString() : "Loading..."})
                </div>
                <div>
                  <FontAwesomeIcon icon={faPlane} size="2x" />
                </div>
                <div className="vacationDatesMain">
                  To: {v.to} ({dateEnd ? dateEnd.toDateString() : "Loading..."})
                </div>
              </div>
              <div className="travelers">
                {v.travelers ? (
                  v.travelers
                ) : (
                  <button className="travelersButton" onClick={handleAddTravelers}>
                    Add Travelers
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    );
  };
  
  

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
        <div className="previousVacations">
          or choose a previous one:
          {vacations.length > 0 ? (
            vacations.map((vacation) => (
              <div key={vacation.id}>
                <button
                  onClick={LoadPreviousVacation}
                  data-custom-vacation-id={vacation.id}
                  key={vacation.id}
                  className="loadedVacationsText"
                >
                  {vacation.vacation_name}
                </button>
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

  return (
    <div>
      {userID ? (
        showNameVacation ? (
          <StartNew />
        ) : showToAndFrom ? (
          <div>
            <div className="centeredContainer">
              <div>
                <label>
                  <span className="label1">
                    Enter where you're traveling from
                  </span>

                  <FontAwesomeIcon icon={faPlaneDeparture} size="3x" />
                  <input
                    type="text"
                    className="inputVacation1 flyingFrom"
                    placeholder="Airport or City"
                    value={from}
                    onChange={handleFromChange}
                  />
                  <FontAwesomeIcon icon={faPlaneArrival} size="3x" />
                </label>
                <div className="vacationDate">
                  When are you leaving?&nbsp;
                  <input
                    type="date"
                    value={departDate}
                    onChange={handleDepartDateChange}
                  />
                </div>
                <label>
                  <span className="label1">
                    Enter where you're traveling to
                  </span>
                  <FontAwesomeIcon
                    icon={faPlaneDeparture}
                    flip="horizontal"
                    size="3x"
                  />
                  <input
                    type="text"
                    className="inputVacation1 flyingTo"
                    placeholder="Airport or City"
                    value={to}
                    onChange={handleToChange}
                  />
                  <FontAwesomeIcon
                    icon={faPlaneArrival}
                    flip="horizontal"
                    size="3x"
                  />
                </label>
                <div className="vacationDate">
                  When are you returning?&nbsp;
                  <input
                    type="date"
                    value={returnDate}
                    onChange={handleReturnDateChange}
                  />
                </div>
              </div>
              <div>
                <button
                  className="primaryButton"
                  onClick={ProceedFromTravelToAndFrom}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        ) : mainScreenVar ? (
          <MainScreen />
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
