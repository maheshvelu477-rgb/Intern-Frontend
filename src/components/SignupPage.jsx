import React from 'react';
import './SignupPage.css'; // Reusing your general page styles
import { Link } from 'react-router-dom';

const SignupPage = () => {
  return (
    <div className="signup-page-container">
      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <h1>Create an Account</h1>
        <p className="subtitle">
          Join LearnHub today and start your learning journey.
        </p>
      </header>

      <form className="signup-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" placeholder="Enter your full name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Create a password" required />
        </div>
        <button type="submit" className="btn signup-submit-btn">
          Sign Up
        </button>
        <footer className="page-footer">
        <p style={{color: '#555'}}>
          Already have an account? <Link to="/login" className="footer-link">Log In</Link>
        </p>
      </footer>
      </form>

      
    </div>
  );
};

export default SignupPage;
