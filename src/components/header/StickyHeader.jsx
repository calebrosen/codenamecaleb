import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import { slide as Menu } from "react-burger-menu";
import "./StickyHeader.css";

const StickyHeader = ({ children }) => (
  <div>
    <div className="hamburgerMenu">
      <Menu
        left
        customBurgerIcon={<FontAwesomeIcon icon={faBars} size="2x" />}
        burgerButtonClassName="custom-burger-button"
      >
        <div className="menu-items">
          <div className="menu-item">
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
          <a href="budget-calculator">
            <span>
              Budget Calculator
            </span>
          </a>
          </div>
        </div>
      </Menu>
    </div>
    {children}
  </div>
);

export default StickyHeader;
