// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const placesList = [
  'Spiritual',
  'Adventure',
  'Hills',
  'Beaches',
  'Ooty',
  'Kodaikanal',
  'Kancheepuram',
  'Kanniakumari',
  'Mahabalipuram',
  'Madurai',
  'Chennai',
  'Thanjavur',
  'Velankanni',
  'Rameswaram',
  'Coimbatore'
];

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState(placesList);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredPlaces(
      placesList.filter(place =>
        place.toLowerCase().includes(query.toLowerCase())
      )
    );
    setDropdownVisible(query.length > 0);
  };

  return (
    <div className="search-container d-flex position-relative">
      <div className="input-group">
        <input
          className="search-input form-control me-2"
          type="search"
          placeholder="Search destinations" // Placeholder text
          aria-label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <span className="input-group-text">
          <i className="fas fa-search"></i> {/* Font Awesome search icon */}
        </span>
      </div>
      {dropdownVisible && (
        <div className="dropdown-menu show">
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map((place, index) => (
              <Link key={index} className="dropdown-item" to={`/places/${place.toLowerCase()}`}>
                {place}
              </Link>
            ))
          ) : (
            <span className="dropdown-item">No results found</span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
