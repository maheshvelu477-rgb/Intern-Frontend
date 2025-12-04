import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Nav from "./Nav";

const API_BASE_URL = "https://intern-backend-chi.vercel.app";
const API_URL = `${API_BASE_URL}/api/v1/mentors`; 

export default function Mentor() {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the data
    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await axios.get(API_URL); 
                // Handles both { data: [...] } and just an array
                const fetchedMentors = response.data.data || response.data || [];
                setMentors(fetchedMentors); 
                setLoading(false);
            } catch (err) {
                console.error("Error fetching mentors:", err);
                const errorMessage = err.response && err.response.data && err.response.data.error 
                                       ? err.response.data.error 
                                       : "Failed to load mentors. Check API connection or server logs.";
                setError(errorMessage);
                setLoading(false);
            }
        };
        fetchMentors();
    }, []); 

    // Delete handler
    const handleDelete = async (id, mentorName) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete mentor: "${mentorName}"?`);
        
        if (isConfirmed) {
            try {
                await axios.delete(`${API_URL}/${id}`); 
                // Remove the deleted mentor from state
                setMentors(prevMentors => prevMentors.filter(mentor => mentor._id !== id));
                console.log(`Mentor "${mentorName}" deleted successfully!`); 
            } catch (err) {
                console.error("Error deleting mentor:", err);
                setError("Failed to delete mentor. Check server logs.");
            }
        }
    };

    // Helper to determine the image URL
    const getImageUrl = (imagePath) => {
        if (!imagePath) return "https://via.placeholder.com/50?text=Mentor";
        return imagePath.startsWith(API_BASE_URL)
            ? imagePath // Already a full URL
            : imagePath.startsWith('/') 
                ? `${API_BASE_URL}${imagePath}` // Path starting with / (e.g., /uploads/image.jpg)
                : `${API_BASE_URL}/uploads/${imagePath}`; // Just a filename (assuming default uploads path)
    };

    if (loading && !error) {
        return <p className="text-info p-3">Loading mentors...</p>;
    }

    if (error) {
        return <p className="text-danger p-3">Error: {error}</p>;
    }
    
    // Empty state view
    if (mentors.length === 0) {
        return (
            <div className='d-flex'>
                <Nav />
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content p-3">
                    <h1 className="h2">Manage Mentors</h1>
                    <Link to="/admin/add-mentor" className="btn btn-success mb-3">Add New Mentor</Link>
                    <p className="alert alert-warning">No mentors found. Start by adding a new mentor!</p>
                </main>
            </div>
        );
    }

    return(
        <> 
        <div className='d-flex'>
           <Nav />

           <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
               <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Manage Mentors </h1>
                    <Link to="/admin/add-mentor" className="btn btn-success">Add New Mentor</Link>
               </div>

               <div className="dashboard-card">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Mentor Name</th>
                                    <th scope="col">Position/Title</th>
                                    <th scope="col">Details</th>
                                    <th scope="col">Courses Taught</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mentors.map((mentor, index) => (
                                    <tr key={mentor._id || index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            <img 
                                                src={getImageUrl(mentor.image)} 
                                                alt={mentor.mentorname} 
                                                style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%'}}
                                                loading="lazy"
                                            />
                                        </td>
                                        <td>{mentor.mentorname}</td>
                                        <td>{mentor.position}</td>
                                        <td>
                                            {mentor.details && mentor.details.length > 70 
                                                     ? mentor.details.substring(0, 70) + '...'
                                                     : mentor.details}
                                        </td>
                                        <td>
                                            {mentor.coursesTaught && mentor.coursesTaught.length > 0 ? (
                                                <ul style={{ paddingLeft: '20px', margin: '0' }}>
                                                    {mentor.coursesTaught.slice(0, 3).map((course, i) => (
                                                        <li key={i}>{course}</li>
                                                    ))}
                                                    {mentor.coursesTaught.length > 3 && <li>...</li>}
                                                </ul>
                                            ) : 'None'}
                                        </td>
                                        <td>
                                            <Link 
                                                to={`/admin/update-mentor/${mentor._id}`} 
                                                className="btn btn-sm btn-primary me-2"
                                            >
                                                <i className="bi bi-pencil"></i> Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(mentor._id, mentor.mentorname)} 
                                                className="btn btn-sm btn-danger"
                                            >
                                                <i className="bi bi-trash"></i> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
               </div>

           </main>
           </div>
        
        </>
    )
}
