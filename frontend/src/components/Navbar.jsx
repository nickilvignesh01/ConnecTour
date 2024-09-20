import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar'; // Ensure this path is correct
import '../Style.css'; // Ensure this path is correct

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check login state

    const handleSignInClick = () => {
        navigate('/login');
    };

    const handleLogoutClick = () => {
        // Clear user-related information from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.setItem('isLoggedIn', 'false'); // Update login state

        // Redirect to login page
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">
                    ConnecTour
                </Link>
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
                            <Link className="nav-link" aria-current="page" to="/home">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/places">
                                Places
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/gallery">
                                Gallery
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                About
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="/experiences"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Experience
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <Link className="dropdown-item" to="/spiritual">
                                        Spiritual
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/adventure">
                                        Adventure
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/hills">
                                        Hills
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/beaches">
                                        Beaches
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">
                                Contact Us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/packages">
                                Packages
                            </Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center ms-lg-3">
                        <SearchBar />
                        {!isLoggedIn ? (
                            <>
                                <button
                                    className="btn btn-outline-light ms-2"
                                    type="button"
                                    onClick={handleSignInClick}
                                >
                                    SignIn
                                </button>
                            </>
                        ) : (
                            <button
                                className="btn btn-outline-light ms-2"
                                type="button"
                                onClick={handleLogoutClick}
                            >
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
