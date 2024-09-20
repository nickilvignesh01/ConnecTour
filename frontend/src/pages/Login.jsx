// Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Style.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            navigate('/'); // Redirect if already logged in
        }
    }, [navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                const { data } = result;
                if (data.message === "Admin login successful") {
                    alert("Admin login successful!");
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userRole', 'admin');
                    navigate('/admin-dashboard');
                } else if (data.message === "User login successful") {
                    alert("Login successful!");
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', email);
                    navigate('/');
                } else {
                    alert("Invalid credentials. Please try again.");
                }
            })
            .catch(err => {
                console.error('Login error:', err);
                alert('An error occurred during login. Please try again.');
            });
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Id</label>
                        <input 
                            type="email" 
                            id="email"
                            placeholder="Enter Email"
                            className="form-input" 
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        /> 
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            placeholder="Enter Password"
                            className="form-input" 
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                </form>

                <p className="register-prompt">Don't have an account? <Link to='/register' className="register-link">Register</Link></p>
            </div>
        </div>
    );
}

export default Login;
