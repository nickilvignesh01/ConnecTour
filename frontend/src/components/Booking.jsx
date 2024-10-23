import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Booking = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const packageName = queryParams.get('package');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
  });

  const [message, setMessage] = useState('');

 
  useEffect(() => {
    const storedName = localStorage.getItem('userName'); // Retrieve 'userName'
    const storedEmail = localStorage.getItem('userEmail'); // Retrieve 'userEmail'
    
    if (storedName && storedEmail) {
      setFormData((prevData) => ({
        ...prevData,
       
        email: storedEmail,
      }));
    } else {
      
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingDetails = { ...formData, packageName };

    try {
      const response = await fetch('http://localhost:3001/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Booking submitted successfully!');
      } else {
        setMessage('Failed to submit booking: ' + data.error);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      setMessage('Error submitting booking. Please try again later.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Book Your Dream Vacation</h1>
        <p style={styles.subtitle}>
          Book your vacation with <strong>Connectour</strong> by entering your details below. Our team will contact you shortly via phone or email to confirm your booking for the <strong>{packageName}</strong> package.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            Submit Booking
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#2C5F2D', // Dark green
    padding: '20px',
  },
  card: {
    backgroundColor: '#FFFBE6',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    width: '750px', // Increased width for more content space
    textAlign: 'center',
  },
  title: {
    marginBottom: '15px',
    fontSize: '28px',
    color: '#333',
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: '25px',
    fontSize: '16px',
    color: '#664343',
    lineHeight: '1.8',
    textAlign: 'justify',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  label: {
    marginBottom: '5px',
    fontSize: '14px',
    color: '#333',
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border 0.3s',
  },
  submitButton: {
    padding: '12px 0',
    backgroundColor: '#007bff', // Blue button for a calming effect
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  message: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#28a745',
  },
};

export default Booking;
