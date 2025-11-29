import React from 'react';
import './LearnMorePage.css'; // Reusing your general page styles
import { Link } from 'react-router-dom';

const LearnMorePage = () => {
  return (
    <div className="learn-more-page-container">
      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <h1>Our Commitment to Your Success</h1>
        <p className="subtitle">
          Discover why millions of learners trust our platform to advance their careers and skills.
        </p>
      </header>
      
      <section className="info-section">
        <div className="info-item">
          <h2>Mission</h2>
          <p>
            Our mission is to make high-quality education accessible to everyone, everywhere. We believe that
            learning should be a lifelong journey and a tool for personal and professional empowerment.
          </p>
        </div>
        
        <div className="info-item">
          <h2>Our Values</h2>
          <ul>
            <li>**Excellence:** We partner with industry leaders to bring you the best and most relevant courses.</li>
            <li>**Accessibility:** Our platform is designed to be easy to use and available to learners worldwide.</li>
            <li>**Community:** We foster a supportive environment where you can connect with peers and mentors.</li>
          </ul>
        </div>
        
        <div className="info-item">
          <h2>Our Impact</h2>
          <p>
            Since our launch, we have helped over 50,000 students acquire new skills, land their dream jobs,
            and achieve their career goals. Join us and become part of our growing success story.
          </p>
        </div>
      </section>
      
      <footer className="page-footer">
        <p>Ready to start your journey? <Link to="/courses" className="footer-link">Browse our courses</Link> today!</p>
      </footer>
    </div>
  );
};

export default LearnMorePage;
