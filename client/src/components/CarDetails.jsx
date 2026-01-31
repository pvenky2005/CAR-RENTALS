import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, Star, Users, Fuel, Gauge, Settings, Shield,
    Calendar, Heart, Share2, Check, Car, Zap, MapPin
} from 'lucide-react';
import './CarDetails.css';

const CarDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const car = location.state?.car;
    const [activeTab, setActiveTab] = useState('specs');
    const [isFavorite, setIsFavorite] = useState(false);

    // Sample reviews data
    const reviews = [
        {
            id: 1,
            name: 'Rahul Sharma',
            avatar: 'RS',
            rating: 5,
            date: '2 weeks ago',
            comment: 'Amazing car! Very comfortable for long drives. The mileage was exactly as promised. Highly recommended for family trips.'
        },
        {
            id: 2,
            name: 'Priya Patel',
            avatar: 'PP',
            rating: 4,
            date: '1 month ago',
            comment: 'Good experience overall. Car was clean and well-maintained. Pickup and drop-off was smooth.'
        },
        {
            id: 3,
            name: 'Amit Kumar',
            avatar: 'AK',
            rating: 5,
            date: '1 month ago',
            comment: 'Excellent service! The car was in perfect condition. Will definitely book again for my next trip.'
        },
        {
            id: 4,
            name: 'Sneha Reddy',
            avatar: 'SR',
            rating: 4,
            date: '2 months ago',
            comment: 'Smooth booking process and the car performed well on highways. Great value for money.'
        }
    ];

    // Extended specifications
    const specifications = {
        engine: car?.fuel === 'Electric' ? 'Electric Motor' : car?.fuel === 'Diesel' ? '2.0L Diesel' : '1.5L Petrol',
        power: car?.fuel === 'Electric' ? '75 kW' : '140 HP',
        torque: car?.fuel === 'Electric' ? '215 Nm' : '250 Nm',
        mileage: car?.mileage || '15 kmpl',
        transmission: car?.transmission || 'Automatic',
        seats: car?.seats || 5,
        fuel: car?.fuel || 'Petrol',
        bootSpace: '400 L',
        groundClearance: '180 mm',
        fuelTank: car?.fuel === 'Electric' ? '30.2 kWh Battery' : '45 L'
    };

    if (!car) {
        return (
            <div className="car-details-error">
                <h2>No car selected</h2>
                <p>Please select a car from the list to view details.</p>
                <button onClick={() => navigate('/cars')}>Browse Cars</button>
            </div>
        );
    }

    return (
        <div className="car-details-container">
            <div className="car-details-layout">
                {/* Back Button */}
                <button className="back-link" onClick={() => navigate(-1)}>
                    <ChevronLeft size={20} /> Back to Cars
                </button>

                {/* Hero Section */}
                <motion.div
                    className="car-hero"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="car-hero-content">
                        <div className="car-hero-image">
                            <img src={car.image} alt={car.name} />
                            <div className="car-category-badge">{car.category}</div>
                            <div className="car-actions">
                                <button
                                    className={`action-btn ${isFavorite ? 'active' : ''}`}
                                    onClick={() => setIsFavorite(!isFavorite)}
                                >
                                    <Heart size={20} fill={isFavorite ? '#ff4757' : 'none'} />
                                </button>
                                <button className="action-btn">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="car-hero-info">
                            <div className="car-title-row">
                                <h1>{car.name}</h1>
                                <div className="car-rating-badge">
                                    <Star size={16} fill="#FFD700" color="#FFD700" />
                                    <span>{car.rating}</span>
                                    <span className="review-count">({reviews.length} reviews)</span>
                                </div>
                            </div>

                            <div className="car-quick-specs">
                                <span><Users size={16} /> {car.seats} Seats</span>
                                <span><Fuel size={16} /> {car.fuel}</span>
                                <span><Settings size={16} /> {car.transmission}</span>
                                <span><Gauge size={16} /> {car.mileage}</span>
                            </div>

                            <div className="car-features-grid">
                                {car.features.map((feature, idx) => (
                                    <div key={idx} className="feature-item">
                                        <Check size={14} />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="car-price-section">
                                <div className="price-info">
                                    <span className="price-label">Rental Price</span>
                                    <div className="price-value">
                                        <span className="amount">₹{car.price.toLocaleString()}</span>
                                        <span className="unit">/day</span>
                                    </div>
                                    <span className="price-note">*Inclusive of standard insurance</span>
                                </div>
                                <motion.button
                                    className="book-now-btn"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate('/agreement', { state: { car } })}
                                >
                                    <Calendar size={20} />
                                    Book This Car
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tabs Section */}
                <div className="details-tabs-container">
                    <div className="tabs-header">
                        <button
                            className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                            onClick={() => setActiveTab('specs')}
                        >
                            <Car size={18} />
                            Specifications
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'design' ? 'active' : ''}`}
                            onClick={() => setActiveTab('design')}
                        >
                            <Zap size={18} />
                            Design & Features
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            <Star size={18} />
                            Reviews
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            className="tab-content"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Specifications Tab */}
                            {activeTab === 'specs' && (
                                <div className="specs-grid">
                                    <div className="spec-card">
                                        <div className="spec-icon"><Fuel size={24} /></div>
                                        <div className="spec-info">
                                            <span className="spec-label">Engine</span>
                                            <span className="spec-value">{specifications.engine}</span>
                                        </div>
                                    </div>
                                    <div className="spec-card">
                                        <div className="spec-icon"><Zap size={24} /></div>
                                        <div className="spec-info">
                                            <span className="spec-label">Power</span>
                                            <span className="spec-value">{specifications.power}</span>
                                        </div>
                                    </div>
                                    <div className="spec-card">
                                        <div className="spec-icon"><Gauge size={24} /></div>
                                        <div className="spec-info">
                                            <span className="spec-label">Mileage</span>
                                            <span className="spec-value">{specifications.mileage}</span>
                                        </div>
                                    </div>
                                    <div className="spec-card">
                                        <div className="spec-icon"><Settings size={24} /></div>
                                        <div className="spec-info">
                                            <span className="spec-label">Transmission</span>
                                            <span className="spec-value">{specifications.transmission}</span>
                                        </div>
                                    </div>
                                    <div className="spec-card">
                                        <div className="spec-icon"><Users size={24} /></div>
                                        <div className="spec-info">
                                            <span className="spec-label">Seating</span>
                                            <span className="spec-value">{specifications.seats} Passengers</span>
                                        </div>
                                    </div>
                                    <div className="spec-card">
                                        <div className="spec-icon"><Car size={24} /></div>
                                        <div className="spec-info">
                                            <span className="spec-label">Boot Space</span>
                                            <span className="spec-value">{specifications.bootSpace}</span>
                                        </div>
                                    </div>
                                    <div className="spec-card">
                                        <div className="spec-icon"><MapPin size={24} /></div>
                                        <div className="spec-info">
                                            <span className="spec-label">Ground Clearance</span>
                                            <span className="spec-value">{specifications.groundClearance}</span>
                                        </div>
                                    </div>
                                    <div className="spec-card">
                                        <div className="spec-icon"><Fuel size={24} /></div>
                                        <div className="spec-info">
                                            <span className="spec-label">Fuel Tank</span>
                                            <span className="spec-value">{specifications.fuelTank}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Design Tab */}
                            {activeTab === 'design' && (
                                <div className="design-content">
                                    <div className="design-section">
                                        <h3>Exterior Design</h3>
                                        <p>The {car.name} features a bold and dynamic exterior design that commands attention on the road. Its aerodynamic profile is complemented by premium LED lighting, sculpted body panels, and an aggressive front grille that defines its modern character.</p>
                                        <ul className="design-features">
                                            <li><Check size={16} /> Premium LED Headlamps with DRLs</li>
                                            <li><Check size={16} /> Alloy Wheels with Diamond Cut Finish</li>
                                            <li><Check size={16} /> Shark Fin Antenna</li>
                                            <li><Check size={16} /> Chrome Door Handles</li>
                                        </ul>
                                    </div>
                                    <div className="design-section">
                                        <h3>Interior Comfort</h3>
                                        <p>Step inside to experience a cabin crafted for comfort and convenience. Premium materials, intuitive controls, and thoughtful storage solutions make every journey enjoyable.</p>
                                        <ul className="design-features">
                                            <li><Check size={16} /> Touchscreen Infotainment System</li>
                                            <li><Check size={16} /> Automatic Climate Control</li>
                                            <li><Check size={16} /> Premium Fabric/Leather Upholstery</li>
                                            <li><Check size={16} /> Multi-functional Steering Wheel</li>
                                        </ul>
                                    </div>
                                    <div className="design-section">
                                        <h3>Safety Features</h3>
                                        <p>Your safety is our priority. This vehicle comes equipped with advanced safety features to protect you and your passengers.</p>
                                        <ul className="design-features">
                                            <li><Check size={16} /> Dual Front Airbags</li>
                                            <li><Check size={16} /> ABS with EBD</li>
                                            <li><Check size={16} /> Rear Parking Sensors</li>
                                            <li><Check size={16} /> ISOFIX Child Seat Mounts</li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Reviews Tab */}
                            {activeTab === 'reviews' && (
                                <div className="reviews-content">
                                    <div className="reviews-summary">
                                        <div className="rating-overview">
                                            <div className="big-rating">
                                                <span className="rating-number">{car.rating}</span>
                                                <Star size={32} fill="#FFD700" color="#FFD700" />
                                            </div>
                                            <p>Based on {reviews.length} reviews</p>
                                        </div>
                                        <div className="rating-bars">
                                            <div className="rating-bar-item">
                                                <span>5 stars</span>
                                                <div className="bar-track"><div className="bar-fill" style={{ width: '70%' }}></div></div>
                                            </div>
                                            <div className="rating-bar-item">
                                                <span>4 stars</span>
                                                <div className="bar-track"><div className="bar-fill" style={{ width: '25%' }}></div></div>
                                            </div>
                                            <div className="rating-bar-item">
                                                <span>3 stars</span>
                                                <div className="bar-track"><div className="bar-fill" style={{ width: '5%' }}></div></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="reviews-list">
                                        {reviews.map((review) => (
                                            <motion.div
                                                key={review.id}
                                                className="review-card"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: review.id * 0.1 }}
                                            >
                                                <div className="review-header">
                                                    <div className="reviewer-avatar">{review.avatar}</div>
                                                    <div className="reviewer-info">
                                                        <h4>{review.name}</h4>
                                                        <span className="review-date">{review.date}</span>
                                                    </div>
                                                    <div className="review-rating">
                                                        {[...Array(review.rating)].map((_, i) => (
                                                            <Star key={i} size={14} fill="#FFD700" color="#FFD700" />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="review-text">{review.comment}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bottom CTA for Mobile */}
                <div className="mobile-cta">
                    <div className="mobile-price">
                        <span className="amount">₹{car.price.toLocaleString()}</span>
                        <span className="unit">/day</span>
                    </div>
                    <button
                        className="mobile-book-btn"
                        onClick={() => navigate('/agreement', { state: { car } })}
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
