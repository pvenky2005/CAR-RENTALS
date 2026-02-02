import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Camera, Save, X, Edit2, Shield, Calendar, MapPin } from 'lucide-react';
import './Profile.css';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 98765 43210',
        location: 'Bangalore, India',
        memberSince: 'January 2024',
        avatar: null
    });

    const [tempUser, setTempUser] = useState({ ...user });

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const parsed = JSON.parse(savedUser);
            setUser(prev => ({ ...prev, ...parsed }));
            setTempUser(prev => ({ ...prev, ...parsed }));
        }
    }, []);

    const handleSave = () => {
        setUser(tempUser);
        localStorage.setItem('user', JSON.stringify(tempUser));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempUser(user);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setTempUser({ ...tempUser, [e.target.name]: e.target.value });
    };

    return (
        <div className="profile-page-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="profile-card-wrapper"
            >
                {/* Profile Header/Cover */}
                <div className="profile-header">
                    <div className="profile-cover-gradient"></div>
                    <div className="profile-avatar-section">
                        <div className="profile-avatar-container">
                            <div className="profile-avatar">
                                {tempUser.avatar ? (
                                    <img src={tempUser.avatar} alt="Profile" />
                                ) : (
                                    <User size={60} />
                                )}
                            </div>
                            {isEditing && (
                                <button className="avatar-edit-btn">
                                    <Camera size={20} />
                                </button>
                            )}
                        </div>
                        <div className="profile-basic-info">
                            <h2>{user.name}</h2>
                            <p><Shield size={14} /> Verified Premium Member</p>
                        </div>
                    </div>
                </div>

                {/* Profile Content */}
                <div className="profile-content">
                    <div className="profile-content-header">
                        <h3>Profile Information</h3>
                        {!isEditing ? (
                            <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                                <Edit2 size={16} /> Edit Profile
                            </button>
                        ) : (
                            <div className="edit-actions">
                                <button className="cancel-btn" onClick={handleCancel}>
                                    <X size={16} /> Cancel
                                </button>
                                <button className="save-btn" onClick={handleSave}>
                                    <Save size={16} /> Save Changes
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="profile-details-grid">
                        <div className="detail-item">
                            <label><User size={16} /> Full Name</label>
                            {isEditing ? (
                                <input
                                    name="name"
                                    value={tempUser.name}
                                    onChange={handleChange}
                                    className="edit-input"
                                />
                            ) : (
                                <p>{user.name}</p>
                            )}
                        </div>

                        <div className="detail-item">
                            <label><Mail size={16} /> Email Address</label>
                            {isEditing ? (
                                <input
                                    name="email"
                                    value={tempUser.email}
                                    onChange={handleChange}
                                    className="edit-input"
                                />
                            ) : (
                                <p>{user.email}</p>
                            )}
                        </div>

                        <div className="detail-item">
                            <label><Phone size={16} /> Phone Number</label>
                            {isEditing ? (
                                <input
                                    name="phone"
                                    value={tempUser.phone}
                                    onChange={handleChange}
                                    className="edit-input"
                                />
                            ) : (
                                <p>{user.phone}</p>
                            )}
                        </div>

                        <div className="detail-item">
                            <label><MapPin size={16} /> Location</label>
                            {isEditing ? (
                                <input
                                    name="location"
                                    value={tempUser.location}
                                    onChange={handleChange}
                                    className="edit-input"
                                />
                            ) : (
                                <p>{user.location}</p>
                            )}
                        </div>

                        <div className="detail-item">
                            <label><Calendar size={16} /> Member Since</label>
                            <p>{user.memberSince}</p>
                        </div>
                    </div>
                </div>

                {/* Statistics/Badges area */}
                <div className="profile-footer">
                    <div className="stat-card">
                        <span className="stat-value">12</span>
                        <span className="stat-label">Total Bookings</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">4.9</span>
                        <span className="stat-label">User Rating</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">Elite</span>
                        <span className="stat-label">Status</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
