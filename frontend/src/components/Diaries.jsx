import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../RevStyle.css';

const Diaries = () => {
    const [experiences, setExperiences] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/experiences');
                setExperiences(response.data);
            } catch (error) {
                console.error('Error fetching experiences:', error);
            }
        };
        fetchExperiences();
    }, []);

    const handleShareExperience = () => {
        // Check if user is logged in by checking localStorage for 'isLoggedIn' key
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            // User is logged in, navigate to the WriteExperience page
            navigate('/write-experience');
        } else {
            // User is not logged in, navigate to the login page
            navigate('/login');
        }
    };
    
    
    return (
        <div className="diaries-container">
            <h2 className="diaries-title">Traveler Diaries</h2>
            <ul className="experience-list">
                {experiences.length > 0 ? (
                    experiences.map((experience) => (
                        <li key={experience._id} className="experience-item">
                            <div className="experience-box">
                                <img src={experience.imageUrl} alt={experience.title} className="experience-image" />
                                <div className="experience-details">
                                    <h3 className="experience-title">{experience.title}</h3>
                                    <p className="experience-content">{experience.description}</p>
                                    <p className="experience-rating">Rating: {experience.rating}/10</p>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No experiences found.</p>
                )}
            </ul>
            <div
                className="background-image"
                style={{
                    backgroundImage: "url('/images/GEN11.webp')",
                    backgroundPosition: "right bottom",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    height: "250%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "150%",
                    filter: "blur(3px)",
                    zIndex: -1,
                }}
            ></div>
            <button className="submit-experience-btn" onClick={handleShareExperience}>
                Share Your Experience
            </button>
        </div>
    );
};

export default Diaries;
