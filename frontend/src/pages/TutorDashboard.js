import React, { useState } from 'react';
import api from '../api/axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TutorDashboard() {
  const [form, setForm] = useState({ title: '', description: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');

    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('description', form.description);
    fd.append('file', file);

    try {
      setLoading(true);
      await api.post('/courses/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('✅ Course uploaded successfully!');
      setForm({ title: '', description: '' });
      setFile(null);
    } catch (err) {
      console.error(err);
      alert('❌ Upload failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Sidebar */}
      <div className="bg-primary text-white p-3" style={{ width: '220px' }}>
        <h4 className="fw-bold">Tutor Panel</h4>
        <ul className="nav flex-column mt-4">
          <li className="nav-item mb-2">
            <button className="nav-link btn btn-link text-white p-0 text-start">Dashboard</button>
          </li>
          <li className="nav-item mb-2">
            <button className="nav-link btn btn-link text-white p-0 text-start">My Courses</button>
          </li>
          <li className="nav-item mb-2">
            <button className="nav-link btn btn-link text-white p-0 text-start">Profile</button>
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
            <span className="me-2">👤 John Tutor</span>
            <button className="btn btn-outline-secondary btn-sm">Account</button>
          </div>
        </div>

        {/* Upload Card */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="card-title text-primary mb-3">Upload New Course</h5>
            <form onSubmit={submit}>
              <input
                className="form-control mb-3"
                placeholder="Course Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <textarea
                className="form-control mb-3"
                placeholder="Course Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
              <input
                type="file"
                className="form-control mb-2"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
              {file && <div className="small text-muted mb-2">Selected: {file.name}</div>}
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Uploading...' : '📤 Upload Course'}
              </button>
            </form>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-3">
          <div className="col-md-4">
            <div className="card text-center shadow-sm p-3">
              <h6>Courses Uploaded</h6>
              <h3>12</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center shadow-sm p-3">
              <h6>Rewards</h6>
              <h3>5</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center shadow-sm p-3">
              <h6>Certificates</h6>
              <h3>3</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
