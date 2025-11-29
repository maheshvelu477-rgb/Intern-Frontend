// src/admin/Nav.jsx

import React from 'react';
import { Link, useLocation } from "react-router-dom"; 
import '../css/main.css';

export default function Nav() {
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) => currentPath.startsWith(path);

    return (
        <>
            <nav id="sidebar" className="col-md-3 col-lg-2 d-none d-md-block sidebar-container">
                <div className="position-sticky pt-3">
                    <div className="sidebar-brand">
                        <Link to='/admin'><i className="bi bi-gear-fill"></i> Admin</Link>
                    </div>
                    <ul className="nav flex-column sidebar-menu">
                        {/* Dashboard Link */}
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${isActive('/admin') && !isActive('/admin/courses') && !isActive('/admin/mentors') ? 'active' : ''}`} 
                                aria-current={isActive('/admin') ? 'page' : undefined} 
                                to="/admin" 
                            >
                                <i className="bi bi-speedometer"></i> Dashboard
                            </Link>
                        </li>
                        
                        {/* Courses Link */}
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${isActive('/admin/courses') ? 'active' : ''}`} 
                                aria-current={isActive('/admin/courses') ? 'page' : undefined} 
                                to="/admin/courses"
                            >
                                <i className="bi bi-book"></i> Courses
                            </Link>
                        </li>

                        {/* Mentors Link */}
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${isActive('/admin/mentors') ? 'active' : ''}`}
                                aria-current={isActive('/admin/mentors') ? 'page' : undefined} 
                                to='/admin/mentors' 
                            >
                                <i className="bi bi-people"></i> Mentors
                            </Link>
                        </li>
                    
                    </ul>
                </div>
            </nav>
        </>
    );
}
