import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const clientId = '178167574374-21n9nm6rv8qcbaoobtqdbum29c9ajpba.apps.googleusercontent.com'; // Use your actual client ID

const GoogleSignIn = () => {
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse) => {
        console.log('Google Login Success:', credentialResponse);
        const tokenId = credentialResponse.credential;
        try {
            const result = await axios.post('http://localhost:3001/google-login', { tokenId });
            console.log('Server response:', result.data);
            if (result.data === 'New user registered') {
                alert('Registered successfully! Please proceed.');
            } else {
                alert('Logged in successfully! Please proceed.');
            }
            navigate('/home'); // Redirect after successful login or registration
        } catch (error) {
            console.log('Google Login Error:', error.response ? error.response.data : error.message);
        }
    };

    const handleFailure = (error) => {
        console.error('Google Login Failed:', error);
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div>
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleFailure}
                    useOneTap
                />
                <p>Click the button above to sign in with Google</p>
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleSignIn;
