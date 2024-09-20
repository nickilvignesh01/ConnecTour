import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles.css'; // Adjust the path as needed

const AddForm = () => {
  const { placeId } = useParams(); // Get placeId from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: '',
    name: '',
    description: '',
    image: '',
    price: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/api/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, placeId }), // Include placeId in the body
    })
    .then(response => response.json())
    .then(data => {
      console.log('Data added successfully:', data);
      navigate(`/places/${placeId}`); // Navigate back to PlaceDetails after adding
    })
    .catch(error => console.error('Error adding data:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <select name="type" onChange={handleChange} required>
        <option value="">Select Type</option>
        <option value="hotel">Hotel</option>
        <option value="food">Food</option>
        <option value="guide">Guide</option>
      </select>

      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        onChange={handleChange}
      />
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddForm;
