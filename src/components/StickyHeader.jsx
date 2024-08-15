import React, { Children } from 'react';

const StickyHeader = () => {
    return (
        <header className="modern-sticky-header">
            <nav className="navbar">
                <ul className="nav-list">
                    <li><a href="#home">Overwatch Random Character Selector</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default StickyHeader;
