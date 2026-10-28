import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, roleRequired }) {
  const { user, loading, isAuthenticated, isArtist, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center py-5 min-vh-50">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequired === 'admin' && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (roleRequired === 'artist' && !isArtist && !isAdmin) {
    return <Navigate to="/customer/dashboard" replace />;
  }

  return children;
}
