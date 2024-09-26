import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminHome = () => {
    const [pendingItems, setPendingItems] = useState([]);

    useEffect(() => {
        const fetchPendingItems = async () => {
            try {
                const response = await axios.get("/api/admin/pending"); // Your API endpoint
                setPendingItems(response.data);
            } catch (error) {
                console.error("Error fetching pending items:", error);
            }
        };

        fetchPendingItems();
    }, []);

    const approveItem = async (id) => {
        try {
            await axios.put(`/api/admin/approve/${id}`); // Your API endpoint
            setPendingItems(pendingItems.filter((item) => item._id !== id));
            alert("Item approved!");
        } catch (error) {
            console.error("Error approving item:", error);
        }
    };

    return (
        <div>
            <h1>Admin Home</h1>
            <h2>Pending Items</h2>
            <div>
                {pendingItems.map((item) => (
                    <div key={item._id}>
                        <h3>{item.title}</h3>
                        <button onClick={() => approveItem(item._id)}>Approve</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminHome;
