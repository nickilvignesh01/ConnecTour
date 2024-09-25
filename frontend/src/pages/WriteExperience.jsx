import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Style.css';

const WriteExperience = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(1);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageUpload = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        // Create form data to send the image and experience details
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('rating', rating);
        formData.append('image', image);

        try {
            await axios.post('http://localhost:3001/api/experiences', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Experience submitted successfully!');
            navigate('/diaries'); // Redirect to Diaries page
        } catch (error) {
            console.error('Error submitting experience:', error);
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
                    <label htmlFor="title">Name and place</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rating (1 to 5)</label>
                    <input
                        type="number"
                        id="rating"
                        value={rating}
                        min="1"
                        max="5"
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
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
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default WriteExperience;
