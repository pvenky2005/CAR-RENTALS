import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, CarFront, User, LogOut } from 'lucide-react';
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
        { name: 'My Bookings', path: '/bookings' },
        { name: 'Help', path: '/help' },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Top Left: Menu Button */}
                <div className="nav-left">
                    <button className="menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Center: Brand */}
                <Link to="/home" className="nav-brand">
                    <div className="brand-logo">
                        <CarFront size={24} />
                    </div>
                    <span className="brand-text">Go<span>Drive</span></span>
                </Link>

                {/* Right: User Profile */}
                <div className="nav-right">
                    <div className="user-profile">
                        <span className="user-name">{user.name}</span>
                        <div className="avatar">
                            <User size={20} />
                        </div>
                    </div>
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
                                        {link.name}
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
