// src/admin/Course.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Nav from "./Nav";

// --- START OF IMAGE FIX ---
const API_BASE_URL = 'http://localhost:8000'; 
const API_URL = `${API_BASE_URL}/api/v1/courses`; 
// --- END OF IMAGE FIX ---


export default function Course() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch the courses (memoized with useCallback)
    const fetchCourses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Using the defined API_URL constant
            const response = await axios.get(API_URL); 
            // Assuming your API returns an object like { success: true, data: [course1, course2] }
            setCourses(response.data.data || []); 
            setLoading(false);
        } catch (err) {
            console.error("Error fetching courses:", err);
            // Check for specific error status if possible
            const errorMessage = err.response?.data?.message || "Failed to load courses. Is the backend running?";
            setError(errorMessage);
            setLoading(false);
        }
    }, []); // Dependency array is empty, function is created once

    // Fetch data when the component mounts
    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]); // Run once on mount, using fetchCourses as a dependency

    // Handler for Delete button
    const handleDelete = async (id, courseName) => {
        // Confirmation prompt before deletion
        if (window.confirm(`Are you sure you want to delete the course: "${courseName}"?`)) {
            try {
                // Send the DELETE request to the backend API
                await axios.delete(`${API_URL}/${id}`); 
                
                // OPTIMISTIC UPDATE: Remove the course from the local state array immediately
                setCourses(prevCourses => prevCourses.filter(course => course._id !== id));
                
                alert(`Course "${courseName}" deleted successfully!`);

            } catch (err) {
                console.error("Error deleting course:", err);
                const errorMessage = err.response?.data?.message || `Failed to delete ${courseName}.`;
                setError(errorMessage); 
            }
        }
    };

    if (loading) {
        return <p className="p-3 text-info">Loading courses...</p>;
    }

    if (error) {
        return <p className="p-3 text-danger">Error: {error}</p>;
    }
    
    if (courses.length === 0) {
        return (
            <div className='d-flex'>
                <Nav />
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content p-3">
                    <h1 className="h2">Manage Courses</h1>
                    <Link to="/admin/add-course" className="btn btn-success mb-3">Add New Course</Link>
                    <p className="alert alert-warning">No courses found. Start by adding a new course!</p>
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
                   <h1 className="h2">Manage Courses ({courses.length})</h1>
                   <Link to="/admin/add-course" className="btn btn-success">
                       <i className="bi bi-plus-lg"></i> Add New Course
                   </Link>
               </div>

               <div className="dashboard-card">
                   <div className="table-responsive">
                       <table className="table table-striped table-hover">
                           <thead>
                               <tr>
                                   <th scope="col">S.No</th>
                                   <th scope="col">Image</th>
                                   <th scope="col">Course Name</th>
                                   <th scope="col">Details</th>
                                   <th scope="col">Price</th>
                                   <th scope="col">Actions</th>
                               </tr>
                           </thead>
                           <tbody>
                               {courses.map((course, index) => (
                                   <tr key={course._id}>
                                       <th scope="row">{index + 1}</th>
                                       <td>
                                           {/* 🌟 FIX APPLIED HERE: Prepend API_BASE_URL 🌟 */}
                                           <img 
                                               src={
                                                   course.image.startsWith('/') 
                                                       ? `${API_BASE_URL}${course.image}` 
                                                       : `${API_BASE_URL}/uploads/${course.image}`
                                               }
                                               alt={course.coursename} 
                                               style={{width: '60px', height: '40px', objectFit: 'cover'}}
                                               loading="lazy"
                                           />
                                       </td>
                                       <td>{course.coursename}</td>
                                       <td>
                                            {/* Truncate long details for table view */}
                                            {course.coursedetails && course.coursedetails.length > 50 
                                                ? course.coursedetails.substring(0, 50) + '...'
                                                : course.coursedetails}
                                       </td>
                                       <td>${course.price.toFixed(2)}</td>
                                       <td>
                                           <Link 
                                                // This template string is crucial: it sends the unique ID to the update component
                                                to={`/admin/updatecourse/${course._id}`} 
                                                className="btn btn-sm btn-primary me-2"
                                           >
                                                <i className="bi bi-pencil"></i> Update
                                           </Link>
                                           <button 
                                                // Pass course ID AND course name to handleDelete for better user confirmation
                                                onClick={() => handleDelete(course._id, course.coursename)} 
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
