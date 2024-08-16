import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const DropDownMenuTools = () => {
    return (
        <div className="dropdown-menu space-apart">
            <div><a href="overwatch-random-character-generator">Overwatch Random Character Selector</a></div>
        </div>
    );
};

const StickyHeader = ({ children }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const timeoutRef = useRef(null);
    
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setDropdownVisible(false);
        }, 200); 
    };

    return (
        <div>
            <header className="sticky-header">
                <nav className="navbar">
                    <a href="/">
                        <span className='homeButton'><FontAwesomeIcon icon={faHome} /></span>
                    </a>
                    <ul className="nav-list">
                        <li 
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => setDropdownVisible(!isDropdownVisible)}
                        >
                        <a href="#tools">Tools</a>
                            {isDropdownVisible && <DropDownMenuTools />}
                        </li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </header>
            {children}
        </div>
    );
};

export default StickyHeader;
