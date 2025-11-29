import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from "./Nav";

const API_BASE_URL = 'http://localhost:8000';
const API_URL = `${API_BASE_URL}/api/v1/mentors`;

export default function AddMentor() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        mentorname: '',
        position: '', 
        details: '', 
        imageFile: null, // Holds the actual File object
        imagePreviewUrl: null, // For displaying the local preview
        coursesTaught: [''], 
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handles changes for simple input fields
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

    // Handles changes for the dynamic list of coursesTaught
    const handleCourseChange = (index, value) => {
        const newCourses = [...formData.coursesTaught];
        newCourses[index] = value;
        setFormData({ ...formData, coursesTaught: newCourses });
    };

    // Adds a new empty course input field
    const addCourseInput = () => {
        setFormData({ ...formData, coursesTaught: [...formData.coursesTaught, ''] });
    };
    
    // Removes a course input field
    const removeCourseInput = (index) => {
        const newCourses = formData.coursesTaught.filter((_, i) => i !== index);
        setFormData({ ...formData, coursesTaught: newCourses.length > 0 ? newCourses : [''] });
    };

    // Handles form submission (POST request)
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        // 🚨 CRITICAL: Use FormData for sending files 🚨
        const data = new FormData();
        data.append('mentorname', formData.mentorname);
        data.append('position', formData.position);
        data.append('details', formData.details);
        
        if (formData.imageFile) {
            // 'image' MUST match the name in multer's .single('image')
            data.append('image', formData.imageFile); 
        }

        // Filter and append courses - must use array syntax for express to parse correctly
        formData.coursesTaught.forEach(course => {
            if (course.trim() !== '') {
                data.append('coursesTaught[]', course.trim()); 
            }
        });

        try {
            // Must include headers for file upload
            await axios.post(API_URL, data, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            });
            alert('Mentor added successfully!');
            navigate('/admin/mentors'); 
        } catch (err) {
            console.error("Error adding mentor:", err.response?.data || err.message);
            setError(err.response?.data?.message || err.message || "An unexpected error occurred while adding the mentor.");
            setLoading(false);
        }
    };

    return(
        <>
        <div className='d-flex'>
            <Nav />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Add New Mentor (With File Upload)</h1>
                </div> 

                <div className="dashboard-card p-4"> 
                    <form onSubmit={onSubmit}>
                        {/* --------------------- FILE UPLOAD FIELD --------------------- */}
                        <div className="mb-3">
                            <label htmlFor="imageFile" className="form-label">Upload Mentor Image</label>
                            <input 
                                type="file" // <-- Changed to file input
                                className="form-control" 
                                id="imageFile" 
                                onChange={handleImageChange}
                                accept="image/*" // Only allow image files
                                disabled={loading}
                            />
                            {/* Image Preview */}
                            {(formData.imageFile || formData.imagePreviewUrl) && 
                                <small className="d-block mt-2">
                                    Preview: <img 
                                        src={formData.imagePreviewUrl} 
                                        alt="Mentor Preview" 
                                        style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%'}} 
                                    />
                                </small>
                            }
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
                            <label className="form-label">Courses Taught (Enter one per field)</label>
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
                                    <i className="bi bi-plus-circle"></i> Add Course Field
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-success" disabled={loading}>
                             <i className="bi bi-person-plus"></i> {loading ? ' Adding...' : ' Add Mentor'}
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
