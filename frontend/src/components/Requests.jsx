import React, { useEffect, useState } from 'react';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/requests/all');
        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }
        const data = await response.json();
        setRequests(data);
      } catch (err) {
        console.error('Error fetching requests:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/requests/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      console.log('Request deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      alert(`Error deleting request: ${error.message}`);
    }
  };
  
  

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Requests</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <ul style={styles.list}>
          {requests.map((request) => (
            <li key={request._id} style={styles.listItem}>
              <h3>{request.name}</h3>
              <p><strong>Type:</strong> {request.type}</p>
              <p><strong>Place:</strong> {request.place}</p>
              <p><strong>Description:</strong> {request.description}</p>
              {request.image && (
                <img 
                  src={`http://localhost:3001/${request.image}`} 
                  alt={request.name} 
                  style={styles.image} 
                />
              )}
              {/* Delete button */}
              <button 
                onClick={() => handleDelete(request._id)} 
                style={styles.deleteButton}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Inline styles remain unchanged
const styles = {
  container: {
    maxWidth: '800px',
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
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff',
  },
  image: {
    maxWidth: '30%',
    height: 'auto',
    borderRadius: '5px',
    display: 'block',  // Ensures the image is treated as a block element
    margin: '0 auto',  // Centers the image
  },
  deleteButton: {
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: '#ff4d4d',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
  },
};

export default Requests;
