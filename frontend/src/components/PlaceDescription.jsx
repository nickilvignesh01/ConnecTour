// src/components/PlaceDescription.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Style.css'; // Add your CSS styles

const packages = [
  // Same package data as defined earlier in the Package component
];

const PlaceDescription = () => {
  const { packageName } = useParams();
  const navigate = useNavigate();

  // Find the package based on the package name from the URL
  const selectedPackage = packages.find(pkg => pkg.name === decodeURIComponent(packageName));

  if (!selectedPackage) {
    return <p>Package not found</p>;
  }

  const handleBookNow = () => {
    navigate(`/booking/${encodeURIComponent(selectedPackage.name)}`);
  };

  return (
    <div className="place-description-page">
      <header className="place-description-header">
        <h1>{selectedPackage.name}</h1>
      </header>
      <main className="place-description-main">
        <img src={selectedPackage.image} alt={selectedPackage.name} className="package-image" />
        <div className="package-info">
          <p className="package-description">{selectedPackage.description}</p>
          <div className="package-details">
            <p><strong>Days:</strong> {selectedPackage.days}</p>
            <p><strong>Nights:</strong> {selectedPackage.nights}</p>
            <p><strong>Price:</strong> {selectedPackage.price}</p>
            <p><strong>Highlights:</strong> {selectedPackage.highlights}</p>
          </div>
          <button className="proceed-button" onClick={handleBookNow}>Book Now</button>
        </div>
      </main>
    </div>
  );
};

export default PlaceDescription;
