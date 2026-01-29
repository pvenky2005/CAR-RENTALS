import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Calendar, Clock, Search } from 'lucide-react';
import CarsList from './CarsList';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [showCars, setShowCars] = useState(false);
    const [searchData, setSearchData] = useState({
        location: '',
        seats: '5',
        pickupDate: '',
        returnDate: '',
        pickupTime: '10:00',
        returnTime: '10:00'
    });

    const handleChange = (e) => {
        setSearchData({ ...searchData, [e.target.name]: e.target.value });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchData);
        setShowCars(true);
        // We no longer need to navigate
        // navigate('/cars', { state: searchData });
    };

    return (
        <div className="home-container">
            <AnimatePresence mode="wait">
                {!showCars ? (
                    <motion.div
                        key="hero-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Hero Section */}
                        <section className="hero">
                            <div className="hero-content">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    Your Premium Journey <br />Starts <span>Here</span>.
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    Select your destination, pick a ride, and hit the road in style.
                                </motion.p>
                            </div>

                            {/* Search Bar Container */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="search-section"
                            >
                                <form className="search-form" onSubmit={handleSearch}>
                                    {/* Location */}
                                    <div className="search-field">
                                        <label><MapPin size={16} /> Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="Where to?"
                                            value={searchData.location}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Seats */}
                                    <div className="search-field">
                                        <label><Users size={16} /> Seats</label>
                                        <select name="seats" value={searchData.seats} onChange={handleChange}>
                                            <option value="5">5 Seater</option>
                                            <option value="7">7 Seater</option>
                                        </select>
                                    </div>

                                    {/* Pickup Info */}
                                    <div className="search-field">
                                        <label><Calendar size={16} /> Pickup Date</label>
                                        <input
                                            type="date"
                                            name="pickupDate"
                                            value={searchData.pickupDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="search-field">
                                        <label><Clock size={16} /> Pickup Time</label>
                                        <input
                                            type="time"
                                            name="pickupTime"
                                            value={searchData.pickupTime}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Return Info */}
                                    <div className="search-field">
                                        <label><Calendar size={16} /> Return Date</label>
                                        <input
                                            type="date"
                                            name="returnDate"
                                            value={searchData.returnDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="search-field">
                                        <label><Clock size={16} /> Return Time</label>
                                        <input
                                            type="time"
                                            name="returnTime"
                                            value={searchData.returnTime}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Submit */}
                                    <div className="search-action">
                                        <button type="submit" className="search-btn">
                                            <Search size={20} />
                                            <span>Search Car</span>
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </section>

                        {/* Featured Section */}
                        <section className="featured-section">
                            <div className="section-header">
                                <h2>Our Premium Fleet</h2>
                                <p>Curated selection of luxury vehicles for your comfort.</p>
                            </div>

                            <div className="fleet-grid">
                                {[
                                    {
                                        id: 1,
                                        name: 'Mahindra XUV700',
                                        price: 4500,
                                        image: '/cars/xuv700.png',
                                        seats: 7,
                                        transmission: 'Automatic',
                                        fuel: 'Diesel',
                                        rating: 4.8,
                                        features: ['Panoramic Sunroof', '360 Camera', 'ADAS Level 2']
                                    },
                                    {
                                        id: 6,
                                        name: 'Hyundai Verna',
                                        price: 2500,
                                        image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=1200',
                                        seats: 5,
                                        transmission: 'Automatic',
                                        fuel: 'Petrol',
                                        rating: 4.7,
                                        features: ['Heated Seats', 'Digital Cockpit', 'Sunroof']
                                    },
                                    {
                                        id: 2,
                                        name: 'Tata Harrier',
                                        price: 3800,
                                        image: '/cars/harrier.png',
                                        seats: 5,
                                        transmission: 'Automatic',
                                        fuel: 'Diesel',
                                        rating: 4.7,
                                        features: ['Dark Edition', 'Harman Audio', 'Terrain Modes']
                                    },
                                    {
                                        id: 8,
                                        name: 'Maruti Swift CNG',
                                        price: 1500,
                                        image: 'https://images.unsplash.com/photo-1532581291347-9c39cf10a73c?auto=format&fit=crop&q=80&w=1200',
                                        seats: 5,
                                        transmission: 'Manual',
                                        fuel: 'CNG',
                                        rating: 4.5,
                                        features: ['Low Running Cost', 'Reliable', 'Compact']
                                    }
                                ].map(car => (
                                    <motion.div
                                        key={car.id}
                                        whileHover={{ y: -10 }}
                                        className="car-card"
                                    >
                                        <div className="car-image">
                                            <img src={car.image} alt={car.name} />
                                            <div className="car-price">₹{car.price.toLocaleString()}/day</div>
                                        </div>
                                        <div className="car-info">
                                            <h3>{car.name}</h3>
                                            <div className="car-stats">
                                                <span><Users size={14} /> {car.seats} Seats</span>
                                                <span>{car.transmission}</span>
                                            </div>
                                            <button
                                                className="book-now-btn"
                                                onClick={() => navigate('/booking', { state: { car } })}
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </motion.div>
                ) : (
                    <motion.div
                        key="search-results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="search-results-wrapper"
                    >
                        <div className="back-to-search-header">
                            <button className="back-btn" onClick={() => setShowCars(false)}>
                                ← Modify Search
                            </button>
                        </div>
                        <CarsList searchParams={searchData} embedded />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;
