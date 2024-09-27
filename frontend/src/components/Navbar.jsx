import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar'; 
import '../Style.css'; 

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole'); // Get user role

    const handleSignInClick = () => {
        navigate('/login');
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('userRole'); // Remove user role on logout

        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">ConnecTour</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/places">Places</Link>
                        </li>
                       
                        <li className="nav-item">
                            <Link className="nav-link" to="/maps">Map</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/Diaries">Diaries</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/packages">Packages</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/gallery">Gallery</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        {/* Show Admin link only if user is an admin */}
                        {userRole === 'admin' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin Panel</Link>
                            </li>
                        )}
                    </ul>
                    <div className="d-flex align-items-center ms-lg-3">
                        <SearchBar />
                        {!isLoggedIn ? (
                            <button className="btn btn-outline-light ms-2" type="button" onClick={handleSignInClick}>
                                Sign In
                            </button>
                        ) : (
                            <button className="btn btn-outline-light ms-2" type="button" onClick={handleLogoutClick}>
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
