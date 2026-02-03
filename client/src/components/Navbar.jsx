import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, CarFront, User, LogOut, Tag, Calendar, Headset } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'Guest' };

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const navLinks = [
        { name: 'Home', path: '/home' },
        { name: 'Profile', path: '/profile', icon: <User size={18} /> },
        { name: 'My Bookings', path: '/bookings', icon: <Calendar size={18} /> },
        { name: 'Offers', path: '/offers', icon: <Tag size={18} /> },
        { name: 'Call Customer Care', path: '/support', icon: <Headset size={18} /> },
        { name: 'Agreement Policy', path: '/policy' },
        { name: 'Questions', path: '/faq' },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Mobile Menu Button */}
                <div className="nav-mobile-toggle">
                    <button className="menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Brand Logo */}
                <Link to="/home" className="nav-brand">
                    <div className="brand-logo">
                        <CarFront size={24} />
                    </div>
                    <span className="brand-text">Go<span>Drive</span></span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="nav-desktop-links">
                    <Link to="/bookings" className="nav-link">
                        <Calendar size={18} />
                        <span>My Bookings</span>
                    </Link>
                    <Link to="/support" className="nav-link">
                        <Headset size={18} />
                        <span>Customer Care</span>
                    </Link>
                    <Link to="/offers" className="nav-link">
                        <Tag size={18} />
                        <span>Offers</span>
                    </Link>
                </div>

                {/* Right: User Profile */}
                <div className="nav-right">
                    <Link to="/profile" className="user-profile-link">
                        <div className="user-profile">
                            <span className="user-name">{user.name}</span>
                            <div className="avatar">
                                <User size={20} />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Mobile/Side Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="menu-overlay"
                            onClick={toggleMenu}
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="side-menu"
                        >
                            <div className="side-menu-header">
                                <div className="brand-text">Go<span>Drive</span></div>
                                <button className="close-btn" onClick={toggleMenu}><X size={24} /></button>
                            </div>

                            <div className="side-menu-links">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className="side-link"
                                        onClick={toggleMenu}
                                    >
                                        <div className="side-link-content">
                                            {link.icon}
                                            {link.name}
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="side-menu-footer">
                                <button className="logout-btn" onClick={handleLogout}>
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
