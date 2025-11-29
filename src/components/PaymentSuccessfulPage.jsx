import React from 'react';
import './PaymentSuccessfulPage.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const PaymentSuccessfulPage = () => {
  return (
    <div className="success-page-container">
      <div className="success-card">
        <FontAwesomeIcon icon={faCircleCheck} className="success-icon" />
        <h1>Payment Successful!</h1>
        <p className="subtitle">
          Thank you for your purchase. You are now enrolled in the course.
        </p>
        <Link to="/my-courses" className="btn go-to-courses-btn">
          Go to My Courses
        </Link>
        <Link to="/" className="back-home-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessfulPage;
