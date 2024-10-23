import React, { useState } from 'react';

const AdminAddPlace = () => {
  const [place, setPlace] = useState({
    title: '',
    description: '',
    src: '',
    category: '',
    location: '',
    hotels: [],
    foods: [],
    guides: [],
    hiddenPlaces: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlace({ ...place, [name]: value });
  };

  const handleArrayChange = (type, index, e) => {
    const { name, value } = e.target;
    const updatedArray = [...place[type]];
    updatedArray[index] = { ...updatedArray[index], [name]: value };
    setPlace({ ...place, [type]: updatedArray });
  };

  const addToArray = (type) => {
    setPlace({ ...place, [type]: [...place[type], { title: '', src: '', locationUrl: '', description: '' }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!place.title || !place.description || !place.src || !place.location || !place.category) {
      console.error('Title, description, source, location, and category are required.');
      return;
    }

    const payload = {
      name: place.title,
      description: place.description,
      location: place.location,
      imageUrl: place.src,
      category: place.category,
      hotels: place.hotels.map(hotel => ({ ...hotel })),
      foods: place.foods.map(food => ({ ...food })),
      guides: place.guides.map(guide => ({ ...guide })),
      hiddenPlaces: place.hiddenPlaces.map(hiddenPlace => ({ ...hiddenPlace }))
    };

    try {
      const response = await fetch('http://localhost:3001/api/places', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Place added:', data);
        setPlace({
          title: '',
          description: '',
          src: '',
          category: '',
          location: '',
          hotels: [],
          foods: [],
          guides: [],
          hiddenPlaces: []
        });
      } else {
        const errorData = await response.json();
        console.error('Error adding place:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9'
  };

  const inputStyle = {
    margin: '10px 0',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%'
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px 0',
    backgroundColor: '#28a745',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const sectionTitle = {
    margin: '20px 0 10px 0',
    fontWeight: 'bold',
    fontSize: '18px'
  };

  const fieldSetStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px'
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Add New Place</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label>
          Title:
          <input type="text" name="title" value={place.title} onChange={handleChange} style={inputStyle} required />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={place.description} onChange={handleChange} style={inputStyle} required />
        </label>
        <label>
          Image Source (URL):
          <input type="text" name="src" value={place.src} onChange={handleChange} style={inputStyle} required />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={place.category} onChange={handleChange} style={inputStyle} required />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={place.location} onChange={handleChange} style={inputStyle} required />
        </label>

        <h3 style={sectionTitle}>Hotels</h3>
        {place.hotels.map((hotel, index) => (
          <fieldset key={index} style={fieldSetStyle}>
            <label>Hotel Title:</label>
            <input
              type="text"
              name="title"
              value={hotel.title}
              onChange={(e) => handleArrayChange('hotels', index, e)}
              style={inputStyle}
              required
            />
            <label>Image URL:</label>
            <input
              type="text"
              name="src"
              value={hotel.src}
              onChange={(e) => handleArrayChange('hotels', index, e)}
              style={inputStyle}
              required
            />
            <label>Location URL:</label>
            <input
              type="text"
              name="locationUrl"
              value={hotel.locationUrl}
              onChange={(e) => handleArrayChange('hotels', index, e)}
              style={inputStyle}
              required
            />
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={hotel.description}
              onChange={(e) => handleArrayChange('hotels', index, e)}
              style={inputStyle}
              required
            />
          </fieldset>
        ))}
        <button type="button" onClick={() => addToArray('hotels')} style={buttonStyle}>
          Add Hotel
        </button>

        <h3 style={sectionTitle}>Foods</h3>
        {place.foods.map((food, index) => (
          <fieldset key={index} style={fieldSetStyle}>
            <label>Food Title:</label>
            <input
              type="text"
              name="title"
              value={food.title}
              onChange={(e) => handleArrayChange('foods', index, e)}
              style={inputStyle}
              required
            />
            <label>Image URL:</label>
            <input
              type="text"
              name="src"
              value={food.src}
              onChange={(e) => handleArrayChange('foods', index, e)}
              style={inputStyle}
              required
            />
            <label>Location URL:</label>
            <input
              type="text"
              name="locationUrl"
              value={food.locationUrl}
              onChange={(e) => handleArrayChange('foods', index, e)}
              style={inputStyle}
              required
            />
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={food.description}
              onChange={(e) => handleArrayChange('foods', index, e)}
              style={inputStyle}
              required
            />
          </fieldset>
        ))}
        <button type="button" onClick={() => addToArray('foods')} style={buttonStyle}>
          Add Food
        </button>

        {/* Similarly for Guides and Hidden Places */}
        
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
    </div>
  );
};

export default AdminAddPlace;
