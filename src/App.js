// src/App.js
import React from 'react';
import StickyHeader from './components/StickyHeader';
import './App.css'; // General styles for the app

function App() {
    return (
        <div className="App">
            <StickyHeader />
            <main>
                <section id="home">
                    <h1>Home Section</h1>
                    <p>Welcome to the home section. Here you can place your main content.</p>
                </section>
                <section id="about">
                    <h1>About Section</h1>
                    <p>Details about the site or yourself go here.</p>
                </section>
                <section id="services">
                    <h1>Services Section</h1>
                    <p>Information about the services offered is displayed here.</p>
                </section>
                <section id="contact">
                    <h1>Contact Section</h1>
                    <p>Contact details and form can be found in this section.</p>
                </section>
            </main>
        </div>
    );
}

export default App;
