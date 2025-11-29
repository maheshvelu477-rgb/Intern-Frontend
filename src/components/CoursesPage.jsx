// src/components/CoursesPage.jsx

import React, { useState, useEffect } from 'react'; 
import './CoursePage.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 

// --- START OF IMAGE FIX ---
const API_BASE_URL = 'http://localhost:8000';
const API_URL = `${API_BASE_URL}/api/v1/courses`; 
// --- END OF IMAGE FIX ---


const CoursesPage = () => {
    // 1. Define state variables
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Fetch data from the API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Use the new API_URL constant
                const response = await axios.get(API_URL);
                
                // CRITICAL: Extract data from the response structure { data: { data: [...] } }
                setCourses(response.data.data); 
                setLoading(false);
            } catch (err) {
                console.error("Error fetching public courses:", err);
                setError("Sorry, we couldn't load the courses at this time.");
                setLoading(false);
            }
        };

        fetchCourses();
    }, []); // Run only once on mount


    // 3. Handle Loading and Error States
    if (loading) {
        return (
            <div className="courses-page-container">
                <p className="loading-message">Loading courses...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="courses-page-container">
                <p className="error-message text-danger">Error: {error}</p>
            </div>
        );
    }
    
    // Check if the array is empty
    if (courses.length === 0) {
        return (
            <div className="courses-page-container">
                <p className="empty-message">No courses available yet. Check back soon!</p>
            </div>
        );
    }


    // 4. Render the grid with fetched data
    return (
        <div className="courses-page-container">
            <header className="page-header">
                <Link to="/" className="back-link">
                    ← Back to Home
                </Link>
                <h1>All Courses</h1>
                <p className="subtitle">
                    Explore our full catalog of expert-led courses and find your passion.
                </p>
            </header>
            <div className="courses-grid">
                {courses.map((course) => (
                    <div className="course-card" key={course._id}> 
                        <div className="course-image-container">
                            {/* 🌟 FIX APPLIED HERE: Construct the absolute image URL 🌟 */}
                            <img 
                                src={
                                    course.image 
                                    ? (
                                        course.image.startsWith('/') 
                                            ? `${API_BASE_URL}${course.image}` 
                                            : `${API_BASE_URL}/uploads/${course.image}`
                                    )
                                    : "https://via.placeholder.com/300x180.png?text=Course"
                                } 
                                alt={course.coursename} 
                            />
                        </div>
                        <div className="card-content">
                            {/* Title */}
                            <h3>{course.coursename}</h3> 
                            
                            {/* Description */}
                            <p className="course-description">{course.coursedetails}</p> 

                            <div className="card-footer">
                                <div className="card-rating">
                                    <FontAwesomeIcon icon={faStar} className="star-icon" />
                                    {/* Ratings: Using a placeholder since this field isn't in your model */}
                                    <span>{course.ratings || '5.0'}</span> 
                                    <span className="ratings-count">({course.ratingsCount || '0'})</span>
                                </div>
                                {/* Price */}
                                <div className="course-price">${course.price ? course.price.toFixed(2) : '0.00'}</div>
                            </div>
                            <Link to='/login' className="btn buy-now-btn">Enroll Now</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoursesPage;
