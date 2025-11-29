// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
// import './LandingPage.css'; // You can reuse styles from LandingPage or a dedicated Navbar.css

const Navbar = ({ user, onLogout }) => {

    const handleLogout = () => {
        // Clear token from storage (critical step)
        localStorage.removeItem('authToken');
        // Clear user state in App.js (to trigger UI update)
        if (onLogout) {
            onLogout();
        }
    };
    
    // Helper to get first name for welcome message
    const firstName = user ? user.name.split(' ')[0] : '';

    return (
        <div className="navbar">
            <div className="logo">LearnHub</div>
            <div className="nav-links">
                {/* Public Links */}
                <Link to="/how-it-works">How it Works</Link>
                <Link to="/mentors">Mentors</Link>
                <Link to="/courses" className="btn browse-btn">Browse Courses</Link>
            </div>
            
            <div className="nav-buttons">
                {user ? (
                    // --- LOGGED IN USER VIEW ---
                    <>
                        {/* 🌟 Display User Name 🌟 */}
                        <span className="welcome-name">
                            Welcome, {firstName} 👋
                        </span>
                        
                        {/* 🌟 My Courses Link 🌟 */}
                        <Link to="/my-courses" className="btn my-courses-btn" style={{marginRight: '10px'}}>
                            My Courses
                        </Link>
                        
                        {/* Admin Link (Conditional) */}
                        {user.role === 'Admin' && (
                            <Link to="/admin" className="btn admin-btn" style={{backgroundColor: '#3498db'}}>
                                Admin
                            </Link>
                        )}

                        <button onClick={handleLogout} className="btn logout-btn">
                            Logout
                        </button>
                    </>
                ) : (
                    // --- LOGGED OUT USER VIEW ---
                    <>
                        <Link to="/login" className="btn login-btn">Login</Link>
                        <Link to="/signup" className="btn signup-btn">Sign Up</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
