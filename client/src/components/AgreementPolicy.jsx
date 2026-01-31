import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Shield, FileText, CheckCircle, AlertCircle,
    Car, Clock, Fuel, CreditCard, Phone
} from 'lucide-react';
import './AgreementPolicy.css';

const AgreementPolicy = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const car = location.state?.car;
    const [isAgreed, setIsAgreed] = useState(false);

    const policyItems = [
        {
            icon: <FileText size={20} />,
            text: 'Surety and RC of the vehicle are provided upon pickup.'
        },
        {
            icon: <Car size={20} />,
            text: 'A valid Driving License is strictly mandatory for all drivers.'
        },
        {
            icon: <CheckCircle size={20} />,
            text: 'Vehicles are professionally cleaned and sanitized before delivery.'
        },
        {
            icon: <Fuel size={20} />,
            text: 'We provide 1 liter of fuel to reach the nearest station; fuel costs are borne by the customer.'
        },
        {
            icon: <AlertCircle size={20} />,
            text: 'Any traffic fines or challans incurred during the rental period are the customer\'s responsibility.'
        },
        {
            icon: <Clock size={20} />,
            text: 'Late returns will incur additional charges as per the hourly rate.'
        },
        {
            icon: <CreditCard size={20} />,
            text: 'Security deposit will be refunded within 3-5 business days post-return.'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: 'spring', damping: 25, stiffness: 200 }
        }
    };

    if (!car) {
        return (
            <div className="agreement-error">
                <h2>No car selected</h2>
                <p>Please select a car first to view the agreement.</p>
                <button onClick={() => navigate('/cars')}>Browse Cars</button>
            </div>
        );
    }

    return (
        <div className="agreement-container">
            <div className="agreement-layout">
                {/* Back Button */}
                <button className="back-link" onClick={() => navigate(-1)}>
                    <ChevronLeft size={20} /> Back
                </button>

                <div className="agreement-grid">
                    {/* Main Content */}
                    <motion.div
                        className="agreement-main"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Header */}
                        <div className="agreement-header">
                            <div className="header-icon">
                                <Shield size={32} />
                            </div>
                            <h1>Agreement Policy & Terms</h1>
                            <p>Please read our rental agreement and terms carefully. By proceeding with a booking, you agree to abide by the following policies to ensure a safe and smooth experience.</p>
                        </div>

                        {/* Terms Section */}
                        <div className="terms-section">
                            <h2>Terms & Conditions</h2>
                            <motion.div
                                className="terms-list"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {policyItems.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="term-item"
                                        variants={itemVariants}
                                    >
                                        <div className="term-number">{index + 1}</div>
                                        <div className="term-icon">{item.icon}</div>
                                        <p>{item.text}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Additional Info */}
                        <div className="info-cards">
                            <div className="info-card">
                                <Phone size={24} />
                                <div>
                                    <h4>24/7 Support</h4>
                                    <p>Call us at +91 1800-GODRIVE</p>
                                </div>
                            </div>
                            <div className="info-card">
                                <Shield size={24} />
                                <div>
                                    <h4>Insurance Included</h4>
                                    <p>Standard coverage with every rental</p>
                                </div>
                            </div>
                        </div>

                        {/* Agreement Checkbox */}
                        <div className="agreement-checkbox-section">
                            <label className="checkbox-container">
                                <input
                                    type="checkbox"
                                    checked={isAgreed}
                                    onChange={(e) => setIsAgreed(e.target.checked)}
                                />
                                <span className="checkmark"></span>
                                <span className="checkbox-text">
                                    I have read and agree to the <strong>Terms & Conditions</strong> and <strong>Rental Agreement Policy</strong>
                                </span>
                            </label>
                        </div>

                        {/* Action Buttons */}
                        <div className="agreement-actions">
                            <button
                                className="cancel-btn"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>
                            <motion.button
                                className={`continue-btn ${!isAgreed ? 'disabled' : ''}`}
                                disabled={!isAgreed}
                                whileHover={isAgreed ? { scale: 1.02 } : {}}
                                whileTap={isAgreed ? { scale: 0.98 } : {}}
                                onClick={() => navigate('/booking', { state: { car } })}
                            >
                                <CheckCircle size={20} />
                                I Agree & Continue
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Sidebar - Car Summary */}
                    <aside className="agreement-sidebar">
                        <div className="car-summary-card">
                            <div className="summary-image">
                                <img src={car.image} alt={car.name} />
                            </div>
                            <div className="summary-details">
                                <h3>{car.name}</h3>
                                <div className="summary-specs">
                                    <span>{car.category}</span>
                                    <span>•</span>
                                    <span>{car.transmission}</span>
                                    <span>•</span>
                                    <span>{car.fuel}</span>
                                </div>
                                <div className="summary-price">
                                    <span className="price">₹{car.price.toLocaleString()}</span>
                                    <span className="unit">/day</span>
                                </div>
                            </div>
                        </div>

                        <div className="quick-info">
                            <h4>What's Included</h4>
                            <ul>
                                <li><CheckCircle size={16} /> Standard Insurance</li>
                                <li><CheckCircle size={16} /> 24/7 Roadside Assistance</li>
                                <li><CheckCircle size={16} /> Free Cancellation (24hrs)</li>
                                <li><CheckCircle size={16} /> Sanitized Vehicle</li>
                            </ul>
                        </div>
                    </aside>
                </div>

                {/* Mobile Footer */}
                <div className="mobile-footer">
                    <label className="mobile-checkbox">
                        <input
                            type="checkbox"
                            checked={isAgreed}
                            onChange={(e) => setIsAgreed(e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        <span>I agree to the Terms & Conditions</span>
                    </label>
                    <button
                        className={`mobile-continue-btn ${!isAgreed ? 'disabled' : ''}`}
                        disabled={!isAgreed}
                        onClick={() => navigate('/booking', { state: { car } })}
                    >
                        Continue to Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgreementPolicy;
