import {
    faBars,
    faHome,
    faUser,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import Modal from "react-modal";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./Menu.css";

Modal.setAppElement("#root");

const AccountComponent = ({ closeMenu }) => {
  const [loggedInState, setLoggedInState] = useState(false);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");

  const OpenModal = () => {
    closeMenu();
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeRegisterModal = () => {
    setRegisterModalIsOpen(false);
  };

  const switchToRegisterModal = () => {
    closeModal();
    setRegisterModalIsOpen(true);
  };

  const AttemptLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/node/auth/login`,
        {
          email,
          password,
        }
      );

      const name = response.data.name;
      const token = response.data.token;

      localStorage.setItem("token", token);
      closeModal();
      checkLoginState();
      
      Swal.fire({
        title: `Welcome back, ${name}.`,
        showConfirmButton: false,
        icon: "success",
        background: "#212529",
        color: "#fff",
        timer: 3000,
      });
    } catch (error) {
      Swal.fire({
        title: "Oh no! Something happened.",
        showConfirmButton: true,
        text: "We couldn't log you in. Check your email and password and make sure you entered them correctly.",
        icon: "error",
        background: "#212529",
        color: "#fff",
        confirmButtonText: "OK",
        confirmButtonColor: "#9e3c4e",
      });
    }
  };

  const AttemptRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/node/users/addNew`,
        {
          registerName,
          registerEmail,
          registerPassword,
        }
      );

      closeRegisterModal();

      Swal.fire({
        title: `Welcome, ${registerName}.`,
        showConfirmButton: false,
        icon: "success",
        background: "#212529",
        color: "#fff",
        timer: 3000,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Oh no! Something happened.",
        showConfirmButton: true,
        text: "We couldn't register you.",
        icon: "error",
        background: "#212529",
        color: "#fff",
        confirmButtonText: "OK",
        confirmButtonColor: "#9e3c4e",
      });
    }
  };

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

  if (!loggedInState) {
    return (
      <div className="auth menu-item">
        <a onClick={OpenModal}>
          <span className="pointer">
            <FontAwesomeIcon icon={faUserCircle} />
            &nbsp;Login/Register
          </span>
        </a>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Login"
          className="Modal"
          overlayClassName="Overlay"
        >
          <div className="loginGroup">
            <h3>Login to your account</h3>
            <form onSubmit={AttemptLogin}>
              <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="inputText"
                  autoComplete="current-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <div className="inputGroup">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="inputText"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>

              <button type="submit" className="loginButton">
                Login
              </button>
            </form>
            <div className="registerText" onClick={switchToRegisterModal}>
              Or register an account
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={isRegisterModalOpen}
          onRequestClose={closeRegisterModal}
          contentLabel="Register"
          className="Modal"
          overlayClassName="Overlay"
        >
          <div className="registerGroup">
            <h3>Register an account</h3>
            <form onSubmit={AttemptRegister}>
              <div className="inputGroup">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="inputText"
                  autoComplete="name"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="inputText"
                  autoComplete="current-email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="inputGroup">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="inputText"
                  autoComplete="current-password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>

              <button type="submit" className="loginButton">
                Register
              </button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <div className="account menu-item">
      <a href="#">
        <span>
          <FontAwesomeIcon icon={faUser} /> My Account
        </span>
      </a>
    </div>
  );
};

const Menu = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      <div className="hamburgerMenu">
        <Menu
          isOpen={menuOpen}
          onStateChange={handleStateChange}
          left
          customBurgerIcon={<FontAwesomeIcon icon={faBars} size="3x" />}
          burgerButtonClassName="custom-burger-button"
        >
          <div className="menu-items">
            <AccountComponent closeMenu={closeMenu} />
            <div
              className="menu-item"
              style={{
                marginBottom: "3rem",
              }}
            >
              <a href="/">
                <FontAwesomeIcon icon={faHome} />
                <span>&nbsp;Home</span>
              </a>
            </div>
            <div className="menu-item">
              <a href="overwatch-random-character-generator">
                <span>OW2 RNG Character Selector</span>
              </a>
            </div>
            <div className="menu-item">
              <span>
                <a href="gta-v-wasted-overlay-generator">Wasted Generator</a>
              </span>
            </div>
            <div className="menu-item">
              <a href="vacation-expense-calculator">
                <span>Vacation Expense Calculator</span>
              </a>
            </div>
          </div>
        </Menu>
      </div>
      {children}
    </div>
  );
};

export default Menu;
