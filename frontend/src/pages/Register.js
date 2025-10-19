import React, { useState } from "react";
import api from "../api/axios"; // uses your axios instance
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // change URL if your backend route is different (e.g. /api/auth/register)
      const res = await api.post("http://localhost:5000/api/register", formData);

      if (res.data.token) {
        alert("✅ Registration successful!");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);

        if (res.data.user.role === "tutor") {
          navigate("/tutor");
        } else {
          navigate("/student");
        }
      } else {
        alert(res.data.msg || "Registration failed. Try again.");
      }
    } catch (err) {
      // show useful info for debugging
      console.error("Register error:", err.response?.status, err.response?.data || err.message);
      alert(err.response?.data?.message || `Registration failed (${err.response?.status || err.message})`);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "420px",
          borderRadius: "15px",
          backgroundColor: "#ffffff",
        }}
      >
        <h3 className="text-center mb-3 text-primary fw-bold">
          🎓 LMS Registration
        </h3>
        <p className="text-center text-muted mb-4">
          Create your account to get started
        </p>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Select Role</label>
            <select
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">🎓 Student</option>
              <option value="tutor">👨‍🏫 Tutor</option>
            </select>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold mt-2"
          >
            Register
          </button>

          {/* Already have account */}
          <div className="text-center mt-3">
            <small className="text-muted">
              Already registered?{" "}
              <a href="/login" className="text-decoration-none text-primary">
                Login here
              </a>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}
