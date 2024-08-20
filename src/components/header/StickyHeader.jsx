import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome } from '@fortawesome/free-solid-svg-icons';
import { slide as Menu } from 'react-burger-menu';
import './StickyHeader.css';

const DropDownMenuTools = () => (
  <div className="dropdown-menu">
    <p>
        <a href="overwatch-random-character-generator">OW2 RNG Character Selector</a>
    </p>
    <p>
        <a href="gta-v-wasted-overlay-generator">Wasted Generator</a>
    </p>
  </div>
);


const StickyHeader = ({ children }) => (
  <div>
    <div className="hamburgerMenu">
      <Menu
        left
        customBurgerIcon={<FontAwesomeIcon icon={faBars} size="2x" />}
        burgerButtonClassName="custom-burger-button" // Custom class for positioning
      >
        <a className="menu-item" href="/">
          <FontAwesomeIcon icon={faHome} />
          &nbsp;Home
        </a>
        <DropDownMenuTools />
      </Menu>
    </div>
    {children}
  </div>
);

export default StickyHeader;
