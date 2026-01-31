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

            case '/policy':
                return {
                    title: 'Agreement Policy & Terms',
                    icon: <Info size={32} />,
                    content: {
                        description: 'Please read our rental agreement and terms carefully. By proceeding with a booking, you agree to abide by the following policies to ensure a safe and smooth experience.',
                        listItems: [
                            'Surety and RC of the vehicle are provided upon pickup.',
                            'A valid Driving License is strictly mandatory for all drivers.',
                            'Vehicles are professionally cleaned and sanitized before delivery.',
                            'We provide 1 liter of fuel to reach the nearest station; fuel costs are borne by the customer.',
                            'Any traffic fines or challans incurred during the rental period are the customer\'s responsibility.',
                            'Late returns will incur additional charges as per the hourly rate.',
                            'Security deposit will be refunded within 3-5 business days post-return.'
                        ]
                    }
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
            <div className="booking-layout" style={{ maxWidth: '900px', margin: '120px auto', padding: '0 2rem' }}>
                <button className="back-link" onClick={() => navigate(-1)}>
                    <ChevronLeft size={20} /> Back
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="booking-card"
                    style={{ padding: '3rem 3.5rem', textAlign: 'left' }}
                >
                    {/* Header Section */}
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'linear-gradient(135deg, #0071e3 0%, #00a2ff 100%)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            color: '#fff'
                        }}>
                            {icon}
                        </div>
                        <h1 style={{
                            marginBottom: '1rem',
                            fontWeight: '700',
                            fontSize: '2rem',
                            color: '#1d1d1f'
                        }}>
                            {title}
                        </h1>
                    </div>

                    {/* Description Text */}
                    {(content.description || (!isList && typeof content === 'string')) && (
                        <p style={{
                            fontSize: '1.05rem',
                            color: '#424245',
                            lineHeight: '1.7',
                            marginBottom: '2.5rem',
                            textAlign: 'justify'
                        }}>
                            {content.description || content}
                        </p>
                    )}

                    {/* List Items */}
                    {(content.listItems || (isList && Array.isArray(content))) && (
                        <>
                            {content.listItems && (
                                <h2 style={{
                                    fontSize: '1.3rem',
                                    fontWeight: '600',
                                    color: '#1d1d1f',
                                    marginBottom: '1.5rem',
                                    paddingBottom: '0.75rem',
                                    borderBottom: '2px solid #f5f5f7'
                                }}>
                                    Terms & Conditions
                                </h2>
                            )}
                            <motion.ol
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                style={{
                                    listStyle: 'decimal',
                                    paddingLeft: '2rem',
                                    margin: '0 0 2.5rem 0'
                                }}
                            >
                                {(content.listItems || content).map((item, index) => (
                                    <motion.li
                                        key={index}
                                        variants={itemVariants}
                                        style={{
                                            marginBottom: '1rem',
                                            color: '#1d1d1f',
                                            fontSize: '1rem',
                                            lineHeight: '1.6',
                                            paddingLeft: '0.5rem'
                                        }}
                                    >
                                        {item}
                                    </motion.li>
                                ))}
                            </motion.ol>
                        </>
                    )}

                    {/* Footer */}
                    <div style={{
                        marginTop: '3rem',
                        paddingTop: '2rem',
                        borderTop: '1px solid #e5e5e7',
                        textAlign: 'center'
                    }}>
                        <p style={{
                            fontSize: '0.9rem',
                            color: '#86868b',
                            marginBottom: '1rem'
                        }}>
                            By proceeding with your booking, you acknowledge that you have read and agree to these terms.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/home')}
                            style={{
                                background: 'transparent',
                                color: '#0071e3',
                                border: 'none',
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                                padding: '0.5rem 1rem',
                                textDecoration: 'underline'
                            }}
                        >
                            ← Back to Home
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Support;
