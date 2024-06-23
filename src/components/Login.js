import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, getCurrentUser } from '../services/authService';
import '../styles/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);

            if (response.accessToken) {
                const user = parseJwt(response.accessToken);

                if (user && user.authorities && user.authorities.includes('ROLE_ADMIN')) {
                    navigate('/admin-dashboard');
                } else if (user && user.authorities && user.authorities.includes('ROLE_USER')) {
                    navigate('/user-dashboard');
                } else {
                    setError('Unauthorized access');
                }
            }

        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid username or password');
        }
    };

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    return (
        <div className="login-page">
            <div className="background-image"></div>
            <div className="container">
                <h1 className="app-name">Login</h1>
                <form className="form-container" onSubmit={handleLogin}>
                    <div className="form-control">
                        <label className="label">Username:</label>
                        <input type="text" className="input" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label className="label">Password:</label>
                        <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="button" onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;