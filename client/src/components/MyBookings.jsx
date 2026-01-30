import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Car, MoreVertical, XCircle, CheckCircle } from 'lucide-react';
import './MyBookings.css';

const MyBookings = () => {
    const [activeTab, setActiveTab] = useState('upcoming');

    // Mock Bookings Data
    const bookings = [
        {
            id: 'BK-2023-001',
            carName: 'Mahindra XUV700',
            image: '/cars/xuv700.png',
            status: 'upcoming',
            startDate: '12 Feb 2026',
            startTime: '10:00 AM',
            endDate: '15 Feb 2026',
            endTime: '10:00 PM',
            location: 'Bangalore International Airport',
            totalPrice: 13500,
            bookingDate: '28 Jan 2026'
        },
        {
            id: 'BK-2022-892',
            carName: 'Hyundai Verna',
            image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=1200',
            status: 'completed',
            startDate: '10 Dec 2025',
            startTime: '09:00 AM',
            endDate: '12 Dec 2025',
            endTime: '08:00 PM',
            location: 'Indiranagar, Bangalore',
            totalPrice: 5000,
            bookingDate: '01 Dec 2025'
        },
        {
            id: 'BK-2022-541',
            carName: 'Maruti Swift',
            image: '/assets/swift.avif', // Assuming path based on previous context, using placeholder if exact not known
            status: 'cancelled',
            startDate: '05 Nov 2025',
            startTime: '11:00 AM',
            endDate: '06 Nov 2025',
            endTime: '11:00 AM',
            location: 'Koramangala, Bangalore',
            totalPrice: 1500,
            bookingDate: '01 Nov 2025'
        }
    ];

    const filteredBookings = bookings.filter(b =>
        activeTab === 'all' ? true : b.status === activeTab
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'upcoming': return 'status-blue';
            case 'completed': return 'status-green';
            case 'cancelled': return 'status-red';
            default: return 'status-gray';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'upcoming': return <Clock size={16} />;
            case 'completed': return <CheckCircle size={16} />;
            case 'cancelled': return <XCircle size={16} />;
            default: return <Clock size={16} />;
        }
    };

    return (
        <div className="bookings-container">
            <div className="bookings-header">
                <h1>My Bookings</h1>
                <p>Manage your upcoming trips and view past rentals.</p>
            </div>

            {/* Tabs */}
            <div className="bookings-tabs">
                {['upcoming', 'completed', 'cancelled'].map((tab) => (
                    <button
                        key={tab}
                        className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Bookings List */}
            <div className="bookings-list">
                <AnimatePresence mode="wait">
                    {filteredBookings.length > 0 ? (
                        filteredBookings.map((booking) => (
                            <motion.div
                                key={booking.id}
                                className="booking-card"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                layout
                            >
                                <div className="booking-image">
                                    <img src={booking.image} alt={booking.carName} />
                                    <span className={`booking-status-badge ${getStatusColor(booking.status)}`}>
                                        {getStatusIcon(booking.status)}
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </span>
                                </div>
                                <div className="booking-details">
                                    <div className="booking-info-header">
                                        <h3>{booking.carName}</h3>
                                        <span className="booking-id">ID: {booking.id}</span>
                                    </div>

                                    <div className="booking-meta-grid">
                                        <div className="meta-item">
                                            <Calendar size={16} />
                                            <div>
                                                <span className="label">Pickup</span>
                                                <span className="value">{booking.startDate}, {booking.startTime}</span>
                                            </div>
                                        </div>
                                        <div className="meta-item">
                                            <Calendar size={16} />
                                            <div>
                                                <span className="label">Return</span>
                                                <span className="value">{booking.endDate}, {booking.endTime}</span>
                                            </div>
                                        </div>
                                        <div className="meta-item full-width">
                                            <MapPin size={16} />
                                            <div>
                                                <span className="label">Location</span>
                                                <span className="value">{booking.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="booking-footer">
                                        <div className="total-price">
                                            <span className="label">Total Amount</span>
                                            <span className="value">₹{booking.totalPrice.toLocaleString()}</span>
                                        </div>
                                        {booking.status === 'upcoming' && (
                                            <div className="booking-actions">
                                                <button className="action-btn secondary">Modify</button>
                                                <button className="action-btn danger">Cancel</button>
                                            </div>
                                        )}
                                        {booking.status === 'completed' && (
                                            <div className="booking-actions">
                                                <button className="action-btn primary">Book Again</button>
                                                <button className="action-btn secondary">Invoice</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            className="no-bookings"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <Car size={48} />
                            <h3>No {activeTab} bookings found</h3>
                            <p>Looks like you haven't booked any cars yet.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MyBookings;
