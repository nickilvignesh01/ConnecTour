import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Style.css';

const WriteExperience = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(1);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(''); 
    const navigate = useNavigate();

    // Fetch user details on component mount
    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
    
        if (userEmail) {
            // Log the user email
            console.log('Fetching user data for email:', userEmail);
            axios.get(`http://localhost:3001/api/users/${userEmail}`)
                .then((response) => {
                    const user = response.data;
                    setTitle(user.name); // Set user's name
                    setEmail(user.email); // Set user's email
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error.response ? error.response.data : error.message);
                    // Optionally redirect to login if user is not found
                    if (error.response?.status === 404) {
                        alert('User not found. Redirecting to login...');
                        navigate('/login');
                    }
                });
        } else {
            navigate('/login');
        }
    }, [navigate]);
    
    const handleImageUpload = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        // Log the form data before submitting
        console.log('Form Data:', {
            title,
            description,
            rating,
            image: image ? image.name : 'No Image',
            email
        });

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('rating', rating);
        formData.append('image', image);
        formData.append('email', email); // Include email in form data

        try {
            const response = await axios.post('http://localhost:3001/api/experiences', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Experience submitted successfully!');
            navigate('/diaries'); 
        } catch (error) {
            console.error('Error submitting experience:', error.response ? error.response.data : error.message);
            alert('Error submitting experience. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="write-experience-container">
            <h2 className="write-experience-title">Share Your Experience</h2>
            <form onSubmit={handleSubmit} className="experience-form">
                <div className="form-group">
                    <label htmlFor="title">Your Name</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Share your experience</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rating (1 to 10)</label>
                    <input
                        type="range"
                        id="rating"
                        value={rating}
                        min="1"
                        max="10"
                        onChange={(e) => setRating(Number(e.target.value))} // Ensure rating is a number
                        required
                        style={{ width: "100%" }}
                    />
                    <div className="rating-value">{rating}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Upload Image</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                        required
                    />
                </div>
                <div
                    className="background-image"
                    style={{
                        backgroundImage: "url('/images/GEN 2.webp')",
                        backgroundPosition: "right bottom",
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "fixed",
                        height: "150%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        filter: "blur(3px)",
                        zIndex: -1,
                    }}
                ></div>
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default WriteExperience;
