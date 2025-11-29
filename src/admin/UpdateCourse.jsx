// src/admin/UpdateCourse.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from "./Nav";

const API_BASE_URL = 'http://localhost:8000';
const API_URL = `${API_BASE_URL}/api/v1/courses`;

export default function UpdateCourse() {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        coursename: '',
        coursedetails: '',
        price: 0,
        // The 'image' field now holds the OLD path/URL for the preview
        image: '' 
    });
    
    // NEW STATE: To hold the actual file object selected by the user
    const [selectedFile, setSelectedFile] = useState(null); 
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Fetch the specific course data on component mount
    useEffect(() => {
        const fetchCourse = async () => {
            if (!id) {
                setError("No course ID provided.");
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`${API_URL}/${id}`);
                const courseData = response.data.data;
                
                // Populate the form state with fetched data (including the old image path)
                setFormData({
                    coursename: courseData.coursename || '',
                    coursedetails: courseData.coursedetails || '',
                    price: Number(courseData.price) || 0, 
                    image: courseData.image || '' // Stores the existing image path
                });
                setLoading(false);
            } catch (err) {
                console.error("Error fetching course:", err);
                const errorMessage = err.response?.data?.message || `Failed to load course details for ID ${id}.`;
                setError(errorMessage);
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    // Handle changes for text/number inputs
    const onChange = (e) => {
        const value = e.target.id === 'price' ? Number(e.target.value) : e.target.value;
        setFormData({ ...formData, [e.target.id]: value });
    };

    // NEW: Handle file selection
    const handleFileChange = (e) => {
        // Store the file object in state
        setSelectedFile(e.target.files[0]); 
    };

    // 3. Handle form submission (PUT request)
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // *** CRITICAL CHANGE: Use FormData for file uploads ***
        const data = new FormData();
        
        // 1. Append text data
        data.append('coursename', formData.coursename);
        data.append('coursedetails', formData.coursedetails);
        data.append('price', formData.price);
        
        // 2. Append the selected file, using 'image' as the field name
        if (selectedFile) {
            data.append('image', selectedFile); 
        } else {
            // If no new file is selected, but an old path exists, resend it to maintain the old image
            data.append('image', formData.image);
        }

        try {
            await axios.put(`${API_URL}/${id}`, data, {
                headers: {
                    // Set the Content-Type header to correctly send FormData
                    'Content-Type': 'multipart/form-data', 
                },
            });

            alert('Course updated successfully! Redirecting to course list.');
            navigate('/admin/courses'); 
        } catch (err) {
            console.error("Error updating course:", err.response ? err.response.data : err.message);
            const errorMessage = err.response?.data?.message || "An unexpected error occurred during update.";
            setError(errorMessage);
            setLoading(false);
        }
    };

    if (loading && !error) {
        return <div className="text-center p-5"><p className="text-info">Loading course details...</p></div>;
    }

    if (error) {
        return (
            <div className="text-center p-5">
                <p className="text-danger fs-5">Error: {error}</p>
                <button onClick={() => navigate('/admin/courses')} className="btn btn-secondary mt-3">
                    Back to Course List
                </button>
            </div>
        );
    }

    // Determine the image URL for the preview (either the old one or a newly selected one)
    const previewImageUrl = selectedFile 
        ? URL.createObjectURL(selectedFile) // For newly selected file
        : formData.image 
            ? `${API_BASE_URL}${formData.image.startsWith('/') ? formData.image : `/uploads/${formData.image}`}` 
            : null; // For existing image path
    
    // Get the name of the file to display in the preview
    const previewImageName = selectedFile ? selectedFile.name : (formData.image || 'No Image');

    return (
        <>
            <div className='d-flex'>
                <Nav />

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Update Course: {formData.coursename}</h1>
                    </div>

                    <div className="dashboard-card p-4">
                        {/* Remove the 'enctype' attribute if not using a pure HTML form, but keep the logic! */}
                        <form onSubmit={onSubmit}>
                            
                            <div className="mb-3">
                                <label htmlFor="coursename" className="form-label">Course Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="coursename"
                                    placeholder="Enter course name" 
                                    value={formData.coursename}
                                    onChange={onChange}
                                    disabled={loading}
                                    required
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="coursedetails" className="form-label">Course Details</label>
                                <textarea 
                                    className="form-control" 
                                    id="coursedetails"
                                    rows="3"
                                    value={formData.coursedetails}
                                    onChange={onChange}
                                    disabled={loading}
                                    required
                                ></textarea>
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price ($)</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="price" 
                                    placeholder="Enter course price" 
                                    value={formData.price} 
                                    onChange={onChange}
                                    disabled={loading}
                                    required
                                    min="0"
                                    step="0.01" 
                                />
                            </div>
                            
                            {/* 🌟 FORM INPUT FIX: Swapped text input for file input 🌟 */}
                            <div className="mb-3">
                                <label htmlFor="file" className="form-label">Upload New Course Image (Optional)</label>
                                <input 
                                    type="file" 
                                    className="form-control" 
                                    id="file" // Used 'file' as ID to distinguish from 'image' state
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    disabled={loading}
                                />
                                
                                {previewImageUrl && (
                                    <small className="d-block mt-2">
                                        Current Image: **{previewImageName}**
                                        <img 
                                            src={previewImageUrl} 
                                            alt="Course Preview" 
                                            className='ms-2'
                                            style={{width: '60px', height: '40px', objectFit: 'cover'}} 
                                        />
                                        <p className='text-muted mt-1'>Upload a new image to replace the current one.</p>
                                    </small>
                                )}
                            </div>
                            
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                <i className={`bi bi-save ${loading ? 'd-none' : ''}`}></i>
                                {loading ? ' Updating...' : ' Update Course'}
                            </button>
                            <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/admin/courses')}>
                                Cancel
                            </button>

                            {error && <p className="text-danger mt-3">{error}</p>}
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}
