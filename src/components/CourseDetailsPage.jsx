import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './CourseDetailsPage.css';

const CourseDetailsPage = () => {
    // This hook gets the 'id' from the URL (e.g., /course-details/1)
    const { id } = useParams();

    // Dummy data for a single course
    const course = {
        id: 1,
        title: 'Full-Stack JavaScript',
        instructor: 'John Doe',
        description: 'Learn to build powerful web applications from front to back, using modern JavaScript frameworks and tools.',
        modules: [
            {
                id: 1,
                title: 'Introduction to Web Development',
                lessons: [
                    { id: 1, title: 'What is a Web Developer?' },
                    { id: 2, title: 'Setting Up Your Environment' },
                ],
            },
            {
                id: 2,
                title: 'Front-End Fundamentals',
                lessons: [
                    { id: 3, title: 'HTML & CSS Basics' },
                    { id: 4, title: 'JavaScript Essentials' },
                ],
            },
        ],
    };

    return (
        <div className="course-details-page-container">
            <header className="course-header">
                <Link to="/my-courses" className="back-link">
                    ← Back to My Courses
                </Link>
                <h1>{course.title}</h1>
                <p className="instructor">By {course.instructor}</p>
                <p className="description">{course.description}</p>
            </header>

            <div className="course-content">
                <h2>Course Curriculum</h2>
                {course.modules.map((module) => (
                    <div key={module.id} className="course-module">
                        <h3>{module.title}</h3>
                        <ul className="lesson-list">
                            {module.lessons.map((lesson) => (
                                <li key={lesson.id} className="lesson-item">
                                    <span>{lesson.title}</span>
                                    <button className="btn start-lesson-btn">
                                        Start Lesson
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseDetailsPage;
