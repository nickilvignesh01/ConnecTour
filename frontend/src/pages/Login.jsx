import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Style.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            navigate('/'); // Redirect if already logged in
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const result = await axios.post('http://localhost:3001/login', { email, password });
            const { data } = result;

            // Assuming the API returns user's name along with the login success message
            if (data.message === "Admin login successful") {
                alert("Admin login successful!");
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', 'admin');
                localStorage.setItem('userEmail', email); // Save email for admin
                navigate('/admin');
            } else if (data.message === "User login successful") {
                alert("Login successful!");
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email); // Save user's email
                localStorage.setItem('userName', data.userName); // Save user's name if returned
                navigate('/');
            }
        } catch (err) {
            console.error('Login error:', err);
            if (err.response && err.response.status === 400) {
                alert(err.response.data.message || 'Invalid credentials. Please try again.');
            } else {
                alert('An error occurred during login. Please try again.');
            }
        } finally {
            setLoading(false);
        }
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
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="register-prompt">
                    Don't have an account? 
                    <Link to='/register' className="register-link"> Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
