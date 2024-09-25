import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../RevStyle.css';

const Diaries = () => {
    const [experiences, setExperiences] = useState([]);

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
                                    <p className="experience-rating">Rating: {experience.rating}/5</p>
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
                    backgroundImage: "url('/images/ooty-1655457424_bca80f81e8391ebdaaca.webp')",
                    backgroundPosition: "right bottom",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    filter: "blur(3px)",
                    zIndex: -1,
                }}
            ></div>
            <Link to="/write-experience">
                <button className="submit-experience-btn">Share Your Experience</button>
            </Link>
        </div>
    );
};

export default Diaries;
