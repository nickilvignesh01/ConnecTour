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

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Admin Home</h1>
            
            <h2 style={{ color: '#2c3e50' }}>Pending Items</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
                {pendingItems.length > 0 ? pendingItems.map((item) => (
                    <div key={item._id} style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0 }}>{item.title}</h3>
                        <button 
                            onClick={() => approveItem(item._id)} 
                            style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                        >
                            Approve
                        </button>
                    </div>
                )) : <p>No pending items</p>}
            </div>

            <button 
                onClick={handleShowBookings} 
                style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
                Manage Bookings
            </button>

            {showBookings && (
                <div style={{ marginTop: '30px' }}>
                    <h2 style={{ color: '#2c3e50' }}>Bookings</h2>
                    <Bookings />
                </div>
            )}
        </div>
    );
};

export default AdminHome;
