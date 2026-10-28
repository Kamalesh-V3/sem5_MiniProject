import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'submissions'
  const [orders, setOrders] = useState([]);
  const [myArts, setMyArts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, artsRes] = await Promise.all([
        api.get('/orders/my-orders'),
        api.get('/arts/user/my-arts')
      ]);

      if (ordersRes.data.success) setOrders(ordersRes.data.orders);
      if (artsRes.data.success) setMyArts(artsRes.data.arts);
    } catch (err) {
      console.error('Error fetching customer data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="status-badge-pending">Pending</span>;
      case 'Confirmed':
      case 'In Progress':
        return <span className="status-badge-progress">{status}</span>;
      case 'Dispatched':
        return <span className="status-badge-progress">Dispatched 🚚</span>;
      case 'Delivered':
        return <span className="status-badge-delivered">Delivered ✅</span>;
      case 'Cancelled':
        return <span className="status-badge-cancelled">Cancelled</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const getSubmissionBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="status-badge-pending"><i className="bi bi-hourglass-split me-1"></i> Under Admin Review</span>;
      case 'approved':
        return <span className="status-badge-approved"><i className="bi bi-check-circle me-1"></i> Approved & Live</span>;
      case 'rejected':
        return <span className="status-badge-rejected"><i className="bi bi-x-circle me-1"></i> Rejected</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  return (
    <div className="customer-dashboard-page py-5">
      <div className="container">
        {/* User Welcome Banner */}
        <div className="glass-panel p-4 mb-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            <img
              src={user?.avatar && !String(user.avatar).startsWith('http') ? user.avatar : '/images/Profile image/profile-placeholder.svg'}
              alt={user?.username}
              className="rounded-circle"
              style={{ width: '64px', height: '64px', objectFit: 'cover', border: '2px solid rgba(245, 158, 11, 0.4)' }}
            />
            <div>
              <div className="d-flex align-items-center gap-2">
                <h4 className="text-white fw-bold mb-0">@{user?.username}</h4>
                <span className="badge bg-secondary small">{user?.role?.toUpperCase()}</span>
              </div>
              <div className="text-secondary small">{user?.email} • {user?.phone}</div>
            </div>
          </div>

          <div className="d-flex gap-2">
            <Link to="/gallery" className="btn btn-outline-gold btn-sm d-flex align-items-center gap-1">
              <i className="bi bi-compass"></i> Browse Gallery
            </Link>
            <Link to="/post-art" className="btn btn-gold btn-sm d-flex align-items-center gap-1">
              <i className="bi bi-brush"></i> Submit Art to Become Artist
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="d-flex gap-3 mb-4 border-bottom border-secondary border-opacity-25 pb-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`btn btn-link text-decoration-none fw-bold d-flex align-items-center gap-2 ${
              activeTab === 'orders' ? 'text-warning border-bottom border-warning border-2' : 'text-secondary'
            }`}
          >
            <i className="bi bi-box-seam"></i> My Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`btn btn-link text-decoration-none fw-bold d-flex align-items-center gap-2 ${
              activeTab === 'submissions' ? 'text-warning border-bottom border-warning border-2' : 'text-secondary'
            }`}
          >
            <i className="bi bi-cloud-arrow-up"></i> My Art Submissions ({myArts.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status"></div>
          </div>
        ) : activeTab === 'orders' ? (
          /* Orders Tab */
          <div>
            {orders.length === 0 ? (
              <div className="glass-panel p-5 text-center my-3">
                <i className="bi bi-bag-x fs-1 text-secondary mb-3 d-block"></i>
                <h5 className="text-white">No Orders Placed Yet</h5>
                <p className="text-secondary small mb-3">Explore our curated gallery and collect your first original art masterpiece!</p>
                <Link to="/gallery" className="btn btn-gold btn-sm">Explore Gallery</Link>
              </div>
            ) : (
              <div className="row g-4">
                {orders.map((ord) => (
                  <div key={ord._id} className="col-12">
                    <div className="glass-panel p-4">
                      <div className="row align-items-center g-3">
                        <div className="col-md-2 col-sm-3 text-center">
                          <img
                            src={ord.artImage && !String(ord.artImage).startsWith('http') ? ord.artImage : '/images/Art image/artwork-placeholder.svg'}
                            alt={ord.artTitle}
                            className="rounded-3 shadow w-100"
                            style={{ height: '100px', objectFit: 'cover' }}
                            onError={(e) => { e.target.src = '/images/Art image/artwork-placeholder.svg'; }}
                          />
                        </div>
                        <div className="col-md-5 col-sm-9">
                          <span className="text-secondary" style={{ fontSize: '0.75rem' }}>ORDER #{ord.orderNumber}</span>
                          <h5 className="text-white fw-bold mb-1">{ord.artTitle}</h5>
                          <div className="text-secondary small mb-1">Artist: <strong className="text-light">@{ord.artistName}</strong></div>
                          <div className="text-secondary small">
                            Payment: <span className="text-warning fw-semibold">{ord.paymentMode}</span> • ₹{ord.amount}
                            {ord.paymentDetails?.upiRef && (
                              <span className="ms-1 text-muted">(Ref: {ord.paymentDetails.upiRef})</span>
                            )}
                          </div>
                        </div>

                        <div className="col-md-3 col-6">
                          <div className="text-secondary small mb-1">Tracking Status:</div>
                          {getStatusBadge(ord.orderStatus)}
                          <div className="text-secondary small mt-2">
                            Placed on: {new Date(ord.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="col-md-2 col-6 text-end">
                          <Link to={`/art/${ord.art}`} className="btn btn-glass btn-sm w-100 mb-2">
                            View Art
                          </Link>
                        </div>

                        {/* Delivery Address Dropdown Info */}
                        <div className="col-12 pt-2 border-top border-secondary border-opacity-25 small text-secondary">
                          <i className="bi bi-geo-alt me-1 text-warning"></i>
                          Delivery To: <span className="text-light">{ord.customerDetails.fullName}, {ord.customerDetails.address}, {ord.customerDetails.city}, {ord.customerDetails.state} - {ord.customerDetails.pincode} (Tel: {ord.customerDetails.mobile})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Submissions Tab */
          <div>
            {myArts.length === 0 ? (
              <div className="glass-panel p-5 text-center my-3">
                <i className="bi bi-palette fs-1 text-secondary mb-3 d-block"></i>
                <h5 className="text-white">No Artworks Submitted Yet</h5>
                <p className="text-secondary small mb-3">
                  Upload your first artwork to submit your profile for Artist Verification by the Admin!
                </p>
                <Link to="/post-art" className="btn btn-gold btn-sm">Submit Artwork</Link>
              </div>
            ) : (
              <div className="row g-4">
                {myArts.map((art) => (
                  <div key={art._id} className="col-md-6 col-lg-4">
                    <div className="glass-panel p-3 h-100 d-flex flex-column">
                      <div className="position-relative rounded-3 overflow-hidden mb-3" style={{ height: '200px' }}>
                        <img
                          src={art.imageUrl && !String(art.imageUrl).startsWith('http') ? art.imageUrl : '/images/Art image/artwork-placeholder.svg'}
                          alt={art.title}
                          className="w-100 h-100"
                          style={{ objectFit: 'cover' }}
                          onError={(e) => { e.target.src = '/images/Art image/artwork-placeholder.svg'; }}
                        />
                        <div className="position-absolute top-0 start-0 p-2">
                          <span className="badge-category">{art.category}</span>
                        </div>
                      </div>

                      <h5 className="text-white fw-bold mb-1">{art.title}</h5>
                      <div className="text-warning fw-bold mb-2">₹{art.price}</div>
                      <p className="text-secondary small text-truncate-2 mb-3">{art.description}</p>

                      <div className="mt-auto pt-3 border-top border-secondary border-opacity-25">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-secondary small">Status:</span>
                          {getSubmissionBadge(art.status)}
                        </div>
                        {art.status === 'pending' && (
                          <div className="small text-warning mt-2 p-2 rounded" style={{ background: 'rgba(245, 158, 11, 0.1)', fontSize: '0.75rem' }}>
                            <i className="bi bi-info-circle me-1"></i> Waiting for Admin approval. Once approved, you become a verified Artist!
                          </div>
                        )}
                        {art.status === 'rejected' && art.rejectionReason && (
                          <div className="small text-danger mt-2 p-2 rounded" style={{ background: 'rgba(239, 68, 68, 0.1)', fontSize: '0.75rem' }}>
                            Reason: {art.rejectionReason}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
