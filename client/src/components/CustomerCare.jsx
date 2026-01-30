import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MessageCircle, ChevronDown, ChevronUp, Search, FileText } from 'lucide-react';
import './CustomerCare.css';

const CustomerCare = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const faqs = [
        {
            id: 1,
            question: 'How do I cancel my booking?',
            answer: 'You can cancel your booking from the "My Bookings" section. Cancellations made 24 hours before pickup are eligible for a full refund.'
        },
        {
            id: 2,
            question: 'Is fuel included in the price?',
            answer: 'Fuel is not included in the rental price. The car is provided with a full tank and should be returned with a full tank.'
        },
        {
            id: 3,
            question: 'What documents are required?',
            answer: 'You need a valid Driving License, a government-issued ID (AADHAR/Voter ID), and a credit/debit card for the security deposit.'
        },
        {
            id: 4,
            question: 'Is there a security deposit?',
            answer: 'Yes, a refundable security deposit of ₹5000 is blocked on your card and released within 3-5 days after the car is returned.'
        },
        {
            id: 5,
            question: 'What happens in case of an accident?',
            answer: 'In case of an accident, please call our 24/7 emergency helpline immediately. Our team will guide you through the process and insurance claims.'
        }
    ];

    const toggleFaq = (id) => {
        setOpenFaq(openFaq === id ? null : id);
    };

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="support-container">
            {/* Header Section */}
            <header className="support-header">
                <h1>Hello, how can we help?</h1>
                <div className="search-bar">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search for answers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </header>

            {/* Quick Actions */}
            <div className="quick-actions">
                <div className="action-card">
                    <div className="icon-wrapper"><Phone size={28} /></div>
                    <h3>Call Us</h3>
                    <p>Available 24/7</p>
                    <a href="tel:+911800123456">+91 1800-123-456</a>
                </div>
                <div className="action-card">
                    <div className="icon-wrapper"><Mail size={28} /></div>
                    <h3>Email Us</h3>
                    <p>Response in 24 hrs</p>
                    <a href="mailto:support@godrive.com">support@godrive.com</a>
                </div>
                <div className="action-card">
                    <div className="icon-wrapper"><MessageCircle size={28} /></div>
                    <h3>Live Chat</h3>
                    <p>Mon-Fri, 9am-6pm</p>
                    <button className="chat-btn">Start Chat</button>
                </div>
            </div>

            {/* FAQs Section */}
            <div className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list">
                    <AnimatePresence>
                        {filteredFaqs.map((faq) => (
                            <motion.div
                                key={faq.id}
                                className={`faq-item ${openFaq === faq.id ? 'open' : ''}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                layout
                            >
                                <div className="faq-question" onClick={() => toggleFaq(faq.id)}>
                                    <span>{faq.question}</span>
                                    {openFaq === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                                {openFaq === faq.id && (
                                    <motion.div
                                        className="faq-answer"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                    >
                                        <p>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {filteredFaqs.length === 0 && (
                        <div className="no-results">
                            <FileText size={48} />
                            <p>No results found for "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
                <h2>Still need help? Write to us.</h2>
                <form className="support-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" required placeholder="John Doe" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" required placeholder="john@example.com" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Issue Type</label>
                        <select>
                            <option>Booking Issue</option>
                            <option>Payment Issue</option>
                            <option>Feedback</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea rows="5" required placeholder="Describe your issue..."></textarea>
                    </div>
                    <button type="submit" className="submit-ticket-btn">Submit Ticket</button>
                </form>
            </div>
        </div>
    );
};

export default CustomerCare;
