import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Gallery from './pages/Gallery';
import ArtDetails from './pages/ArtDetails';
import ArtistProfile from './pages/ArtistProfile';
import PostArt from './pages/PostArt';
import OrderArt from './pages/OrderArt';
import CustomerDashboard from './pages/CustomerDashboard';
import ArtistDashboard from './pages/ArtistDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/art/:id" element={<ArtDetails />} />
              <Route path="/artist/:identifier" element={<ArtistProfile />} />

              {/* Protected Routes for Registered Users / Customers */}
              <Route
                path="/post-art"
                element={
                  <ProtectedRoute>
                    <PostArt />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/:artId"
                element={
                  <ProtectedRoute>
                    <OrderArt />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/dashboard"
                element={
                  <ProtectedRoute>
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Protected Routes for Artists */}
              <Route
                path="/artist/dashboard"
                element={
                  <ProtectedRoute roleRequired="artist">
                    <ArtistDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Protected Routes for Admin */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute roleRequired="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
