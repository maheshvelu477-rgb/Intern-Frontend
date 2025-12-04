import React, { useState, useEffect } from 'react'; 
import './LandingPage.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faCertificate, faUsers, faClock, faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 

// --- API CONSTANTS ---
const API_BASE_URL = 'https://intern-backend-chi.vercel.app';
const API_URL = `${API_BASE_URL}/api/v1/courses`;
// --- END API CONSTANTS ---


const LandingPage = ({ user, onLogout }) => {
    const [allCourses, setAllCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(API_URL);
                setAllCourses(response.data.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching landing page courses:", err);
                setError("Failed to load featured courses.");
                setLoading(false);
            }
        };

        fetchCourses();
    }, []); 

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredCourses = allCourses.filter(course =>
        course.coursename.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const featuredCourses = filteredCourses.slice(0, 8);


    if (loading) {
        return (
            <div className="landing-page">
                <header className="hero-section">
                    <div className="hero-content" style={{minHeight: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <p className="text-info">Loading courses...</p>
                    </div>
                </header>
            </div>
        );
    }
    
    if (error) {
           return (
             <div className="landing-page">
                 <header className="hero-section">
                     <div className="hero-content" style={{minHeight: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                         <p className="text-danger">Error: {error}</p>
                     </div>
                 </header>
             </div>
           );
    }


    return (
        <div className="landing-page">
            <header className="hero-section">
                <div className="navbar">
                    <Link to="/" className="logo">LearnHub</Link>
                    
                    <div className="nav-links">
                        <Link to="/how-it-works">How it Works</Link>
                        <Link to="/mentors">Mentors</Link>
                        {user && <Link to="/my-courses">My Courses</Link>}
                    </div>

                    <div className="nav-buttons">
                        <Link to='/courses' className="btn browse-btn">Browse Courses</Link>
                        
                        {user ? (
                            <>
                                <span className="user-greeting">
                                    Hi, **{user.name || user.email}**
                                </span>
                                <button onClick={onLogout} className="btn logout-btn">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to='/login' className="btn login-btn">Login</Link>
                                <Link to='/signup' className="btn signup-btn">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
                <div className="hero-content">
                    <h1>Learn Skills That Shape Your Future</h1>
                    <p>
                        Join millions of learners worldwide. Access top-quality courses taught by
                        industry experts and transform your career today.
                    </p>
                    <div className="hero-search">
                        <input
                            type="text"
                            placeholder="Search for a course..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className="btn search-btn">Search</button>
                    </div>
                    <div className="hero-stats">
                        <div>
                            <p>50K+</p>
                            <span>Students</span>
                        </div>
                        <div>
                            <p>{allCourses.length}+</p>
                            <span>Courses</span>
                        </div>
                        <div>
                            <p>95%</p>
                            <span>Success Rate</span>
                        </div>
                    </div>
                </div>
            </header>

            <section className="features-section">
                <h2>Why Choose Our Platform?</h2>
                <p className="features-subtitle">
                    We provide the best learning experience with top-quality content and support
                </p>
                <div className="features-grid">
                    <div className="feature-item">
                        <FontAwesomeIcon icon={faLaptopCode} size="2x" />
                        <h4>Expert-Led Courses</h4>
                        <p>Engage with hands-on labs taught by real-world experts</p>
                    </div>
                    <div className="feature-item">
                        <FontAwesomeIcon icon={faCertificate} size="2x" />
                        <h4>Certificates</h4>
                        <p>Get a professional certificate upon course completion</p>
                    </div>
                    <div className="feature-item">
                        <FontAwesomeIcon icon={faUsers} size="2x" />
                        <h4>Community Support</h4>
                        <p>Access an active community forum to ask questions and learn</p>
                    </div>
                    <div className="feature-item">
                        <FontAwesomeIcon icon={faClock} size="2x" />
                        <h4>Self-Paced Learning</h4>
                        <p>Study on your own schedule with flexible deadlines</p>
                    </div>
                </div>
            </section>

            <section className="courses-section">
                <div className="courses-header">
                    <h2>Featured Courses</h2>
                    <p>Explore our most popular courses</p>
                    <Link to='/courses' className="btn view-all-btn">View All Courses</Link>
                </div>
                <div className="course-grid">
                    {featuredCourses.length > 0 ? (
                        featuredCourses.map((course) => (
                            <div className="course-card" key={course._id}>
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
                                <div className="card-content">
                                    <h4>{course.coursename}</h4>
                                    <div className="card-rating">
                                        <FontAwesomeIcon icon={faStar} /> 4.8 (250 ratings)
                                    </div>
                                    <p className="course-price">${course.price ? course.price.toFixed(2) : '0.00'}</p>
                                    
                                    {/* Link checks if user is logged in: */}
                                    {user ? (
                                        // If logged in, go straight to payment
                                        <Link 
                                            to={`/payment/${course._id}`} 
                                            className="btn buy-now-btn"
                                        >
                                            Enroll Now
                                        </Link>
                                    ) : (
                                        // If logged out, go to login, passing the payment path as state
                                        <Link 
                                            to='/login' 
                                            className="btn buy-now-btn"
                                            state={{ 
                                                from: `/payment/${course._id}`, 
                                            }}
                                        >
                                            Enroll Now
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No courses found matching your search query.</p>
                    )}
                </div>
            </section>

            <section className="cta-section">
                <h2>Ready to Start Learning?</h2>
                <p>Join thousands of students who have already transformed their careers with us.</p>
                <div className="cta-buttons">
                    <Link to='/courses' className="btn browse-cta">Browse All Courses</Link>
                    <Link to='/learn-more' className="btn learn-more-cta">Learn More</Link>
                </div>
            </section>

            <footer className="footer-section">
                <div className="footer-col">
                    <h3>LearnHub</h3>
                    <p>
                        Join millions of learners worldwide with high-quality courses and professional development.
                    </p>
                </div>
                <div className="footer-col">
                    <h4>Courses</h4>
                    <ul>
                        <li><a href="#">Web Development</a></li>
                        <li><a href="#">Data Science</a></li>
                        <li><a href="#">Digital Marketing</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Community Support</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
