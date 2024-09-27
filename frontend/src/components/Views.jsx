import React from 'react';

const Views = () => {
  return (
    <div
      className="promotional-banner"
      style={{
        background: "linear-gradient(135deg, #003300, #99ff99)",
        textAlign: "center",
        color: "#ffffff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
      }}
    >
      <h2
        className="banner-title"
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "15px",
          color: "#ffffff",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
        }}
      >
        Discover Your Next Adventure!
      </h2>
      <p
        className="banner-subtitle"
        style={{
          fontSize: "1.2rem",
          marginBottom: "20px",
          color: "#ffffff",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)"
        }}
      >
        Explore breathtaking destinations and immerse yourself in unforgettable experiences. From serene landscapes to vibrant cityscapes, your next adventure awaits!
      </p>
      <a
        href="/packages"
        className="btn btn-lg btn-light"
        style={{
          backgroundColor: "#ffffff",
          color: "#004d00",
          padding: "10px 20px",
          borderRadius: "5px",
          fontWeight: "bold",
          textDecoration: "none"
        }}
      >
        Explore Tours
      </a>
    </div>
  );
};

export default Views;
