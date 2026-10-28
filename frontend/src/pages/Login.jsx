import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!loginIdentifier.trim() || !password) {
      setError('Please enter both your Username/Email and Password.');
      return;
    }

    setLoading(true);
    try {
      const data = await login(loginIdentifier.trim(), password);
      const loggedUser = data.user || {};
      const cameFromApp = location.state?.from?.pathname;
      if (cameFromApp && cameFromApp !== '/login' && cameFromApp !== '/signup') {
        navigate(cameFromApp, { replace: true });
      } else if (loggedUser.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else if (loggedUser.role === 'artist' || loggedUser.isArtist) {
        navigate('/artist/dashboard', { replace: true });
      } else {
        navigate('/customer/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Quick fill helper for evaluation convenience
  const handleQuickLogin = (userType) => {
    if (userType === 'admin') {
      setLoginIdentifier('admin');
      setPassword('admin123');
    } else if (userType === 'artist') {
      setLoginIdentifier('aarav_sharma');
      setPassword('artist123');
    } else if (userType === 'customer') {
      setLoginIdentifier('priya_collector');
      setPassword('user123');
    }
  };

  return (
    <div className="login-page py-5 min-vh-80 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="glass-panel p-4 p-md-5">
              {/* Header */}
              <div className="text-center mb-4">
                <span className="fs-1 d-block mb-2">🎨</span>
                <h3 className="text-white fw-bold font-serif mb-1">Welcome Back</h3>
                <p className="text-secondary small">
                  Sign in to browse, like, order artworks, and connect with master artists.
                </p>
              </div>

              {error && (
                <div className="alert alert-danger py-2 small d-flex align-items-center gap-2" role="alert">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Asks Username / Email as ONE input */}
                <div className="mb-3">
                  <label className="form-label-custom">
                    Username or Email <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-secondary text-secondary">
                      <i className="bi bi-person-circle"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-custom"
                      placeholder="e.g. priya_collector or admin@artgallery.com"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                </div>

                {/* Password input */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label-custom mb-0">
                      Password <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-secondary text-secondary">
                      <i className="bi bi-lock-fill"></i>
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control form-control-custom"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      className="btn btn-outline-secondary border-secondary text-secondary"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-gold w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Enter Art Gallery</span>
                      <i className="bi bi-arrow-right"></i>
                    </>
                  )}
                </button>
              </form>

              {/* Demo quick links box */}
              <div className="mt-4 pt-3 border-top border-secondary border-opacity-25">
                <div className="text-center text-secondary small mb-2 fw-semibold">
                  Demo Fast Fill:
                </div>
                <div className="d-flex gap-2 justify-content-center">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('customer')}
                    className="btn btn-glass btn-sm text-info"
                  >
                    Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('artist')}
                    className="btn btn-glass btn-sm text-warning"
                  >
                    Artist
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('admin')}
                    className="btn btn-glass btn-sm text-danger"
                  >
                    Admin
                  </button>
                </div>
              </div>

              {/* Link to Signup */}
              <div className="text-center mt-4">
                <span className="text-secondary small">Don't have an account? </span>
                <Link to="/signup" className="text-warning fw-semibold small text-decoration-none hover-gold">
                  Create an Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
