import React from 'react';
import { Link } from 'react-router-dom';
import './MyCoursesPage.css';

const MyCoursesPage = () => {
  return (
    <div className="my-courses-page-container">
      <header className="page-header">
        <Link to="/courses" className="back-link">
                  ← Back to Courses
                </Link>
        <h1>My Courses</h1>
        <p className="subtitle">
          Welcome! Here are the courses you've enrolled in.
        </p>
      </header>
      <div className="course-list">
        <div className="enrolled-course-card">
          <h2>Full-Stack JavaScript</h2>
          <p className="course-status">Status: In Progress</p>
          <Link to="/course-details/1" className="btn continue-btn">
            Continue Learning
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyCoursesPage;
