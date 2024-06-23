import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import '../styles/Register.css';

const Register = () => {
    const [user, setUser] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(user);
            navigate('/login');
        } catch (error) {
            alert('Registration failed.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <div className="registration-page">
            <div className="background-image"></div>
            <div className="container">
                <h1 className="app-name">Registration</h1>
                <form className="form-container" onSubmit={handleRegister}>
                    <div className="form-control">
                        <label className="label">Username:</label>
                        <input type="text" className="input" name="username" value={user.username} onChange={handleChange} />
                    </div>
                    <div className="form-control">
                        <label className="label">Email:</label>
                        <input type="email" className="input" name="email" value={user.email} onChange={handleChange} />
                    </div>
                    <div className="form-control">
                        <label className="label">Password:</label>
                        <input type="password" className="input" name="password" value={user.password} onChange={handleChange} />
                    </div>
                    <button className="button" >Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;