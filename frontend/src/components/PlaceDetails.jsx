import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../PlaceDetails.css';

const PlaceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [place, setPlace] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlaceDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/places/${id}`);
                setPlace(response.data);
            } catch (err) {
                console.error('Error fetching place details:', err);
                setError(err.response ? err.response.data.message : 'Error fetching place details');
            }
        };

        if (id) {
            fetchPlaceDetails();
        } else {
            setError('Place ID is undefined');
        }
    }, [id]);

    const handleAddClick = () => {
        navigate('/add-form');
    };

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!place) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="place-details">
            {/* Main Image and Description */}
            <div className="main-image-container">
                <img src={place.src} alt={place.title} className="main-image" />
                <h1>{place.title}</h1>
                <p className="image-description">{place.description}</p>
            </div>
            <h2 className="explore-more">Explore More</h2> 
            <div className="sections">
                {/* Hotels Section */}
                <div className="section">
                    <h2>Hotels</h2>
                    <div className="scroll-container">
                        <div className="scroll-grid">
                            {place.hotels.length > 0 ? (
                                place.hotels.map(hotel => (
                                    <div className="scroll-item" key={hotel._id.$oid}>
                                        <img src={hotel.src} alt={hotel.title} className="grid-image" />
                                        <h3>{hotel.title}</h3>
                                        <p className="item-description">{hotel.description}</p>
                                        <a href={hotel.locationUrl} target="_blank" rel="noopener noreferrer">
                                            <button className="view-map-button">View on Map</button>
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <p>No hotels available.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Foods Section */}
                <div className="section">
                    <h2>Foods</h2>
                    <div className="scroll-container">
                        <div className="scroll-grid">
                            {place.foods.length > 0 ? (
                                place.foods.map(food => (
                                    <div className="scroll-item" key={food._id.$oid}>
                                        <img src={food.src} alt={food.title} className="grid-image" />
                                        <h3>{food.title}</h3>
                                        <p className="item-description">{food.description}</p>
                                        <a href={food.locationUrl} target="_blank" rel="noopener noreferrer">
                                            <button className="view-map-button">View on Map</button>
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <p>No foods available.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Hidden Places Section */}
                <div className="section">
                    <h2>Hidden Places</h2>
                    <div className="scroll-container">
                        <div className="scroll-grid">
                            {place.hiddenPlaces.length > 0 ? (
                                place.hiddenPlaces.map(hiddenPlace => (
                                    <div className="scroll-item" key={hiddenPlace._id.$oid}>
                                        <img src={hiddenPlace.src} alt={hiddenPlace.title} className="grid-image" />
                                        <h3>{hiddenPlace.title}</h3>
                                        <p className="item-description">{hiddenPlace.description}</p>
                                        <a href={hiddenPlace.locationUrl} target="_blank" rel="noopener noreferrer">
                                            <button className="view-map-button">View on Map</button>
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <p>No hidden places available.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Guides Section */}
                <div className="section">
                    <h2>Guides</h2>
                    <div className="scroll-container">
                        <div className="scroll-grid">
                            {place.guides.length > 0 ? (
                                place.guides.map(guide => (
                                    <div className="scroll-item" key={guide._id.$oid}>
                                        <img src={guide.src} alt={guide.title} className="grid-image" />
                                        <h3>{guide.title}</h3>
                                        <p className="item-description">{guide.description}</p>
                                        <a href={guide.locationUrl} target="_blank" rel="noopener noreferrer">
                                            <button className="view-map-button">View on Map</button>
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <p>No guides available.</p>
                            )}
                        </div>
                    </div>
                </div>

                <p className="add-description">
                    Join us by adding your hotels, hidden places you know, list yourself as a local guide, or share your favorite local foods!
                </p>

                {/* Button to Add New Item */}
                <button className="add-button" onClick={handleAddClick}>Add New</button>
            </div>
        </div>
    );
};

export default PlaceDetails;
