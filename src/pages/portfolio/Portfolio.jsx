import { useContext } from "react";
import "sweetalert2/dist/sweetalert2.min.css";
import { UserContext } from "../../components/header/UserContext";
import "./Portfolio.css";

const Portfolio = () => {
    const { userID, userName } = useContext(UserContext);
    

}

export default Portfolio;
