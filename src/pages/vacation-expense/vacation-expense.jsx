import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../components/header/UserContext";

const VacationExpenseCalculator = () => {
    const [loggedInState, setLoggedInState] = useState(false);
    const { userID, setUserID } = useContext(UserContext);

    const checkLoginState = () => {
        const token = localStorage.getItem("token");
    
        if (!token) {
          setLoggedInState(false);
          return;
        }
    
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if (decoded.exp > currentTime) {
            setLoggedInState(true);
          } else {
            setLoggedInState(false);
          }
        } catch (error) {
          console.error("Token decoding failed:", error);
          setLoggedInState(false);
        }
      };
    
      useEffect(() => {
        checkLoginState();
      }, []);


    const StartNewOrResume = () => {
        if (!userID) {
            return (
                <div>
                    Not logged in
                </div>
            )
        }
        else {
            return (
                <div>
                    logged in
                </div>
            )
        }
    }


return (
    <div>
        <StartNewOrResume />
    </div>
)

}

export default VacationExpenseCalculator;