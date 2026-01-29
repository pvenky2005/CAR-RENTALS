import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Shield, Clock, ChevronLeft, CreditCard, CheckCircle } from 'lucide-react';
import './Booking.css';

const Booking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const car = location.state?.car;

    const [dates, setDates] = useState({
        pickup: '',
        dropoff: ''
    });
    const [isConfirmed, setIsConfirmed] = useState(false);

    const calculateTotal = () => {
        if (!dates.pickup || !dates.dropoff) return car.price + 150;
        const start = new Date(dates.pickup);
        const end = new Date(dates.dropoff);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
        return (car.price * diffDays) + 150;
    };

    if (!car) {
        return (
            <div className="booking-error">
                <h2>No car selected</h2>
                <button onClick={() => navigate('/home')}>Back to Search</button>
            </div>
        );
    }

    const handleConfirm = (e) => {
        e.preventDefault();
        setIsConfirmed(true);
        // In a real app, this would send data to a backend
        setTimeout(() => {
            navigate('/home');
        }, 3000);
    };

    return (
        <div className="booking-container">
            <div className="booking-layout">
                <button className="back-link" onClick={() => navigate(-1)}>
                    <ChevronLeft size={20} /> Back
                </button>

                <div className="booking-grid">
                    {/* Left: Car Details & Form */}
                    <div className="booking-main">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="booking-card"
                        >
                            <div className="booking-header">
                                <h1>Confirm Your Booking</h1>
                                <p>Review your selection and pick your travel dates.</p>
                            </div>

                            <form className="booking-form" onSubmit={handleConfirm}>
                                <div className="form-section">
                                    <h3><Calendar size={18} /> Rental Period</h3>
                                    <div className="input-row">
                                        <div className="input-group">
                                            <label>Pickup Date</label>
                                            <input
                                                type="date"
                                                required
                                                min={new Date().toISOString().split('T')[0]}
                                                value={dates.pickup}
                                                onChange={(e) => setDates({ ...dates, pickup: e.target.value })}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label>Drop-off Date</label>
                                            <input
                                                type="date"
                                                required
                                                min={dates.pickup || new Date().toISOString().split('T')[0]}
                                                value={dates.dropoff}
                                                onChange={(e) => setDates({ ...dates, dropoff: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-section">
                                    <h3><Shield size={18} /> Coverage Options</h3>
                                    <div className="options-grid">
                                        <div className="option-item active">
                                            <div className="option-info">
                                                <h4>Standard Insurance</h4>
                                                <p>Basic coverage included</p>
                                            </div>
                                            <div className="option-price">Free</div>
                                        </div>
                                        <div className="option-item">
                                            <div className="option-info">
                                                <h4>Full Protection</h4>
                                                <p>Zero liability & road assistance</p>
                                            </div>
                                            <div className="option-price">+₹499/day</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-section">
                                    <h3><CreditCard size={18} /> Payment Information</h3>
                                    <div className="payment-preview">
                                        <div className="preview-item">
                                            <span>Daily Rate</span>
                                            <span>₹{car.price.toLocaleString()}</span>
                                        </div>
                                        <div className="preview-item">
                                            <span>Duration</span>
                                            <span>
                                                {dates.pickup && dates.dropoff
                                                    ? `${Math.ceil(Math.abs(new Date(dates.dropoff) - new Date(dates.pickup)) / (1000 * 60 * 60 * 24)) || 1} Days`
                                                    : '1 Day (Min)'}
                                            </span>
                                        </div>
                                        <div className="preview-item">
                                            <span>Platform Fee</span>
                                            <span>₹150</span>
                                        </div>
                                        <hr />
                                        <div className="preview-item total">
                                            <span>Total (Est.)</span>
                                            <span>₹{calculateTotal().toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="confirm-btn">
                                    Confirm Reservation
                                </button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Right: Summary Sidebar */}
                    <aside className="booking-summary">
                        <div className="summary-card sticky">
                            <div className="summary-img">
                                <img src={car.image} alt={car.name} />
                            </div>
                            <div className="summary-content">
                                <h2>{car.name}</h2>
                                <div className="summary-specs">
                                    <span>{car.category}</span>
                                    <span>•</span>
                                    <span>{car.transmission}</span>
                                    <span>•</span>
                                    <span>{car.fuel}</span>
                                </div>

                                <div className="summary-details">
                                    <div className="detail-item">
                                        <MapPin size={16} />
                                        <div>
                                            <label>Pickup Location</label>
                                            <p>Main City Center, Terminal 1</p>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <Clock size={16} />
                                        <div>
                                            <label>Duration</label>
                                            <p>{dates.pickup && dates.dropoff ? 'Custom Period' : 'Select dates to view'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Success Overlay */}
            {isConfirmed && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="success-overlay"
                >
                    <div className="success-content">
                        <div className="success-icon">
                            <CheckCircle size={64} />
                        </div>
                        <h2>Booking Confirmed!</h2>
                        <p>Your reservation for <strong>{car.name}</strong> has been successfully placed.</p>
                        <p className="redirect-text">Redirecting you to home page...</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Booking;
