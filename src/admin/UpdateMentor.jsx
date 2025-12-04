import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from "./Nav";

const API_BASE_URL = 'https://intern-backend-chi.vercel.app';
const API_URL = `${API_BASE_URL}/api/v1/mentors`;

export default function UpdateMentor() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        mentorname: '',
        position: '', 
        details: '', 
        currentImage: '', // Holds the existing image path from DB
        imageFile: null, // Holds the *new* File object for upload
        imagePreviewUrl: null, // For previewing the *newly selected* image
        coursesTaught: [], 
    });
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper function to get the absolute image URL for preview
    const getImageUrl = (imagePath) => {
        if (!imagePath) return `${API_BASE_URL}/uploads/no-photo.jpg`;
        return imagePath.startsWith(API_BASE_URL)
            ? imagePath
            : `${API_BASE_URL}${imagePath}`;
    };

    // Fetch the specific mentor data
    useEffect(() => {
        const fetchMentor = async () => {
            try {
                const response = await axios.get(`${API_URL}/${id}`);
                const mentorData = response.data.data;
                
                const courses = Array.isArray(mentorData.coursesTaught) && mentorData.coursesTaught.length > 0
                    ? mentorData.coursesTaught
                    : ['']; 

                setFormData({
                    ...formData, // Keep existing state values
                    mentorname: mentorData.mentorname || '',
                    position: mentorData.position || '',
                    details: mentorData.details || '',
                    currentImage: mentorData.image || '', // Store the current image path
                    coursesTaught: courses,
                });
                setLoading(false);
            } catch (err) {
                console.error("Error fetching mentor:", err);
                setError(err.response?.data?.message || `Failed to load mentor details for ID: ${id}.`);
                setLoading(false);
            }
        };

        if (id) {
            fetchMentor();
        }
    }, [id]);

    // Handle input changes (for simple fields)
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    
    // NEW: Handles file selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ 
                ...formData, 
                imageFile: file,
                imagePreviewUrl: URL.createObjectURL(file) // Create a temporary URL for preview
            });
        }
    };

    // Handle changes for the dynamic list of coursesTaught
    const handleCourseChange = (index, value) => {
        const newCourses = [...formData.coursesTaught];
        newCourses[index] = value;
        setFormData({ ...formData, coursesTaught: newCourses });
    };

    // Add a new empty course input field
    const addCourseInput = () => {
        setFormData({ ...formData, coursesTaught: [...formData.coursesTaught, ''] });
    };
    
    // Remove a course input field
    const removeCourseInput = (index) => {
        const newCourses = formData.coursesTaught.filter((_, i) => i !== index);
        setFormData({ ...formData, coursesTaught: newCourses.length > 0 ? newCourses : [''] }); 
    };

    // Handle form submission (PUT request)
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        // 🚨 CRITICAL: Use FormData for sending files 🚨
        const data = new FormData();
        data.append('mentorname', formData.mentorname);
        data.append('position', formData.position);
        data.append('details', formData.details);
        
        // Only append the file if a NEW file was selected
        if (formData.imageFile) {
            data.append('image', formData.imageFile); 
        }

        // Filter and append courses
        formData.coursesTaught.forEach(course => {
            if (course.trim() !== '') {
                data.append('coursesTaught[]', course.trim());
            }
        });
        
        // For updates, we use PUT
        try {
            await axios.put(`${API_URL}/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Mentor updated successfully!');
            navigate('/admin/mentors'); 
        } catch (err) {
            console.error("Error updating mentor:", err.response?.data || err.message);
            setError(err.response?.data?.message || err.message || "An unexpected error occurred during update.");
            setLoading(false);
        }
    };
    
    if (loading && !error) {
        return <p className="text-info p-5">Loading mentor details...</p>;
    }

    if (error) {
        return <p className="text-danger p-5">Error: {error}</p>;
    }

    return(
        <>
        <div className='d-flex'>
              <Nav />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Update Mentor: {formData.mentorname}</h1>
                </div> 	

                <div className="dashboard-card p-4"> 		 	
                    <form onSubmit={onSubmit}>
                        {/* Current Image Display */}
                        <div className="mb-3">
                            <label className="form-label">Current Mentor Image</label>
                            <div className="d-block mb-2">
                                <img 
                                    src={formData.imagePreviewUrl || getImageUrl(formData.currentImage)} 
                                    alt="Current Mentor" 
                                    style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%'}} 
                                />
                            </div>

                            {/* --------------------- FILE UPLOAD FIELD --------------------- */}
                            <label htmlFor="imageFile" className="form-label">Upload NEW Mentor Image (Optional)</label>
                            <input 
                                type="file" 
                                className="form-control" 
                                id="imageFile" 
                                onChange={handleImageChange}
                                accept="image/*"
                                disabled={loading}
                            />
                            <small className='form-text text-muted'>Selecting a new file will replace the current image.</small>
                        </div>
                        {/* ------------------------------------------------------------- */}
                        
                        <div className="mb-3">
                            <label htmlFor="mentorname" className="form-label">Mentor Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="mentorname" 
                                value={formData.mentorname} 
                                onChange={onChange}
                                disabled={loading}
                                required
                            />
                        </div>
                        
                        {/* ... (Position, Details, and Courses Taught fields remain the same) ... */}

                        <div className="mb-3">
                            <label htmlFor="position" className="form-label">Position/Title</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="position" 
                                value={formData.position}
                                onChange={onChange}
                                disabled={loading}
                                required
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="details" className="form-label">Mentor Details/Bio</label>
                            <textarea 
                                className="form-control" 
                                id="details"
                                rows="3"
                                value={formData.details}
                                onChange={onChange}
                                disabled={loading}
                                required
                            ></textarea>
                        </div>
                        
                        <div className="mb-3">
                            <label className="form-label">Courses Taught</label>
                            <div className="list-group">
                                {formData.coursesTaught.map((course, index) => (
                                    <div key={index} className="input-group mb-2">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder={`Course #${index + 1}`} 
                                            value={course} 
                                            onChange={(e) => handleCourseChange(index, e.target.value)}
                                            disabled={loading}
                                        />
                                        <button 
                                            type="button" 
                                            className="btn btn-outline-danger" 
                                            onClick={() => removeCourseInput(index)}
                                            disabled={loading}
                                        >Delete
                                            <i className="bi bi-x"></i>
                                        </button>
                                    </div>
                                ))}
                                <button type="button" className="btn btn-secondary mt-2 w-auto" onClick={addCourseInput} disabled={loading}>
                                    <i className="bi bi-plus-circle"></i> Add Course
                                </button>
                            </div>
                        </div>
                        
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                             <i className="bi bi-save"></i> {loading ? ' Updating...' : ' Update Mentor'}
                        </button>
                        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/admin/mentors')} disabled={loading}>
                            Cancel
                        </button>
                        {error && <p className="text-danger mt-3">{error}</p>}
                    </form>
                </div> 
            </main> 			 
        </div>
        </>
    )
}
