import React, { useState } from 'react';

const AddForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [placeId, setPlaceId] = useState('');
  const [type, setType] = useState(''); // Assuming you have different types
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile); // if you're uploading a file
    formData.append('placeId', placeId);
    formData.append('type', type);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);

    try {
      const response = await fetch('http://localhost:3001/api/add', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('Item added successfully');
        // Optionally reset the form or provide feedback to the user
      } else {
        console.error('Error adding item');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />
      <input
        type="text"
        value={placeId}
        onChange={(e) => setPlaceId(e.target.value)}
        placeholder="Place ID"
      />
      <input
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Type"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddForm;
