import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/check-auth', { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setIsAuthenticated(true);
                }
            })
            .catch(() => {
                setIsAuthenticated(false);
            });
    }, []);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
