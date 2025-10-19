import React, { useState, useEffect } from 'react';
import api from '../api/axios'; // Your axios instance
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch enrolled courses
    const fetchCourses = async () => {
      try {
        const res = await api.get('/student/courses'); // Adjust endpoint
        setCourses(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Sidebar */}
      <div className="bg-primary text-white p-3" style={{ width: '220px' }}>
        <h4 className="fw-bold">Student Panel</h4>
        <ul className="nav flex-column mt-4">
          <li className="nav-item mb-2">
            <button className="nav-link btn btn-link text-white p-0 text-start">Dashboard</button>
          </li>
          <li className="nav-item mb-2">
            <button className="nav-link btn btn-link text-white p-0 text-start">My Courses</button>
          </li>
          <li className="nav-item mb-2">
            <button className="nav-link btn btn-link text-white p-0 text-start">Progress</button>
          </li>
          <li className="nav-item mb-2">
            <button className="nav-link btn btn-link text-white p-0 text-start">Messages</button>
          </li>
          <li className="nav-item mt-4">
            <button className="nav-link btn btn-link text-white p-0 text-start">Logout</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary">Dashboard</h2>
          <div>
            <span className="me-2">👤 Jane Student</span>
            <button className="btn btn-outline-secondary btn-sm">Account</button>
          </div>
        </div>

        {/* Enrolled Courses */}
        <h5 className="mb-3 text-primary">My Courses</h5>
        {loading ? (
          <p>Loading courses...</p>
        ) : courses.length === 0 ? (
          <p>No courses enrolled yet.</p>
        ) : (
          <div className="row g-3 mb-4">
            {courses.map((course) => (
              <div key={course._id} className="col-md-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h6 className="card-title">{course.title}</h6>
                    <p className="card-text">{course.description.substring(0, 80)}...</p>
                    <button className="btn btn-primary btn-sm">Go to Course</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats / Progress */}
        <h5 className="mb-3 text-primary">Progress Overview</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="card text-center shadow-sm p-3">
              <h6>Courses Completed</h6>
              <h3>3</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center shadow-sm p-3">
              <h6>Certificates Earned</h6>
              <h3>2</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center shadow-sm p-3">
              <h6>Pending Assignments</h6>
              <h3>1</h3>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <h5 className="mt-4 mb-3 text-primary">Notifications</h5>
        <ul className="list-group">
          <li className="list-group-item">New course "React Basics" added.</li>
          <li className="list-group-item">Assignment due tomorrow!</li>
          <li className="list-group-item">Your certificate "JS Fundamentals" is ready.</li>
        </ul>
      </div>
    </div>
  );
}
