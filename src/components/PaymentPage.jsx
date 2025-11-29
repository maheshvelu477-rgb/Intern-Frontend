import React from 'react';
import './PaymentPage.css';
import { Link, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();

  const courseTitle = "Full-Stack JavaScript";
  const coursePrice = 109;
  const upiId = "yourname@upi"; // Replace with your actual UPI ID

  const handlePayment = (e) => {
    e.preventDefault();
    console.log("Processing card payment...");
    
    setTimeout(() => {
      navigate('/payment-success');
    }, 2000);
  };

  const handleUpiPayment = () => {
    console.log("Processing UPI payment...");
    // In a real application, you would handle the UPI payment confirmation here,
    // which often involves a backend check to verify the transaction.
    
    setTimeout(() => {
      navigate('/payment-success');
    }, 2000);
  };

  return (
    <div className="payment-page-container">
      <header className="page-header">
        <Link to="/courses" className="back-link">
          ← Back to Courses
        </Link>
        <h1>Secure Checkout</h1>
        <p className="subtitle">
          Complete your purchase and start your course instantly.
        </p>
      </header>
      
      <div className="payment-content">
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-item">
            <p>{courseTitle}</p>
            <p className="price">${coursePrice}</p>
          </div>
          <div className="order-total">
            <p>Total</p>
            <p className="price">${coursePrice}</p>
          </div>
        </div>

        <div className="payment-form-card">
          <form onSubmit={handlePayment}>
            <h3>Pay with Card</h3>
            <div className="form-group">
              <label htmlFor="card-number">Card Number</label>
              <input type="text" id="card-number" required placeholder="•••• •••• •••• ••••" />
            </div>
            <div className="form-group">
              <label htmlFor="card-name">Name on Card</label>
              <input type="text" id="card-name" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiry-date">Expiry Date</label>
                <input type="text" id="expiry-date" required placeholder="MM/YY" />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" required placeholder="•••" />
              </div>
            </div>
            <button type="submit" className="btn pay-btn">Pay ${coursePrice}</button>
          </form>

          <div className="divider">
            <hr />
            <span>OR</span>
            <hr />
          </div>

          <div className="upi-section">
            <h3>Pay with UPI</h3>
            <div className="qr-code-container">
              <img 
                src="https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=upi://pay?pa=yourname@upi&pn=Your%20Name&am=109" 
                alt="UPI QR Code" 
                className="upi-qr-code" 
              />
            </div>
            <p className="upi-id-text">Scan & Pay using any UPI App</p>
            <p className="upi-id">{upiId}</p>
            <Link to='/payment-success'   className="btn upi-btn">
              I have paid using UPI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
