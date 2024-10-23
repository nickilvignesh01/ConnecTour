import React, { useState } from 'react';

const AddForm = () => {
  const [formType, setFormType] = useState('hiddenplaces'); // Default type
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    description: '',
    image: null,
  });

  // Handles form type change (hiddenplaces, hotels, guides, foods)
  const handleTypeChange = (e) => {
    setFormType(e.target.value);
  };

  // Handles input changes for form fields (name, place, description)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handles image file change
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('type', formType);
    formDataObj.append('name', formData.name);
    formDataObj.append('place', formData.place);
    formDataObj.append('description', formData.description);
    formDataObj.append('image', formData.image);

    try {
      const response = await fetch('http://localhost:3001/api/requests/add', {
        method: 'POST',
        body: formDataObj,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert(data.message || 'Form submitted successfully!'); // Show success message
      // Reset the form after submission
      setFormData({
        name: '',
        place: '',
        description: '',
        image: null,
      });
    } catch (error) {
      console.error('Error:', error); // Log error for debugging
      alert('Failed to submit the form. Please try again.'); // Show error message
    }
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
    },
    button: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      width: '100%',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Add {formType.charAt(0).toUpperCase() + formType.slice(1)}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={styles.formGroup}>
          <label htmlFor="formType" style={styles.label}>Select Type:</label>
          <select id="formType" value={formType} onChange={handleTypeChange} style={styles.input}>
            <option value="hiddenplaces">Hidden Places</option>
            <option value="hotels">Hotels</option>
            <option value="guides">Guides</option>
            <option value="foods">Foods</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="place" style={styles.label}>Place:</label>
          <input
            type="text"
            id="place"
            name="place"
            value={formData.place}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            style={styles.textarea}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="image" style={styles.label}>Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddForm;
