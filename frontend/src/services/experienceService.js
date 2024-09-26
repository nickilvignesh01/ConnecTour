import axios from 'axios';

// Function to submit an experience
export const submitExperience = async (experienceData) => {
    const token = localStorage.getItem('token'); // Adjust based on where you store the token

    const formData = new FormData();
    formData.append('title', experienceData.title);
    formData.append('description', experienceData.description);
    formData.append('rating', experienceData.rating);
    formData.append('image', experienceData.image);

    const response = await axios.post('/api/experiences/add', formData, {
        headers: {
            'Authorization': token ? `Bearer ${token}` : ''
        },
    });

    return response.data; // Return the response data
};
