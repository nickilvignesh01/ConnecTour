import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../AdminHome.css'; 

const AdminHome = () => {
    const [places, setPlaces] = useState([]);
    const [guides, setGuides] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [newPlace, setNewPlace] = useState('');
    const [newGuide, setNewGuide] = useState('');
    const [newHotel, setNewHotel] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const [placesResponse, guidesResponse, hotelsResponse] = await Promise.all([
                axios.get('/api/places'),
                axios.get('/api/guides'),
                axios.get('/api/hotels')
            ]);
            setPlaces(placesResponse.data);
            setGuides(guidesResponse.data);
            setHotels(hotelsResponse.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleAddPlace = async () => {
        try {
            await axios.post('/api/places', { name: newPlace });
            setNewPlace('');
            fetchItems();
        } catch (error) {
            console.error('Error adding place:', error);
        }
    };

    const handleDeletePlace = async (id) => {
        try {
            await axios.delete(`/api/places/${id}`);
            fetchItems();
        } catch (error) {
            console.error('Error deleting place:', error);
        }
    };

    const handleAddGuide = async () => {
        try {
            await axios.post('/api/guides', { name: newGuide });
            setNewGuide('');
            fetchItems();
        } catch (error) {
            console.error('Error adding guide:', error);
        }
    };

    const handleDeleteGuide = async (id) => {
        try {
            await axios.delete(`/api/guides/${id}`);
            fetchItems();
        } catch (error) {
            console.error('Error deleting guide:', error);
        }
    };

    const handleAddHotel = async () => {
        try {
            await axios.post('/api/hotels', { name: newHotel });
            setNewHotel('');
            fetchItems();
        } catch (error) {
            console.error('Error adding hotel:', error);
        }
    };

    const handleDeleteHotel = async (id) => {
        try {
            await axios.delete(`/api/hotels/${id}`);
            fetchItems();
        } catch (error) {
            console.error('Error deleting hotel:', error);
        }
    };

    const handleCustomerSubmission = async (id, status) => {
        try {
            await axios.put(`/api/customers/${id}`, { status });
            fetchItems();
        } catch (error) {
            console.error('Error updating customer submission:', error);
        }
    };

    return (
        <div className="admin-home">
            <h1>Admin Dashboard</h1>

            <div className="section">
                <h2>Add Place</h2>
                <input 
                    type="text" 
                    value={newPlace} 
                    onChange={(e) => setNewPlace(e.target.value)} 
                    placeholder="New Place"
                    className="input-field"
                />
                <button onClick={handleAddPlace} className="btn btn-add">Add Place</button>
            </div>

            <div className="section">
                <h2>Manage Places</h2>
                <ul className="item-list">
                    {places.map(place => (
                        <li key={place._id}>
                            {place.name}
                            <button onClick={() => handleDeletePlace(place._id)} className="btn btn-delete">Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="section">
                <h2>Add Guide</h2>
                <input 
                    type="text" 
                    value={newGuide} 
                    onChange={(e) => setNewGuide(e.target.value)} 
                    placeholder="New Guide"
                    className="input-field"
                />
                <button onClick={handleAddGuide} className="btn btn-add">Add Guide</button>
            </div>

            <div className="section">
                <h2>Manage Guides</h2>
                <ul className="item-list">
                    {guides.map(guide => (
                        <li key={guide._id}>
                            {guide.name}
                            <button onClick={() => handleDeleteGuide(guide._id)} className="btn btn-delete">Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="section">
                <h2>Add Hotel</h2>
                <input 
                    type="text" 
                    value={newHotel} 
                    onChange={(e) => setNewHotel(e.target.value)} 
                    placeholder="New Hotel"
                    className="input-field"
                />
                <button onClick={handleAddHotel} className="btn btn-add">Add Hotel</button>
            </div>

            <div className="section">
                <h2>Manage Hotels</h2>
                <ul className="item-list">
                    {hotels.map(hotel => (
                        <li key={hotel._id}>
                            {hotel.name}
                            <button onClick={() => handleDeleteHotel(hotel._id)} className="btn btn-delete">Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="section">
                <h2>Manage Customer Submissions</h2>
                {[
                    { id: '1', name: 'vignesh', type: 'place', status: 'pending' },
                    { id: '2', name: 'vineesh', type: 'hotel', status: 'pending' }
                ].map(submission => (
                    <div key={submission.id} className="submission">
                        <span>{submission.name} - {submission.type}</span>
                        <button onClick={() => handleCustomerSubmission(submission.id, 'accepted')} className="btn btn-accept">Accept</button>
                        <button onClick={() => handleCustomerSubmission(submission.id, 'rejected')} className="btn btn-reject">Reject</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminHome;
