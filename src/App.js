// src/App.js

import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Public Components
import LandingPage from './components/LandingPage';
import CoursesPage from './components/CoursesPage';
import HowItWorksPage from './components/HowItWorksPage';
import LoginPage from './components/LoginPage';
import LearnMorePage from './components/LearnMorePage';
import SignupPage from './components/SignupPage';
import MentorsPage from './components/MentorsPage';
import PaymentPage from './components/PaymentPage';
import PaymentSuccessfulPage from './components/PaymentSuccessfulPage';
import MyCoursesPage from './components/MyCoursesPage';
import CourseDetailsPage from './components/CourseDetailsPage';

// Admin Components
import Admin from './admin/Admin';
import Nav from './admin/Nav';
import Course from './admin/Course';
import Mentor from './admin/Mentor';
import AddMentor from './admin/AddMentor';
import AddCourse from './admin/AddNewCourse';
import UpdateCourse from './admin/UpdateCourse';
import UpdateMentor from './admin/UpdateMentor'; 

// Image Management Components
import FooterImage from './image/FooterImage';
import UpdateFooterImage from './image/UpdateFooterImage';


// Define the router object with all routes
const router = createBrowserRouter([
    // Public Routes
    { path: "/", element: <LandingPage /> },
    { path: "/courses", element: <CoursesPage /> },
    { path: "/how-it-works", element: <HowItWorksPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/learn-more", element: <LearnMorePage /> },
    { path: "/mentors", element: <MentorsPage /> },
    { path: "/payment", element: <PaymentPage /> },
    { path: "/payment-success", element: <PaymentSuccessfulPage /> },
    { path: "/my-courses", element: <MyCoursesPage /> },
    
    { path: "/course-details/:id", element: <CourseDetailsPage /> },

    // Admin Routes
    { path: "/admin", element: <Admin /> },
    { path: "/admin/nav", element: <Nav /> },
    { path: "/admin/courses", element: <Course /> },
    { path: "/admin/add-course", element: <AddCourse /> },
    { path: "/admin/updatecourse/:id", element: <UpdateCourse /> },
    { path: "/admin/mentors", element: <Mentor /> },
    { path: "/admin/add-mentor", element: <AddMentor /> },
    { path: "/admin/update-mentor/:id", element: <UpdateMentor /> },
    { path: "/admin/footer-image", element: <FooterImage /> },
    { path: "/admin/update-footer-image", element: <UpdateFooterImage /> }
]);

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <RouterProvider router={router} /> 
            </header>
        </div>
    );
}

export default App;
