// src/admin/AddNewCourse.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav'; 

export default function AddNewCourse() {
    // State to hold text form data (excluding the file)
    const [formData, setFormData] = useState({
        coursename: '',
        coursedetails: '',
        price: ''
    });
    // State to hold the file object
    const [imageFile, setImageFile] = useState(null); 
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Base URL for the API
    const API_URL = "https://intern-backend-chi.vercel.app/api/v1/courses"; 

    // Handler for text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            // Convert price to number immediately upon change
            [name]: name === 'price' ? parseFloat(value) : value 
        }));
    };

    // Handler for file input change
    const handleFileChange = (e) => {
        // Save the file object
        setImageFile(e.target.files[0]);
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // --- 1. Validate and Create FormData Payload ---
        if (!imageFile) {
            setLoading(false);
            setError("Please upload a course image.");
            return;
        }

        // Create a FormData object to handle both files and text
        const formPayload = new FormData();
        
        // Append ALL text fields from formData state
        formPayload.append('coursename', formData.coursename);
        formPayload.append('coursedetails', formData.coursedetails);
        formPayload.append('price', formData.price); // Price is sent as a string, but Express body-parser should handle it

        // Append the file (key 'image' MUST match Multer's .single('image'))
        formPayload.append('image', imageFile);

        try {
            // --- 2. Send the POST request ---
            // Axios automatically sets the Content-Type to 'multipart/form-data'
            const response = await axios.post(API_URL, formPayload);

            if (response.data.success) {
                alert(`Course "${formData.coursename}" added successfully!`);
                navigate('/admin/courses');
            } else {
                setError(response.data.message || 'Server reported a general failure.');
            }
        } catch (err) {
            console.error('Error adding course:', err.response ? err.response.data : err.message);
            
            const errorMessage = err.response && err.response.data && err.response.data.message 
                ? err.response.data.message
                : 'Failed to add course. Please check required fields.';
                
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='d-flex'>
                <Nav />
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Add New Course</h1>
                    </div>

                    <div className="dashboard-card">
                        <form onSubmit={handleSubmit}>
                            
                            {error && <div className="alert alert-danger" role="alert">Error: {error}</div>}

                            {/* Course Name Input */}
                            <div className="mb-3">
                                <label htmlFor="coursename" className="form-label">Course Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="coursename"
                                    name="coursename"
                                    value={formData.coursename}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Course Details Input (Description) */}
                            <div className="mb-3">
                                <label htmlFor="coursedetails" className="form-label">Details / Description</label>
                                <textarea
                                    className="form-control"
                                    id="coursedetails"
                                    name="coursedetails"
                                    rows="3"
                                    value={formData.coursedetails}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            {/* Price Input */}
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price ($)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            {/* Image FILE Input (for upload) */}
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Course Image (Upload)</label>
                                <input
                                    type="file" // <--- Type is 'file'
                                    className="form-control"
                                    id="image"
                                    name="image"
                                    onChange={handleFileChange} // <--- Separate handler for file
                                    required
                                    accept="image/*"
                                />
                            </div>

                            <div className="d-flex justify-content-between">
                                <Link to="/admin/courses" className="btn btn-secondary">
                                    Cancel
                                </Link>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Adding...
                                        </>
                                    ) : 'Add Course'}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}
