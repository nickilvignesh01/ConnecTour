// src/AdminHome.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Bookings from './Bookings';

const AdminHome = () => {
    const navigate = useNavigate();
    const [pendingItems, setPendingItems] = useState([]);
    const [showBookings, setShowBookings] = useState(false);

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        if (userRole !== 'admin') {
            alert('Access denied! Only admins can access this page.');
            navigate('/'); // Redirect to home if not an admin
        } else {
            const fetchPendingItems = async () => {
                try {
                    const response = await axios.get("/api/admin/pending");
                    setPendingItems(response.data);
                } catch (error) {
                    console.error("Error fetching pending items:", error);
                }
            };

            fetchPendingItems();
        }
    }, [navigate]);

    const approveItem = async (id) => {
        try {
            await axios.put(`/api/admin/approve/${id}`);
            setPendingItems(pendingItems.filter((item) => item._id !== id));
            alert("Item approved!");
        } catch (error) {
            console.error("Error approving item:", error);
        }
    };

    const handleShowBookings = () => {
        setShowBookings(true);
    };

    const handleAddPlace = () => {
        navigate('/admin/add-place'); // Navigate to AdminAddPlace component
    };

    const handleUserRequests = () => {
        navigate('/admin/requests'); // Navigate to Requests component
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Admin Dashboard</h1>

            {/* Welcome Message */}
            <div style={styles.welcomeSection}>
                <h2 style={styles.subtitle}>Welcome, Admin!</h2>
                <p style={styles.description}>
                    Manage your tourism platform effectively with the following functionalities:
                </p>
            </div>

            {/* Add Place Section */}
            <div style={styles.actionSection}>
                <h3 style={styles.actionTitle}>Add Tourist Places</h3>
                <p style={styles.actionDescription}>
                    Include new hidden gems, hotels, foods, and guides to enrich the traveler experience.
                </p>
                <button 
                    onClick={handleAddPlace} 
                    style={styles.button}
                >
                    Add Place
                </button>
            </div>

            {/* User Requests Section */}
            <div style={styles.actionSection}>
                <h3 style={styles.actionTitle}>Manage User Requests</h3>
                <p style={styles.actionDescription}>
                    Review and approve user requests for new places or changes to existing ones.
                </p>
                <button 
                    onClick={handleUserRequests} 
                    style={styles.button}
                >
                    User Requests
                </button>
            </div>

            {/* Manage Bookings Section */}
            <div style={styles.actionSection}>
                <h3 style={styles.actionTitle}>Manage Bookings</h3>
                <p style={styles.actionDescription}>
                    Keep track of user bookings and manage them efficiently.
                </p>
                <button 
                    onClick={handleShowBookings} 
                    style={styles.button}
                >
                    View Bookings
                </button>
            </div>

            {/* Bookings Section */}
            {showBookings && (
                <div style={styles.bookingsSection}>
                    <h2 style={styles.subtitle}>Bookings</h2>
                    <Bookings />
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
    },
    title: {
        textAlign: 'center',
        color: '#2c3e50', // Darker color for title
        marginBottom: '30px',
        fontSize: '2.5em',
    },
    welcomeSection: {
        textAlign: 'center',
        color: '#34495e', // Softer dark color for welcome text
        marginBottom: '40px',
    },
    subtitle: {
        color: '#2980b9', // Bright blue for subtitle
        marginBottom: '10px',
    },
    description: {
        maxWidth: '600px',
        margin: '0 auto',
        fontSize: '1.2em',
        color: '#7f8c8d', // Grey color for description text
    },
    actionSection: {
        marginBottom: '40px',
        textAlign: 'center',
        padding: '20px',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    actionTitle: {
        color: '#2c3e50', // Darker color for action titles
        fontSize: '1.5em',
        marginBottom: '10px',
    },
    actionDescription: {
        marginBottom: '20px',
        fontSize: '1em',
        color: '#7f8c8d', // Grey color for action description
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#27ae60', // Green color for buttons
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1em',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#219653', // Darker green for hover effect
    },
    bookingsSection: {
        marginTop: '30px',
        padding: '20px',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
};


export default AdminHome;
