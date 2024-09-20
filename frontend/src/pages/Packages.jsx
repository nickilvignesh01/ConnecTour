// src/components/Package.jsx
import React from 'react';
import '../Style.css'; // Ensure this file includes the updated CSS

const packages = [
  {
    name: 'Economy Package',
    description: 'Affordable package with essential services, temples',
    image: '/images/dharmapuri-1654194392_6e3e3cdfdd3337059dd5.webp',
    days: 2,
    nights: 1,
    price: 'Rs. 5499',
    highlights: 'Explore the city landmarks and enjoy local cuisine.'
  },
  {
    name: 'Premium Package',
    description: 'Luxurious package with exclusive services: five-star hotels, Ooty, Kodaikanal',
    image: '/images/padmanabhapuram-palace-1656252547_31ed9b142ded0a8b22b1.webp',
    days: 6,
    nights: 5,
    price: 'Rs. 29999',
    highlights: 'Enjoy premium stays, guided tours, and exclusive experiences.'
  },
  {
    name: 'Medium Package',
    description: 'Balanced package with good value for money.',
    image: '/images/kanni.jpeg',
    days: 4,
    nights: 3,
    price: 'Rs. 9999',
    highlights: 'Balanced itinerary with popular attractions and cultural experiences: Thanjavore'
  },
  {
    name: 'Historical Temples Tour',
    description: 'Explore the rich history of Tamil Nadu’s famous temples.',
    image: '/images/sprit1.jpg',
    days: 5,
    nights: 4,
    price: 'Rs. 13999',
    highlights: 'Visit Meenakshi Temple, Brihadeeswarar Temple, and more.'
  },
  {
    name: 'Coastal Wonders',
    description: 'Discover Tamil Nadu’s stunning coastal destinations.',
    image: '/images/dhanushkodi-1657617190_a01160e4f134648aa6de.webp',
    days: 3,
    nights: 2,
    price: 'Rs. 7499',
    highlights: 'Enjoy Marina Beach, Kanyakumari, and the serene coastal beauty.'
  },
  {
    name: 'Hill Station Escapade',
    description: 'Relax and rejuvenate in Tamil Nadu’s hill stations.',
    image: '/images/kodaikanal.jpeg',
    days: 7,
    nights: 6,
    price: 'Rs. 21999',
    highlights: 'Explore Ooty, Kodaikanal, and Yercaud with scenic views and cool climate.'
  }
];

const Package = () => {
  return (
    <div className="package-page">
      <header className="package-header">
        <h1>Our Travel Packages</h1>
        <p>Choose the perfect package for your next adventure!</p>
      </header>
      <main className="package-main">
        <div className="package-grid">
          {packages.map((pkg, index) => (
            <div key={index} className="package-card">
              <img src={pkg.image} alt={pkg.name} className="package-image" />
              <div className="package-info">
                <h2 className="package-title">{pkg.name}</h2>
                <p className="package-description">{pkg.description}</p>
                <div className="package-details">
                  <p><strong>Days:</strong> {pkg.days}</p>
                  <p><strong>Nights:</strong> {pkg.nights}</p>
                  <p><strong>Price:</strong> {pkg.price}</p>
                  <p><strong>Highlights:</strong> {pkg.highlights}</p>
                </div>
                <button className="proceed-button">Know more</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Package;
