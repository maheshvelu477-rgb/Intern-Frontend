import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Configuration
const API_BASE_URL = "https://intern-backend-chi.vercel.app";
const API_URL = `${API_BASE_URL}/api/v1/mentors`;

// Helper to determine the image URL
const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://placehold.co/150x150/6366f1/ffffff?text=Mentor";
    
    if (imagePath.startsWith('http')) return imagePath;

    // Assumes path is stored as 'image-filename.jpg' or '/uploads/image-filename.jpg'
    return imagePath.startsWith('/uploads') 
        ? `${API_BASE_URL}${imagePath}` 
        : `${API_BASE_URL}/uploads/${imagePath}`;
};

const MentorsPage = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the data
    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await axios.get(API_URL);
                const fetchedMentors = response.data.data || [];
                
                // Sanitize data: ensure coursesTaught is an array
                const sanitizedMentors = fetchedMentors.map(mentor => ({
                    ...mentor,
                    coursesTaught: mentor.coursesTaught || [] 
                }));

                setMentors(sanitizedMentors);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching mentors:", err);
                setError("Failed to load mentor profiles. Please ensure the backend server is running.");
                setLoading(false);
            }
        };
        fetchMentors();
    }, []);

    // --- Render Logic ---

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-lg text-indigo-600 font-semibold">
                Loading mentor profiles...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center bg-red-100 border border-red-400 text-red-700 mx-auto max-w-2xl mt-10 rounded-xl shadow-xl">
                <p className="font-bold text-xl mb-2">Error Loading Data</p>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <>
            <style jsx="true">{`
                /* General Page Layout */
                .faculty-page-container {
                    padding: 40px 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                    font-family: 'Inter', sans-serif;
                }
                .page-header {
                    text-align: center;
                    margin-bottom: 40px;
                }
                .page-header h1 {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #1e293b;
                    margin-bottom: 10px;
                }
                .subtitle {
                    color: #64748b;
                    font-size: 1.1rem;
                }
                .back-link {
                    display: inline-block;
                    margin-bottom: 20px;
                    color: #7c3aed; /* Accent Purple */
                    text-decoration: none;
                    font-weight: 600;
                    transition: color 0.2s;
                }
                .back-link:hover {
                    color: #4c1d95;
                }
                
                /* Grid and Card Structure */
                .faculty-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 30px;
                }
                .faculty-card {
                    background-color: #ffffff;
                    border-radius: 16px;
                    padding: 30px;
                    text-align: center;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    border: 1px solid #f1f5f9;
                }
                .faculty-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
                }

                /* Image/Avatar Styling */
                .faculty-img-container {
                    width: 120px;
                    height: 120px;
                    margin: 0 auto 20px;
                    border-radius: 50%;
                    padding: 5px; 
                    border: 3px solid #7c3aed; /* Strong Purple Ring */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .faculty-img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #ffffff; /* Inner white ring */
                }

                /* Text Content */
                .faculty-content h3 {
                    font-size: 1.6rem;
                    font-weight: 700;
                    color: #1e293b;
                    margin-bottom: 5px;
                }
                .faculty-title {
                    color: #7c3aed; /* Accent Purple */
                    font-style: italic;
                    font-weight: 500;
                    font-size: 1.05rem;
                    margin-bottom: 20px;
                }
                .faculty-bio {
                    color: #475569;
                    font-size: 0.95rem;
                    margin: 0 auto 30px;
                    max-width: 90%;
                    line-height: 1.6;
                }

                /* Courses List */
                .faculty-courses {
                    text-align: left;
                    padding-top: 20px;
                    border-top: 1px solid #f1f5f9;
                    margin-top: 20px;
                }
                .faculty-courses h4 {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #7c3aed; /* Accent Purple */
                    margin-bottom: 12px;
                }
                .faculty-courses ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .faculty-courses li {
                    color: #334155;
                    font-size: 0.9rem;
                    line-height: 1.8;
                    position: relative;
                    padding-left: 20px;
                }
                .faculty-courses li::before {
                    content: "◆"; /* Diamond bullet point */
                    color: #7c3aed; /* Accent Purple */
                    font-size: 0.7em;
                    position: absolute;
                    left: 0;
                    top: 1px;
                }
            `}</style>
            <div className="faculty-page-container">
                <header className="page-header">
                    <Link to="/" className="back-link">
                        ← Back to Home
                    </Link>
                    <h1>Meet Our Expert Mentors</h1>
                    <p className="subtitle">
                        Our mentors are industry professionals dedicated to helping you succeed.
                    </p>
                </header>
                
                <section className="faculty-grid">
                    {mentors.length === 0 ? (
                        <div className="col-span-full p-8 text-center bg-gray-50 border border-gray-300 text-gray-700 rounded-xl shadow-inner mx-auto max-w-lg w-full">
                            <p className="font-semibold text-lg">No mentors are currently listed.</p>
                            <p className="text-sm mt-1">Check back soon for updates!</p>
                        </div>
                    ) : (
                        mentors.map(member => (
                            <div className="faculty-card" key={member._id}>
                                <div className="faculty-img-container">
                                    <img 
                                        src={getImageUrl(member.image)} 
                                        alt={member.mentorname} 
                                        className="faculty-img" 
                                        onError={(e) => {
                                            e.target.onerror = null; 
                                            e.target.src = "https://placehold.co/120x120/7c3aed/ffffff?text=M";
                                        }}
                                    />
                                </div>
                                <div className="faculty-content">
                                    <h3>{member.mentorname}</h3>
                                    <p className="faculty-title">{member.position}</p>
                                    <p className="faculty-bio">{member.details}</p>
                                    
                                    {member.coursesTaught.length > 0 && (
                                        <div className="faculty-courses">
                                            <h4>Courses Taught:</h4>
                                            <ul>
                                                {member.coursesTaught.map((course, index) => (
                                                    <li key={index}>{course}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </section>
            </div>
        </>
    );
};

export default MentorsPage;
