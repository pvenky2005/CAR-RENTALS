import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, CarFront } from 'lucide-react';
import { motion } from 'framer-motion';
import bgImage from '../assets/auth-bg.png';
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login Data:', formData);

        // Simple Login Bypass for Preview
        const userData = {
            name: formData.email.split('@')[0] || 'User',
            email: formData.email
        };
        localStorage.setItem('user', JSON.stringify(userData));

        // Navigate to Home
        navigate('/home');
    };

    return (
        <div className="auth-container" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="auth-overlay"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="auth-card"
            >
                <div className="auth-header">
                    <div className="logo-container">
                        <div className="logo-icon">
                            <CarFront size={32} />
                        </div>
                        <div className="brand-name">Go<span>Drive</span></div>
                    </div>
                    <h1>Welcome Back</h1>
                    <p>The keys are waiting for you</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <Mail size={18} />
                            <input
                                type="email"
                                name="email"
                                className="auth-input"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label style={{ marginBottom: 0 }}>Password</label>
                            <a href="#" style={{ fontSize: '0.8rem', color: '#0071e3', textDecoration: 'none' }}>Forgot?</a>
                        </div>
                        <div className="input-wrapper">
                            <Lock size={18} />
                            <input
                                type="password"
                                name="password"
                                className="auth-input"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="auth-button"
                    >
                        Sign In
                    </motion.button>
                </form>

                <div className="auth-footer">
                    <p>First time here? <Link to="/register">Create an Account</Link></p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
