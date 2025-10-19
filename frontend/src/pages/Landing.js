import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-5 text-center" style={{ maxWidth: "500px" }}>
        <h1 className="mb-3 text-primary">🎓 Welcome to LMS</h1>
        <p className="text-muted mb-4">
          A simple Learning Management System for Students & Tutors.
        </p>

        <div className="d-flex justify-content-center mb-4">
          <div className="btn-group">
            <Link to="/register" className="btn btn-success btn-lg px-4">
              Register
            </Link>
            <Link to="/login" className="btn btn-outline-primary btn-lg px-4">
              Login
            </Link>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-secondary">
            New users can <strong>register</strong> with their role, while existing
            users can <strong>login</strong> to continue.
          </p>
        </div>
      </div>
    </div>
  );
}
