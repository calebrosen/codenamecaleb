import {
  faPeopleGroup,
  faPlane,
  faPlaneArrival,
  faPlaneDeparture,
  faTrash,
  faUmbrellaBeach,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import ClipLoader from 'react-spinners/ClipLoader';
import "sweetalert2/dist/sweetalert2.min.css";
import { UserContext } from "../../components/header/UserContext";
import "./vacation-planner.css";

Modal.setAppElement("#root");

const VacationPlanner = () => {
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
  const [travelersArray, setTravelersArray] = useState([]);
  const [travelersModal, setTravelersModal] = useState(false);
  const [newTravelersArray, setNewTravelersArray] = useState([]);
  const [vacationDates, setVacationDates] = useState([]);
  const [vacationNameModal, setVacationNameModal] = useState(false);
  const [vacationNameForModal, setVacationNameForModal] = useState("");
  const [vacationEditDateModal, setVacationEditDateModal] = useState(false);
  const [fromLocationModal, setFromLocationModal] = useState("");
  const [toLocationModal, setToLocationModal] = useState("");
  const [fromDateModal, setFromDateModal] = useState("");
  const [toDateModal, setToDateModal] = useState("");
  const [vacationDayModal, setVacationDayModal] = useState(false);
  const [vacationDateEdit, setVacationDateEdit] = useState("");
  const [vacationDaySummary, setVacationDaySummary] = useState("");
  const [showSetVacationDaySummary, setShowSetVacationDaySummary] =
    useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [activities, setActivities] = useState([{ activity: "", time: "" }]);

  const SwalError = (message) => {
    Swal.fire({
      title: "Oh no! Something happened.",
      showConfirmButton: true,
      text: message,
      icon: "error",
      background: "#fff",
      color: "#000",
      confirmButtonText: "OK",
      confirmButtonColor: "#9e3c4e",
    });
  };

  const SwalSuccess = (message) => {
    Swal.fire({
      title: "Success!",
      showConfirmButton: true,
      text: message,
      icon: "success",
      background: "#fff",
      color: "#000",
      confirmButtonText: "OK",
      confirmButtonColor: "rgb(20, 206, 45)",
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
    if (vacationName) {
      Swal.fire({
        title: `Create vacation with name "${vacationName}"?`,
        text: "You will be able to change this later.",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        color: "#000",
        background: "#fff",
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
            setVacationID(createVacation.data.vacationID);
            SwalSuccess(`Your vacation "${vacationName}" has been created.`);
            setShowNameVacation(false);
            setShowToAndFrom(true);
          } catch (error) {
            SwalError(
              "We weren't able to create your vacation. Please try again."
            );
          }
        }
      });
    }
  }, [vacationName, userID]);

  const ProceedFromTravelToAndFrom = useCallback(() => {
    if (departDate > returnDate) {
      SwalError(
        "Please make sure your return date is after your leaving date."
      );
      return;
    }
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
          SwalSuccess("Your travel details have been saved.");
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
        background: "#fff",
        color: "#000",
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

  const TravelersModal = () => {
    const handleCloseTravelersModal = () => {
      setTravelersModal(false);
      setNewTravelersArray(travelersArray);
    };

    const handleSaveTravelers = (e) => {
      e.preventDefault();

      const allTravelers = document.querySelectorAll(".travelersForValue");
      let tempTravelersArr = [];

      allTravelers.forEach((element) => {
        const value = element.value;
        if (value) {
          tempTravelersArr.push(value);
        }
      });

      setNewTravelersArray(tempTravelersArr);
      setTravelersModal(false);
      const newArr = [...tempTravelersArr];
      //newArr for updating state on page
      tempTravelersArr = JSON.stringify(tempTravelersArr);
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/node/vacationCalc/SaveTravelers`,
          { vacationID, tempTravelersArr }
        )
        .then((response) => {
          setTravelersArray(newArr);
          // ^ just updating visual state on page
          SwalSuccess("Your travelers have been saved.");
        })
        .catch((error) => {
          console.error("Error saving travelers:", error);
          SwalError("We weren't able to save your travelers.");
        });
    };

    const handleDeleteTraveler = (e) => {
      const tempData = e.currentTarget.getAttribute("data-custom-value");
      setNewTravelersArray((prevTravelersArray) =>
        prevTravelersArray.filter((traveler) => traveler !== tempData)
      );
    };

    if (travelersModal) {
      return (
        <Modal
          isOpen={travelersModal}
          onRequestClose={handleCloseTravelersModal}
          contentLabel="Travelers"
          className="WideModalPadding"
          overlayClassName="Overlay"
        >
          <div className="centered">
            <h2 style={{ fontSize: "3rem", padding: "1rem" }}>
              Edit or Add Travelers
            </h2>
            <form>
              {newTravelersArray && newTravelersArray.length > 0 ? (
                <>
                  {newTravelersArray.map((t, i) => (
                    <p key={i} data-custom-id={t}>
                      <input
                        type="text"
                        className="vacationInput1 travelersForValue"
                        defaultValue={t}
                      />
                      <span
                        className="pointer"
                        data-custom-value={t}
                        onClick={handleDeleteTraveler}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: "#e21212", marginLeft: "0.5rem" }}
                          size="2x"
                        />
                      </span>
                    </p>
                  ))}
                  <div className="flexButtons">
                    <button
                      className="saveButtonWider"
                      onClick={handleSaveTravelers}
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      className="addNewButton"
                      onClick={handleAddNewTravelerClick}
                    >
                      Add new <FontAwesomeIcon icon={faUserPlus} />
                    </button>
                  </div>
                </>
              ) : (
                <button
                  className="addNewButton"
                  onClick={handleAddNewTravelerClick}
                >
                  Add new <FontAwesomeIcon icon={faUserPlus} />
                </button>
              )}
            </form>
          </div>
        </Modal>
      );
    } else {
      return;
    }
  };

  const handleAddNewTravelerClick = (e) => {
    e.preventDefault();
    handleAddTravelers();
  };

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
        confirmButton: "saveBorder",
      },
      showLoaderOnConfirm: true,
      preConfirm: (travelerName) => {
        if (!travelerName) {
          Swal.showValidationMessage("Traveler name is required");
          return false;
        }
        return travelerName;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newTravelerName = result.value;

        setTravelersArray((prevTravelersArray) => {
          const updatedArray = Array.isArray(prevTravelersArray)
            ? [...prevTravelersArray, newTravelerName]
            : [newTravelerName];

          axios
            .post(
              `${process.env.REACT_APP_API_URL}/node/vacationCalc/addTraveler`,
              { vacationID, travelersArray: JSON.stringify(updatedArray) }
            )
            .catch((error) => {
              console.error("Error adding traveler:", error);
              SwalError("We weren't able to add this traveler.");
            });
          setNewTravelersArray(updatedArray);
          return updatedArray;
        });
        SwalSuccess("The traveler has been added.");
      }
    });
  }, [vacationID]);

  const handleOpenTravelersModal = () => {
    setTravelersModal(true);
  };

  const MainScreen = () => {
    useEffect(() => {
      if (vacationID && vacationMainData.length === 0 && !loading) {
        setLoading(true);
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/node/vacationCalc/RetrieveVacation`,
            { vacationID }
          )
          .then((response) => {
            setVacationMainData(response.data.result);
            //need to define beforehand due to async
            const dStart = convertSQLDateToDate(
              response.data.result[0].date_start
            );
            const dEnd = convertSQLDateToDate(response.data.result[0].date_end);
            setDateStart(dStart);
            setDateEnd(dEnd);
            setFromDateModal(dStart.toISOString().split("T")[0]);
            setToDateModal(dEnd.toISOString().split("T")[0]);
            setFromLocationModal(response.data.result[0].from);
            setToLocationModal(response.data.result[0].to);
            getDatesForVacation(dStart, dEnd);
            setVacationNameForModal(response.data.result[0].vacation_name);
            setTravelersArray(JSON.parse(response.data.result[0].travelers));
            setNewTravelersArray(JSON.parse(response.data.result[0].travelers));
            setShowNameVacation(false);
            setShowToAndFrom(false);
            setMainScreenVar(true);
          })
          .catch((error) => {
            console.error("Error loading main screen:", error);
            SwalError("We weren't able to load the main screen.");
            setLoading(false);
          })
          .finally(() => setLoading(false));
      }
    }, [vacationID, vacationMainData, loading]);

    const getDatesForVacation = (dateStart, dateEnd) => {
      const dateArr = [];
      for (
        const dt = new Date(dateStart);
        dt <= new Date(dateEnd);
        dt.setDate(dt.getDate() + 1)
      ) {
        const formattedDate = new Date(dt).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        });
        dateArr.push(formattedDate);
      }
      setVacationDates([...dateArr]);
    };

    const OpenVacationNameModal = () => {
      setVacationNameModal(true);
    };

    const UpdateVacationName = () => {
      const handleSaveVacationName = (e) => {
        e.preventDefault();
        const newVacationName = e.target.form[0].value;
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/node/vacationCalc/editVacationName`,
            { vacationID, newVacationName }
          )
          .then((response) => {
            const tmpArrForUpdateName = [...vacationMainData];
            if (tmpArrForUpdateName.length > 0) {
              tmpArrForUpdateName[0].vacation_name = newVacationName;
              SwalSuccess("Your vacation name has been edited.");
              setVacationNameForModal(newVacationName);
              setVacationNameModal(false);
            }
          })
          .catch((error) => {
            console.error("Error editing vacation name:", error);
            SwalError("We weren't able to edit your vacation name.");
          });
      };

      const CloseVacationNameModal = () => {
        setVacationNameModal(false);
      };

      if (vacationNameModal) {
        return (
          <Modal
            isOpen={vacationNameModal}
            onRequestClose={CloseVacationNameModal}
            contentLabel="Vacation Name"
            className="WideModalPadding"
            overlayClassName="Overlay"
          >
            <div className="centered">
              <h2 style={{ fontSize: "2.8rem" }}>Edit Vacation Name</h2>
              <form>
                <p className="marginTop1 marginBottom1">
                  <input
                    type="text"
                    className="vacationInput1"
                    name="newVacationName"
                    defaultValue={vacationNameForModal}
                  />
                </p>
                <div>
                  <button
                    className="saveButtonWider"
                    onClick={handleSaveVacationName}
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        );
      } else {
        return;
      }
    };

    function addDaysToDate(dateString, addDayAmount) {
      const date = new Date(dateString);
      date.setDate(date.getDate() + addDayAmount);
      return date.toISOString().split("T")[0];
    }

    const EditVacationDateModal = () => {
      const HandleCloseVacationDateModal = () => {
        setVacationEditDateModal(false);
      };

      const HandleSaveEditVacationDate = (e) => {
        e.preventDefault();
        const form = e.target.form;
        //maybe improve logic here later
        let fromLocationUpdate;
        let fromDateUpdate;
        let toLocationUpdate;
        let toDateUpdate;
        if (form) {
          Array.from(form.elements).forEach((input) => {
            if (input.id == "fromLocationModal") {
              fromLocationUpdate = input.value;
            } else if (input.id == "fromDateModal") {
              fromDateUpdate = formatDateForSQL(input.value);
            } else if (input.id == "toLocationModal") {
              toLocationUpdate = input.value;
            } else if (input.id == "toDateModal") {
              toDateUpdate = formatDateForSQL(input.value);
            }
          });
          if (new Date(fromDateUpdate) > new Date(toDateUpdate)) {
            SwalError(
              "Please make sure that your 'from' date is before your 'to' date."
            );
            return;
          }
          axios
            .post(
              `${process.env.REACT_APP_API_URL}/node/vacationCalc/updateVacationToFrom`,
              {
                vacationID,
                fromLocationUpdate,
                fromDateUpdate,
                toLocationUpdate,
                toDateUpdate,
              }
            )
            .then((response) => {
              SwalSuccess("Your vacation dates and location have been edited.");
              const newVacationDataTemp = [...vacationMainData];

              for (let vacation of newVacationDataTemp) {
                vacation.from = fromLocationUpdate;
                vacation.to = toLocationUpdate;
              }
              const fromDate = addDaysToDate(fromDateUpdate, 1);
              const toDate = addDaysToDate(toDateUpdate, 1);
              setVacationMainData(newVacationDataTemp);
              setDateStart(convertSQLDateToDate(fromDate));
              setDateEnd(convertSQLDateToDate(toDate));
              setFromLocationModal(fromLocationUpdate);
              setToLocationModal(toLocationUpdate);
              setFromDateModal(fromDate);
              setToDateModal(toDate);
              getDatesForVacation(
                addDaysToDate(fromDate, 1),
                addDaysToDate(toDate, 1)
              );
            })
            .catch((error) => {
              console.error(
                "Error updating vacation to/from information:",
                error
              );
              SwalError(
                "We weren't able to edit your vacation's to/from information."
              );
            });
        }
      };

      if (vacationEditDateModal) {
        return (
          <Modal
            isOpen={vacationEditDateModal}
            onRequestClose={HandleCloseVacationDateModal}
            contentLabel="Edit Vacation Dates and To/From"
            className="WideModalPadding"
            overlayClassName="Overlay"
          >
            <h2 style={{ fontSize: "2.75rem" }}>
              Edit Vacation Dates & Location
            </h2>
            <form>
              <div className="flexGroup" style={{ textAlign: "center" }}>
                <div>
                  <p className="toAndFromPModal">From</p>
                  <p>
                    <input
                      defaultValue={fromLocationModal}
                      type="text"
                      className="inputVacation2"
                      id="fromLocationModal"
                    ></input>
                  </p>
                  <input
                    type="date"
                    defaultValue={fromDateModal}
                    className="inputVacation2"
                    id="fromDateModal"
                  ></input>
                </div>
                <div>
                  <p className="toAndFromPModal">To</p>
                  <p>
                    <input
                      defaultValue={toLocationModal}
                      type="text"
                      className="inputVacation2"
                      id="toLocationModal"
                    ></input>
                  </p>
                  <input
                    type="date"
                    defaultValue={toDateModal}
                    className="inputVacation2"
                    id="toDateModal"
                  ></input>
                </div>
              </div>
              <div className="centeredSaveButtonContainer">
                <button
                  className="saveButtonWider"
                  onClick={HandleSaveEditVacationDate}
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </Modal>
        );
      } else return;
    };


    const OpenVacationDatesModal = () => {
      setVacationEditDateModal(true);
    };


    const EditVacationDay = () => {

      const HandleVacationDayModalClose = () => {
        setVacationDayModal(false);
        setActivities([]);
        setVacationDaySummary(null);
      };

      const OpenVacationDaySummary = () => {
        setShowSetVacationDaySummary(true);
      };

      const handleAddActivity = () => {
        setActivities([...activities, { activity: "", time: "" }]);
      };

      const handleSubmitActivties = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        for (let index = 0; index < activities.length; index++) {
          const activity = formData.get(`activity-${index}`);
          const time = formData.get(`time-${index}`);

          if (!activity || !time) {
            console.error(`Activity or time is empty for entry ${index}`);
            SwalError("Please fill in all fields for each activity.");
            return;
          }
        }

        const activityData = activities.map((_, index) => ({
          activity: formData.get(`activity-${index}`),
          time: formData.get(`time-${index}`),
        }));

        let jsonActivityData = {
          activities: activityData,
        };

        jsonActivityData = JSON.stringify(jsonActivityData);
        const tempDateForSQL =
          stripDateSuffixAndConvertToSQLDate(vacationDateEdit);

        axios
          .post(
            `${process.env.REACT_APP_API_URL}/node/vacationCalc/saveVacationDayActivities`,
            {
              vacationID,
              tempDateForSQL,
              jsonActivityData,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            SwalSuccess("This day's activites have been saved.");
          })
          .catch((error) => {
            console.error("Error saving activities:", error);
          });
      };

      const HandleDeleteActivity = (e) => {
        const activityIndex = parseInt(e.currentTarget.getAttribute("data-custom-activity-index").split('-')[2], 10);
        
        const updatedActivities = activities.filter((_, index) => index !== activityIndex);
        
        setActivities(updatedActivities);
      };

      if (vacationDayModal) {
        return (
          <Modal
            isOpen={vacationDayModal}
            onRequestClose={HandleVacationDayModalClose}
            contentLabel="Edit Vacation Dates and To/From"
            className="WideModalPadding"
            overlayClassName="Overlay"
          >
            <form onSubmit={handleSubmitActivties}>
              <div>
                <p
                  className="daySummary pointer"
                  style={{
                    textAlign: "center",
                    fontSize: "3.5rem",
                    marginTop: "-0.15rem",
                  }}
                  onClick={OpenVacationDaySummary}
                >
                  {vacationDaySummary ? (
                    vacationDaySummary
                  ) : (
                    <>Summarize this date</>
                  )}
                </p>
                <div>
                  <h2 style={{ fontSize: "2.55rem", textAlign: "center" }}>
                    {vacationDateEdit}
                  </h2>
                </div>

                              {activities.map((activityData, index) => (
                <div
                  key={index}
                  data-custom-id={`activity-index-${index}`}
                  className="flexButtons marginTop2"
                >
                  <input
                    className="vacationInput1"
                    type="text"
                    name={`activity-${index}`}
                    placeholder="Enter an Activity"
                    defaultValue={activityData.activity || ''}
                  />
                  <input
                    className="vacationInput1"
                    type="time"
                    name={`time-${index}`}
                    defaultValue={activityData.time || ''}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    data-custom-activity-index={`activity-index-${index}`}
                    style={{ color: "#e21212", marginTop: "0.5rem" }}
                    size="2x"
                    onClick={HandleDeleteActivity}
                    className="pointer"
                  />
                </div>
              ))}


                <div className="flexButtons">
                  <button className="saveButtonWider" type="submit">
                    Save
                  </button>
                  <button
                    className="addNewButton"
                    type="button"
                    onClick={handleAddActivity}
                  >
                    Add New Activity
                    <FontAwesomeIcon
                      style={{ paddingLeft: "0.4rem" }}
                      icon={faUserPlus}
                    />
                  </button>
                </div>
              </div>
            </form>
          </Modal>
        );
      } else {
        return null;
      }
    };

    function stripDateSuffixAndConvertToSQLDate(dateStr) {
      let cleanDateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1");

      let date = new Date(cleanDateStr);

      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    }

    const VacationDaySummaryModal = () => {
      const CloseVacationDaySummary = () => {
        setShowSetVacationDaySummary(false);
      };

      const saveVacationDaySummary = (e) => {
        e.preventDefault();
        const summary = e.target.form[0].value;
        if (summary) {
          const tempDateObj =
            stripDateSuffixAndConvertToSQLDate(vacationDateEdit);
          axios
            .post(
              `${process.env.REACT_APP_API_URL}/node/vacationCalc/saveDaySummary`,
              {
                vacationID,
                tempDateObj,
                summary,
              }
            )
            .then((response) => {
              SwalSuccess("Your summary has been saved.");
              setVacationDaySummary(summary.trim());
            })
            .catch((error) => {
              console.error("Error saving summary:", error);
              SwalError(
                "We weren't able to save your summary. Please try again."
              );
            });
        }
      };

      if (!showSetVacationDaySummary) return null;

      if (showSetVacationDaySummary) {
        return (
          <Modal
            isOpen={showSetVacationDaySummary}
            onRequestClose={CloseVacationDaySummary}
            contentLabel="Vacation Name"
            className="WideModalPadding"
            overlayClassName="Overlay"
          >
            <div className="centered">
              <h2 style={{ fontSize: "2.8rem" }}>
                Summary for <br />
                {vacationDateEdit}
              </h2>
              {loadingSummary ? (
                <p>Loading summary...</p>
              ) : (
                <form>
                  <p className="marginTop1 marginBottom1">
                    <input
                      type="text"
                      className="vacationInput1"
                      name="newVacationName"
                      defaultValue={vacationDaySummary}
                    />
                  </p>
                  <div>
                    <button
                      className="saveButtonWider"
                      type="submit"
                      onClick={saveVacationDaySummary}
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Modal>
        );
      }
    };

    const HandleVacationDateClick = useCallback((e) => {
      setLoadingSummary(true);
      const tempVacationToFormat =
        e.currentTarget.getAttribute("data-custom-date");
      const dateObject = new Date(tempVacationToFormat);
      const options = { year: "numeric", month: "long", day: "numeric" };
      let tempDateForFetchingSummary = dateObject.toISOString().split("T")[0];
      let formattedDate = dateObject.toLocaleDateString("en-US", options);

      const day = dateObject.getDate();
      const daySuffix = (day) => {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      };
      formattedDate = formattedDate.replace(/\d+/, day + daySuffix(day));
      setVacationDateEdit(formattedDate);
      //
      // getting summary  if exists
      //
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/node/vacationCalc/getVacationDaySummary`,
          { vacationID, tempDateForFetchingSummary }
        )
        .then((response) => {
          if (response.data.result[0]) {
            let temp = response.data.result[0];
            if (temp.hasOwnProperty("summary") && temp.summary != null) {
              setVacationDaySummary(temp.summary);
            }
          }
        })
        .catch((error) => {
          console.error("Error getting day summary:", error);
          SwalError("We weren't able get the summary for this date.");
        })
        //
        // getting activites if exists
        //
        
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/node/vacationCalc/getVacationDateActivities`,
            { vacationID, tempDateForFetchingSummary }
          )
          .then((response) => {
            if (response.data.result[0]) {
              let temp = response.data.result[0];
              if (temp.hasOwnProperty("activity_time") && temp.activity_time != null) {
                try {
                  const parsedActivityTime = JSON.parse(temp.activity_time);
              
                  if (Array.isArray(parsedActivityTime.activities)) {
                    const parsedActivities = parsedActivityTime.activities.map(activity => ({
                      activity: activity.activity,
                      time: activity.time,
                    }));
              
                    setActivities(parsedActivities);
                  } else {
                    console.error("activity_time.activities is not an array or is undefined");
                  }
                } catch (error) {
                  console.error("Error parsing activity_time:", error);
                }
              }
              
            }
          })
          .catch((error) => {
            console.error("Error getting activities:", error);
            SwalError("We weren't able get the activites for this date.");
          })
          .finally(() => {
            setVacationDayModal(true);
            setLoadingSummary(false);
          });
        
    });

    return (
      <div>
        {vacationMainData &&
          vacationMainData.map((v, i) => {
            return (
              <div key={i} className="vacationGroupMain">
                <div className="centeredContainer">
                  <p
                    className="vacationNameMain pointer"
                    onClick={OpenVacationNameModal}
                  >
                    {v.vacation_name}
                  </p>
                </div>
                <div className="vacationDateGroupMain">
                  <div
                    className="vacationDatesMain pointer"
                    onClick={OpenVacationDatesModal}
                  >
                    From: {v.from} (
                    {dateStart ? dateStart.toDateString() : "Loading..."})
                  </div>
                  <div className="planeIconFromTo">
                    <FontAwesomeIcon icon={faPlane} size="2x" />
                  </div>
                  <div
                    className="vacationDatesMain pointer"
                    onClick={OpenVacationDatesModal}
                  >
                    To: {v.to} (
                    {dateEnd ? dateEnd.toDateString() : "Loading..."})
                  </div>
                </div>
                <div className="travelers">
                  <h2 onClick={handleOpenTravelersModal} className="pointer">
                    <FontAwesomeIcon
                      icon={faPeopleGroup}
                      style={{ paddingRight: "0.5rem" }}
                    />
                    Travelers
                  </h2>
                  {travelersArray && travelersArray.length > 0 && (
                    <div className="travelersNames">
                      {travelersArray.map((traveler, i) => (
                        <div key={i} className="individualTravelerNames">
                          {traveler}
                        </div>
                      ))}
                    </div>
                  )}
                  <hr className="travelersBreak" />
                </div>
                <div className="vacationDatesInOrder">
                  {vacationDates &&
                    vacationDates.length > 0 &&
                    vacationDates.map((date, i) => (
                      <div
                        key={i}
                        onClick={HandleVacationDateClick}
                        data-custom-date={date}
                        className="vacationDayGroup pointer"
                      >
                        {date}
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        <TravelersModal />
        <UpdateVacationName />
        <EditVacationDateModal />
        <EditVacationDay />
        <VacationDaySummaryModal />
      </div>
    );
  };

  const Loader = () => {

    if (loading || loadingSummary) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          {loading ? (
            <ClipLoader color="#1ad2d8" size={150} />
          ) : (
            <div>Your content goes here</div>
          )}
        </div>
      );
    }
    else {
      return;
    }
  };

  const LoggedInOptions = () => (
    <div className="centeredContainer">
      <h1 className="vacation-planner">
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
            <div className="prevVacationsListParent">
              <ul className="prevVacationsList">
                {vacations.map((vacation) => (
                  <li
                    key={vacation.id}
                    onClick={LoadPreviousVacation}
                    data-custom-vacation-id={vacation.id}
                    className="loadedVacationsText"
                  >
                    {vacation.vacation_name}
                  </li>
                ))}
              </ul>
            </div>
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
      <h1 className="vacation-planner">
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
                    className="inputVacation1Date"
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
                    className="inputVacation1Date"
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

export default VacationPlanner;
