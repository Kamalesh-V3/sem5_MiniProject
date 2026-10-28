import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'Male',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!formData.username || !formData.email || !formData.phone || !formData.dob || !formData.password) {
      setError('Please fill in all the required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      await signup(formData);
      navigate('/customer/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page py-5 min-vh-80 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9">
            <div className="glass-panel p-4 p-md-5">
              {/* Header */}
              <div className="text-center mb-4">
                <span className="fs-1 d-block mb-2">✨</span>
                <h3 className="text-white fw-bold font-serif mb-1">Create Collector & Artist Account</h3>
                <p className="text-secondary small">
                  Join CanvasCraft to explore, like, buy original art, or submit your own works to become a verified artist.
                </p>
              </div>

              {error && (
                <div className="alert alert-danger py-2 small d-flex align-items-center gap-2" role="alert">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Username */}
                  <div className="col-md-6">
                    <label className="form-label-custom">
                      Username <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent border-secondary text-secondary">@</span>
                      <input
                        type="text"
                        name="username"
                        className="form-control form-control-custom"
                        placeholder="e.g. rahul_art"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label className="form-label-custom">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent border-secondary text-secondary">
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-custom"
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="col-md-6">
                    <label className="form-label-custom">
                      Mobile Number <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent border-secondary text-secondary">
                        <i className="bi bi-telephone"></i>
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control form-control-custom"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="col-md-6">
                    <label className="form-label-custom">
                      Date of Birth <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent border-secondary text-secondary">
                        <i className="bi bi-calendar3"></i>
                      </span>
                      <input
                        type="date"
                        name="dob"
                        className="form-control form-control-custom"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="col-12">
                    <label className="form-label-custom">
                      Gender <span className="text-danger">*</span>
                    </label>
                    <select
                      name="gender"
                      className="form-select form-select-custom"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  {/* Password */}
                  <div className="col-md-6">
                    <label className="form-label-custom">
                      Password <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent border-secondary text-secondary">
                        <i className="bi bi-lock"></i>
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className="form-control form-control-custom"
                        placeholder="At least 6 characters"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="col-md-6">
                    <label className="form-label-custom">
                      Confirm Password <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent border-secondary text-secondary">
                        <i className="bi bi-shield-check"></i>
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        className="form-control form-control-custom"
                        placeholder="Repeat your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input bg-dark border-secondary"
                        type="checkbox"
                        id="showPassCheck"
                        checked={showPassword}
                        onChange={(e) => setShowPassword(e.target.checked)}
                      />
                      <label className="form-check-label text-secondary small" htmlFor="showPassCheck">
                        Show Passwords
                      </label>
                    </div>
                  </div>

                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      className="btn btn-gold w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <span>Register as Customer</span>
                          <i className="bi bi-arrow-right"></i>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {/* Link to Login */}
              <div className="text-center mt-4">
                <span className="text-secondary small">Already have an account? </span>
                <Link to="/login" className="text-warning fw-semibold small text-decoration-none hover-gold">
                  Sign In Here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
