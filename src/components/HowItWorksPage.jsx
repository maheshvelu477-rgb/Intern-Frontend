import React from 'react';
import './PageStyles.css'; // Assuming you have a CSS file for styling
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faLaptopCode, faCertificate } from '@fortawesome/free-solid-svg-icons';

const HowItWorksPage = () => {
  return (
    <div className="how-it-works-page">
      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <h1>How It Works</h1>
        <p className="subtitle">
          Getting started with LearnHub is as easy as 1-2-3.
        </p>
      </header>

      <section className="steps-section">
        <div className="step-card">
          <FontAwesomeIcon icon={faUserPlus} className="step-icon" />
          <h2 className="step-title">1. Sign Up</h2>
          <p className="step-description">
            Create your free account in just a few clicks to get access to our
            full library of courses and resources.
          </p>
        </div>

        <div className="step-card">
          <FontAwesomeIcon icon={faLaptopCode} className="step-icon" />
          <h2 className="step-title">2. Start Learning</h2>
          <p className="step-description">
            Choose a course and begin your learning journey with our
            expert-led video lessons and hands-on projects.
          </p>
        </div>

        <div className="step-card">
          <FontAwesomeIcon icon={faCertificate} className="step-icon" />
          <h2 className="step-title">3. Get Certified</h2>
          <p className="step-description">
            Complete your course and earn a professional certificate to share
            with your network and boost your career.
          </p>
        </div>
      </section>

      <footer className="page-footer">
        <p>Ready to start learning? <Link to="/courses" className="footer-link">Browse courses now!</Link></p>
      </footer>
    </div>
  );
};

export default HowItWorksPage;

