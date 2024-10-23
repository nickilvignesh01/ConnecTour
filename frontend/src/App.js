// src/App.js
import './App.css';
import './Style.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Navbar from './components/Navbar';
import Maps from "./components/Maps"; 
import Footer from './components/Footer';
import Package from './pages/Packages';
import Register from './pages/Register';
import Login from './pages/Login';
import GoogleSignIn from './pages/GoogleSignIn';
import Diaries from './components/Diaries';
import Places from './components/Places';
import Booking from './components/Booking';
import WriteExperience from './components/WriteExperience';
import AdminHome from './components/AdminHome'; 
import Logout from './pages/Logout';
import PlaceDetails from './components/PlaceDetails'; 
import AddForm from './components/AddForm'; 
import PlaceDescription from './components/PlaceDescription';
import AdminAddPlace from './components/AdminAddPlace';
import Requests from './components/Requests'; // Ensure this path is correct

import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '178167574374-21n9nm6rv8qcbaoobtqdbum29c9ajpba.apps.googleusercontent.com'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <GoogleOAuthProvider clientId={clientId}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/places" element={<Places />} />
            <Route path="/add-form" element={<AddForm />} />
            <Route path="/place-details/:id" element={<PlaceDetails />} />
            <Route path="/diaries" element={<Diaries />} />  
            <Route path="/write-experience" element={<WriteExperience />} />  
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/packages" element={<Package />} />
            <Route path="/place/:packageName" element={<PlaceDescription />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/googlesignin" element={<GoogleSignIn />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/requests" element={<Requests />} /> {/* Correctly routing to Requests */}
            <Route path="/admin/add-place" element={<AdminAddPlace />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </GoogleOAuthProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
