import React from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <h1>Login to Your Account</h1>
        <p className="subtitle">
          Enter your details below to access your dashboard and start learning.
        </p>
      </header>

      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" required />
        </div>
        <Link to='/payment' className="btn login-submit-btn">
          Log In
        </Link>
          <p className="forgot-password">
            <a href="#">Forgot your password?</a>
          </p>
          <footer className="page-footer">
        <p style={{color:"Gray"}}>
          Don't have an account? <Link to="/signup" className="footer-link">Sign Up</Link>
        </p>
      </footer>
      </form>

    </div>
  );
};

export default LoginPage;