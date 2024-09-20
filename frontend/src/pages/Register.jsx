// Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Style.css'; // Ensure this path is correct

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:3001/register', { name, email, password })
            .then(result => {
                const { data } = result;
                if (data.message === "User already exists") {
                    alert("E-mail already registered! Please Login.");
                    navigate('/login');
                } else if (data.message === "Registration successful") {
                    alert("Registered successfully! Please Login to proceed.");
                    navigate('/login');
                }
            })
            .catch(err => {
                console.error('Error during registration:', err);
                alert('Registration failed! Please try again.');
            });
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className="login-title">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input 
                            type="text" 
                            id="name"
                            placeholder="Enter Name"
                            className="form-input" 
                            onChange={(event) => setName(event.target.value)}
                            required
                        /> 
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Id</label>
                        <input 
                            type="email" 
                            id="email"
                            placeholder="Enter Email"
                            className="form-input" 
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
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Register</button>
                </form>

                <p className="register-prompt">Already have an account? <Link to='/login' className="register-link">Login</Link></p>
            </div>
        </div>
    );
}

export default Register;
