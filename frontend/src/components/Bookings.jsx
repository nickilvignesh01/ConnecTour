// components/ViewBookings.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../form.css'; // Ensure the correct path is set

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/bookings');
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load bookings');
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []);

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p className="bookings-error">{error}</p>;
  }

  return (
    <div className="bookings-container">
      <h2 className="bookings-heading">User Bookings</h2>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Package</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.name}</td>
              <td>{booking.email}</td>
              <td>{booking.phone}</td>
              <td>{new Date(booking.date).toLocaleDateString()}</td>
              <td>{booking.packageName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
