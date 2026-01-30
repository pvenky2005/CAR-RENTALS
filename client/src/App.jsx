import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import CarsList from './components/CarsList';
import Booking from './components/Booking';
import Support from './components/Support';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes with Navbar */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/cars"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <CarsList />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/booking"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <Booking />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/bookings"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <Support />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/trips"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <Support />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/terms"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <Support />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/support"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <Support />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/policy"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <Support />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/faq"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <Support />
                        </ProtectedRoute>
                    }
                />

                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
