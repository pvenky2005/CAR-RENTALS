import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Info, Phone, FileText, HelpCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Booking.css'; // Reusing some layout styles for consistency

const Support = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getPageContent = () => {
        switch (location.pathname) {
            case '/terms':
                return {
                    title: 'Terms & Conditions',
                    icon: <FileText size={32} />,
                    isList: true,
                    content: [
                        'Surety and RC of the vehicle are required for all rentals.',
                        'A valid Driving License is strictly mandatory.',
                        'The car will be professionally washed before delivery to the customer.',
                        'We provide 1 liter of fuel in the car to help you reach the nearest petrol pump.',
                        'Any traffic challans (fines) applied during the rental period must be paid by the customer.'
                    ]
                };
            case '/policy':
                return {
                    title: 'Agreement Policy',
                    icon: <Info size={32} />,
                    content: 'Our rental agreement covers all aspects of the transaction, ensuring transparency and safety for both parties.'
                };
            case '/support':
                return {
                    title: 'Call Customer Care',
                    icon: <Phone size={32} />,
                    content: 'Need help? Our customer care team is available 24/7. Call us at +91 1800-GODRIVE for immediate assistance.'
                };
            case '/faq':
                return {
                    title: 'Questions (FAQ)',
                    icon: <HelpCircle size={32} />,
                    content: 'Frequently asked questions about booking, cancellations, and car types. Find quick answers here.'
                };
            case '/trips':
                return {
                    title: 'My Trips',
                    icon: <Info size={32} />,
                    content: 'View your upcoming and past trip history here.'
                };
            case '/bookings':
                return {
                    title: 'My Bookings',
                    icon: <Info size={32} />,
                    content: 'Manage your active and pending bookings.'
                };
            default:
                return {
                    title: 'Information',
                    icon: <Info size={32} />,
                    content: 'Information page.'
                };
        }
    };

    const { title, icon, content, isList } = getPageContent();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
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

    return (
        <div className="booking-container">
            <div className="booking-layout" style={{ maxWidth: '800px', margin: '140px auto' }}>
                <button className="back-link" onClick={() => navigate(-1)}>
                    <ChevronLeft size={20} /> Back
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="booking-card"
                    style={{ padding: '3rem', textAlign: 'center' }}
                >
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: '#f5f5f7',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem',
                        color: '#0071e3'
                    }}>
                        {icon}
                    </div>
                    <h1 style={{ marginBottom: '1.5rem', fontWeight: '700' }}>{title}</h1>

                    {isList ? (
                        <motion.ul
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            style={{
                                listStyle: 'none',
                                padding: 0,
                                textAlign: 'left',
                                margin: '0 auto 2rem',
                                maxWidth: '600px'
                            }}
                        >
                            {content.map((item, index) => (
                                <motion.li
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ x: 10, backgroundColor: '#f0f0f5' }}
                                    style={{
                                        background: '#fbfbfd',
                                        padding: '1.25rem',
                                        borderRadius: '12px',
                                        marginBottom: '0.75rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        border: '1px solid rgba(0,0,0,0.02)',
                                        color: '#1d1d1f',
                                        fontSize: '1.05rem',
                                        lineHeight: '1.4',
                                        cursor: 'default'
                                    }}
                                >
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        background: '#0071e3',
                                        borderRadius: '50%',
                                        flexShrink: 0
                                    }} />
                                    {item}
                                </motion.li>
                            ))}
                        </motion.ul>
                    ) : (
                        <p style={{ fontSize: '1.1rem', color: '#6e6e73', lineHeight: '1.6', marginBottom: '2rem' }}>
                            {content}
                        </p>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="confirm-btn"
                        onClick={() => navigate('/home')}
                        style={{ maxWidth: '200px', margin: '0 auto' }}
                    >
                        Back to Home
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default Support;
