import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin, CarFront } from 'lucide-react';
import { motion } from 'framer-motion';
import bgImage from '../assets/auth-bg.png';
import './Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registration Data:', formData);
        // Add registration logic here
    };

    return (
        <div className="auth-container" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="auth-overlay"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="auth-card"
            >
                <div className="auth-header">
                    <div className="logo-container">
                        <div className="logo-icon">
                            <CarFront size={32} />
                        </div>
                        <div className="brand-name">Go<span>Drive</span></div>
                    </div>
                    <h1>Join the Drive</h1>
                    <p>Experience luxury at your fingertips</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <div className="input-wrapper">
                            <User size={18} />
                            <input
                                type="text"
                                name="name"
                                className="auth-input"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

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
                        <label>Password</label>
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

                    <div className="form-group">
                        <label>Phone Number</label>
                        <div className="input-wrapper">
                            <Phone size={18} />
                            <input
                                type="tel"
                                name="phone"
                                className="auth-input"
                                placeholder="+1 (234) 567-890"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="auth-button"
                    >
                        Create Account
                    </motion.button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Sign In</Link></p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
