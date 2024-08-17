import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBars } from '@fortawesome/free-solid-svg-icons';

const DropDownMenuTools = () => {
    return (
        <div className="dropdown-menu space-apart marginLeftMobile">
            <div><a href="overwatch-random-character-generator">Overwatch Random Character Selector</a></div>
        </div>
    );
};

const MobileSideMenu = ({ onClose, showMobileMenu }) => {
    const [isMobileDropdownVisible, setIsMobileDropdownVisible] = useState(false);

    const handleMobileDropdownClick = () => {
        setIsMobileDropdownVisible(!isMobileDropdownVisible);
    };

    return (
        <div className={`mobile-side-menu ${showMobileMenu ? 'slide-in' : 'slide-out'}`}>
            <ul>
                <li><a href="/" onClick={onClose}>Home</a></li>
                <li>
                    <a href="#tools" onClick={handleMobileDropdownClick}>Tools</a>
                    {isMobileDropdownVisible && <DropDownMenuTools />}
                </li>
                <li><a href="about" onClick={onClose}>About</a></li>
                <li><a href="#services" onClick={onClose}>Services</a></li>
                <li><a href="#contact" onClick={onClose}>Contact</a></li>
            </ul>
        </div>
    );
};

const StickyHeader = ({ children }) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [showHamburgerMenu, setShowHamburgerMenu] = useState(true);
    const timeoutRef = useRef(null);
    const mobileMenuRef = useRef(null);

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

    const handleClickMobileMenu = () => {
        setShowMobileMenu(true);
        setShowHamburgerMenu(false);
    };

    const handleClickOutside = (e) => {
        if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
            setShowMobileMenu(false);
            setShowHamburgerMenu(true);
        }
    };

    const handleCloseMenu = () => {
        setShowMobileMenu(false);
        setShowHamburgerMenu(true);
    };

    useEffect(() => {
        if (showMobileMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMobileMenu]);

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
                        <li><a href="about">About</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </header>
            {/* mobile only header */}
            <div className='mobile-dropdown' ref={mobileMenuRef}>
                {showHamburgerMenu && 
                    <span
                        className='mobileHamburger pointer'
                        onClick={handleClickMobileMenu}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </span>
                }
                <MobileSideMenu onClose={handleCloseMenu} showMobileMenu={showMobileMenu} />
            </div>
            {children}
        </div>
    );
};

export default StickyHeader;
