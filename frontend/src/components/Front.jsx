// src/components/Front.jsx
import React from 'react';
import SearchBar from './SearchBar';
import '../Style.css'; // Optional: Create a separate CSS file for additional styling

const Front = () => {
  return (
    <section
      id="home"
      style={{
        background:
          'linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.5)), url("/images/season.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: '100vh', // Ensure the section covers the full viewport height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'aliceblue'
      }}
    >
      <div className="container text-center py-5">
        <h1
          style={{
            fontSize: '5rem', // Adjust font size for better responsiveness
            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
            letterSpacing: '0.3rem',
            textShadow:
              "0 1px 2px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,0.5), 0 3px 6px rgba(0,0,0,0.4)",
            marginBottom: '2.8rem',
            marginTop: '0.8rem' // Adjust margin for better spacing
          }}
        >
          ConnecTour
        </h1>
        <h4 style={{ marginBottom: '2rem' }}>
          "Elevating Experiences - Connecting Cultures"
        </h4>
        <SearchBar />
      </div>
    </section>
  );
};

export default Front;
