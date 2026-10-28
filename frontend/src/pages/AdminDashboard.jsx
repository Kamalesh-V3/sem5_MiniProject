import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'customers' | 'artists' | 'arts' | 'orders'
  const [stats, setStats] = useState(null);
  const [pendingArts, setPendingArts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [artists, setArtists] = useState([]);
  const [allArts, setAllArts] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit User Modal State
  const [editingUser, setEditingUser] = useState(null);
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    phone: '',
    role: '',
    isActive: true
  });

  // Edit Art Modal State
  const [editingArt, setEditingArt] = useState(null);
  const [artFormData, setArtFormData] = useState({
    title: '',
    category: '',
    price: '',
    status: ''
  });

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, pendingRes, custRes, artistRes, artsRes, ordersRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/pending-arts'),
        api.get('/admin/customers'),
        api.get('/admin/artists'),
        api.get('/admin/arts'),
        api.get('/admin/orders')
      ]);

      if (statsRes.data.success) setStats(statsRes.data.stats);
      if (pendingRes.data.success) setPendingArts(pendingRes.data.pendingArts);
      if (custRes.data.success) setCustomers(custRes.data.customers);
      if (artistRes.data.success) setArtists(artistRes.data.artists);
      if (artsRes.data.success) setAllArts(artsRes.data.arts);
      if (ordersRes.data.success) setAllOrders(ordersRes.data.orders);
    } catch (err) {
      console.error('Admin data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // 1. Approve Art Submission & Elevate to Artist
  const handleApproveArt = async (artId) => {
    try {
      const res = await api.put(`/admin/arts/${artId}/approve`);
      if (res.data.success) {
        alert(res.data.message);
        fetchAdminData();
      }
    } catch (err) {
      alert(err.message || 'Failed to approve art');
    }
  };

  // 2. Reject Art Submission
  const handleRejectArt = async (artId) => {
    const reason = prompt('Please enter the reason for rejection (optional):', 'Does not meet current gallery quality standards.');
    if (reason === null) return;

    try {
      const res = await api.put(`/admin/arts/${artId}/reject`, { reason });
      if (res.data.success) {
        alert(res.data.message);
        fetchAdminData();
      }
    } catch (err) {
      alert(err.message || 'Failed to reject art');
    }
  };

  // 3. Edit User Modal & Save
  const openEditUser = (u) => {
    setEditingUser(u);
    setUserFormData({
      username: u.username,
      email: u.email,
      phone: u.phone || '',
      role: u.role,
      isActive: u.isActive !== false
    });
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      const res = await api.put(`/admin/users/${editingUser._id}`, userFormData);
      if (res.data.success) {
        setEditingUser(null);
        fetchAdminData();
      }
    } catch (err) {
      alert(err.message || 'Failed to update user');
    }
  };

  // 4. Delete User
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? All their arts will also be removed.')) return;
    try {
      const res = await api.delete(`/admin/users/${userId}`);
      if (res.data.success) {
        fetchAdminData();
      }
    } catch (err) {
      alert(err.message || 'Failed to delete user');
    }
  };

  // 5. Edit Art Modal & Save
  const openEditArt = (art) => {
    setEditingArt(art);
    setArtFormData({
      title: art.title,
      category: art.category,
      price: art.price,
      status: art.status
    });
  };

  const handleSaveArt = async (e) => {
    e.preventDefault();
    if (!editingArt) return;
    try {
      const res = await api.put(`/arts/${editingArt._id}`, artFormData);
      if (res.data.success) {
        setEditingArt(null);
        fetchAdminData();
      }
    } catch (err) {
      alert(err.message || 'Failed to update art');
    }
  };

  // 6. Delete Art
  const handleDeleteArt = async (artId) => {
    if (!window.confirm('Are you sure you want to permanently delete this artwork?')) return;
    try {
      const res = await api.delete(`/arts/${artId}`);
      if (res.data.success) {
        fetchAdminData();
      }
    } catch (err) {
      alert(err.message || 'Failed to delete artwork');
    }
  };

  // 7. Update Order Status
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await api.put(`/orders/${orderId}/status`, { orderStatus: newStatus });
      if (res.data.success) {
        setAllOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o))
        );
      }
    } catch (err) {
      alert(err.message || 'Failed to update status');
    }
  };

  return (
    <div className="admin-dashboard-page py-5">
      <div className="container">
        {/* Admin Header */}
        <div className="glass-panel p-4 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-danger">ADMINISTRATOR</span>
              <h2 className="text-white fw-bold font-serif mb-0">Platform Administration Control</h2>
            </div>
            <p className="text-secondary small mb-0">
              Manage customers, verify artists, approve artwork submissions, and monitor all platform transactions.
            </p>
          </div>
          <button onClick={fetchAdminData} className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1">
            <i className="bi bi-arrow-clockwise"></i> Refresh Data
          </button>
        </div>

        {/* Overview Stats Row */}
        {stats && (
          <div className="row g-3 mb-4">
            <div className="col-lg-2 col-md-4 col-6">
              <div className="glass-panel p-3 text-center">
                <div className="text-secondary small">Customers</div>
                <div className="fs-3 fw-bold text-white">{stats.customersCount}</div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <div className="glass-panel p-3 text-center">
                <div className="text-secondary small">Verified Artists</div>
                <div className="fs-3 fw-bold text-info">{stats.artistsCount}</div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <div className="glass-panel p-3 text-center">
                <div className="text-secondary small">Pending Approval</div>
                <div className="fs-3 fw-bold text-warning">{stats.pendingArtsCount}</div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <div className="glass-panel p-3 text-center">
                <div className="text-secondary small">Total Artworks</div>
                <div className="fs-3 fw-bold text-white">{stats.totalArts}</div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <div className="glass-panel p-3 text-center">
                <div className="text-secondary small">Total Orders</div>
                <div className="fs-3 fw-bold text-white">{stats.totalOrdersCount}</div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <div className="glass-panel p-3 text-center">
                <div className="text-secondary small">Total Revenue</div>
                <div className="fs-4 fw-bold text-warning">₹{stats.totalRevenue}</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="d-flex flex-wrap gap-2 mb-4 border-bottom border-secondary border-opacity-25 pb-2">
          <button
            onClick={() => setActiveTab('pending')}
            className={`btn btn-sm ${activeTab === 'pending' ? 'btn-gold' : 'btn-glass text-secondary'} d-flex align-items-center gap-2`}
          >
            <i className="bi bi-clock-history"></i> Pending Art Approvals
            {pendingArts.length > 0 && (
              <span className="badge bg-danger rounded-pill">{pendingArts.length}</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`btn btn-sm ${activeTab === 'customers' ? 'btn-gold' : 'btn-glass text-secondary'} d-flex align-items-center gap-2`}
          >
            <i className="bi bi-people"></i> Manage Customers ({customers.length})
          </button>
          <button
            onClick={() => setActiveTab('artists')}
            className={`btn btn-sm ${activeTab === 'artists' ? 'btn-gold' : 'btn-glass text-secondary'} d-flex align-items-center gap-2`}
          >
            <i className="bi bi-brush"></i> Manage Artists ({artists.length})
          </button>
          <button
            onClick={() => setActiveTab('arts')}
            className={`btn btn-sm ${activeTab === 'arts' ? 'btn-gold' : 'btn-glass text-secondary'} d-flex align-items-center gap-2`}
          >
            <i className="bi bi-palette"></i> All Artworks ({allArts.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`btn btn-sm ${activeTab === 'orders' ? 'btn-gold' : 'btn-glass text-secondary'} d-flex align-items-center gap-2`}
          >
            <i className="bi bi-receipt"></i> Platform Orders ({allOrders.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status"></div>
          </div>
        ) : activeTab === 'pending' ? (
          /* TAB 1: PENDING ART SUBMISSIONS (PROMOTES TO ARTIST) */
          <div>
            <h5 className="text-white fw-bold mb-3 d-flex align-items-center gap-2">
              <i className="bi bi-hourglass-split text-warning"></i> Pending Art & Artist Applications
            </h5>

            {pendingArts.length === 0 ? (
              <div className="glass-panel p-5 text-center my-3">
                <i className="bi bi-check-circle fs-1 text-success mb-2 d-block"></i>
                <h5 className="text-white">All Caught Up!</h5>
                <p className="text-secondary small">There are no pending artwork approvals waiting in the queue.</p>
              </div>
            ) : (
              <div className="row g-4">
                {pendingArts.map((art) => (
                  <div key={art._id} className="col-12">
                    <div className="glass-panel p-4">
                      <div className="row align-items-center g-3">
                        <div className="col-md-3 text-center">
                          <img
                            src={art.imageUrl && !String(art.imageUrl).startsWith('http') ? art.imageUrl : '/images/Art image/artwork-placeholder.svg'}
                            alt={art.title}
                            className="rounded-3 shadow w-100"
                            style={{ maxHeight: '180px', objectFit: 'cover' }}
                          />
                        </div>

                        <div className="col-md-5">
                          <span className="badge-category mb-1">{art.category}</span>
                          <h4 className="text-white fw-bold mb-1">{art.title}</h4>
                          <div className="text-warning fw-bold fs-5 mb-2">₹{art.price}</div>
                          <p className="text-secondary small mb-2">{art.description}</p>
                          <div className="small text-secondary">
                            Dimensions: <strong className="text-light">{art.dimensions}</strong>
                          </div>
                        </div>

                        {/* Applicant details */}
                        <div className="col-md-4 border-start border-secondary border-opacity-25 ps-md-4">
                          <div className="small text-secondary mb-1">Submitted by Applicant:</div>
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <strong className="text-white">@{art.user?.username || art.artistUsername}</strong>
                            <span className="badge bg-secondary" style={{ fontSize: '0.7rem' }}>Customer</span>
                          </div>
                          <div className="small text-secondary mb-1">Email: {art.user?.email || 'N/A'}</div>
                          <div className="small text-secondary mb-2">Phone: {art.user?.phone || 'N/A'}</div>

                          {art.artistBankDetails?.accountNumber && (
                            <div className="small text-info mb-2 p-2 rounded" style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                              <div><i className="bi bi-bank me-1"></i> A/C: <strong>{art.artistBankDetails.accountNumber}</strong></div>
                              <div>IFSC: <strong>{art.artistBankDetails.ifsc}</strong> ({art.artistBankDetails.accountHolderName})</div>
                            </div>
                          )}

                          {art.artistUpiId && (
                            <div className="small text-warning mb-2 p-2 rounded" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                              <i className="bi bi-qr-code me-1"></i> UPI: <strong>{art.artistUpiId}</strong>
                            </div>
                          )}

                          {art.artistUpiQr && (
                            <div className="mb-3">
                              <span className="small text-secondary d-block">Submitted Payment QR:</span>
                              <a href={art.artistUpiQr} target="_blank" rel="noopener noreferrer">
                                <img src={art.artistUpiQr} alt="Submitted QR" className="rounded border border-secondary mt-1 p-1 bg-white" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
                              </a>
                            </div>
                          )}

                          {/* Approval Actions */}
                          <div className="d-flex gap-2">
                            <button
                              onClick={() => handleApproveArt(art._id)}
                              className="btn btn-success btn-sm flex-fill d-flex align-items-center justify-content-center gap-1 shadow-sm"
                            >
                              <i className="bi bi-check-lg"></i> Approve & Make Artist
                            </button>
                            <button
                              onClick={() => handleRejectArt(art._id)}
                              className="btn btn-danger btn-sm px-3"
                              title="Reject application"
                            >
                              <i className="bi bi-x-lg"></i> Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeTab === 'customers' ? (
          /* TAB 2: MANAGE CUSTOMERS */
          <div className="glass-panel p-4">
            <h5 className="text-white fw-bold mb-3">Registered Customers Directory</h5>
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle mb-0" style={{ background: 'transparent' }}>
                <thead>
                  <tr className="border-secondary text-secondary small">
                    <th>Username</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Date of Birth</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => (
                    <tr key={c._id} className="border-secondary border-opacity-25">
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={c.avatar || '/images/Profile image/profile-placeholder.svg'}
                            alt={c.username}
                            className="rounded-circle"
                            style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                          />
                          <span className="fw-bold text-white">@{c.username}</span>
                        </div>
                      </td>
                      <td className="small">{c.email}</td>
                      <td className="small">{c.phone}</td>
                      <td className="small">{c.dob || 'N/A'}</td>
                      <td className="small">{c.gender || 'N/A'}</td>
                      <td>
                        <span className={`badge ${c.isActive !== false ? 'bg-success' : 'bg-danger'}`}>
                          {c.isActive !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => openEditUser(c)}
                            className="btn btn-outline-warning btn-sm py-0 px-2"
                            title="Edit customer details"
                          >
                            <i className="bi bi-pencil"></i> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(c._id)}
                            className="btn btn-outline-danger btn-sm py-0 px-2"
                            title="Delete customer"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'artists' ? (
          /* TAB 3: MANAGE ARTISTS */
          <div className="glass-panel p-4">
            <h5 className="text-white fw-bold mb-3">Verified Artists Directory</h5>
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle mb-0" style={{ background: 'transparent' }}>
                <thead>
                  <tr className="border-secondary text-secondary small">
                    <th>Artist</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Total Artworks</th>
                    <th>Total Likes</th>
                    <th>UPI ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {artists.map((a) => (
                    <tr key={a._id} className="border-secondary border-opacity-25">
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={a.avatar || '/images/Profile image/profile-placeholder.svg'}
                            alt={a.username}
                            className="rounded-circle"
                            style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                          />
                          <div>
                            <div className="fw-bold text-white">@{a.username}</div>
                            <span className="badge-artist-verified" style={{ fontSize: '0.65rem' }}>Verified</span>
                          </div>
                        </div>
                      </td>
                      <td className="small">{a.email}</td>
                      <td className="small">{a.phone}</td>
                      <td className="fw-bold text-center">{a.totalArtworks || 0}</td>
                      <td className="fw-bold text-warning text-center">{a.totalLikes || 0}</td>
                      <td className="small text-warning">{a.upiId || 'Not Set'}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link
                            to={`/artist/${a.username}`}
                            className="btn btn-outline-info btn-sm py-0 px-2"
                            title="View artist artworks"
                          >
                            <i className="bi bi-images"></i> Works
                          </Link>
                          <button
                            onClick={() => openEditUser(a)}
                            className="btn btn-outline-warning btn-sm py-0 px-2"
                            title="Edit artist details"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteUser(a._id)}
                            className="btn btn-outline-danger btn-sm py-0 px-2"
                            title="Delete artist"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'arts' ? (
          /* TAB 4: ALL ARTWORKS INVENTORY */
          <div className="glass-panel p-4">
            <h5 className="text-white fw-bold mb-3">All Artworks Inventory</h5>
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle mb-0" style={{ background: 'transparent' }}>
                <thead>
                  <tr className="border-secondary text-secondary small">
                    <th>Artwork</th>
                    <th>Category</th>
                    <th>Artist</th>
                    <th>Price</th>
                    <th>Likes</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allArts.map((art) => (
                    <tr key={art._id} className="border-secondary border-opacity-25">
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={art.imageUrl && !String(art.imageUrl).startsWith('http') ? art.imageUrl : '/images/Art image/artwork-placeholder.svg'}
                            alt={art.title}
                            className="rounded-2 shadow"
                            style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                          />
                          <span className="fw-bold text-white small">{art.title}</span>
                        </div>
                      </td>
                      <td className="small">{art.category}</td>
                      <td className="small">@{art.artistUsername || art.artistName}</td>
                      <td className="fw-bold text-warning small">₹{art.price}</td>
                      <td className="small">{art.likesCount || 0}</td>
                      <td>
                        <span className={`badge ${art.status === 'approved' ? 'bg-success' : art.status === 'pending' ? 'bg-warning text-dark' : 'bg-danger'}`}>
                          {art.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => openEditArt(art)}
                            className="btn btn-outline-warning btn-sm py-0 px-2"
                            title="Edit art"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteArt(art._id)}
                            className="btn btn-outline-danger btn-sm py-0 px-2"
                            title="Delete art"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* TAB 5: ALL PLATFORM ORDERS */
          <div className="glass-panel p-4">
            <h5 className="text-white fw-bold mb-3">Platform Orders Registry</h5>
            {allOrders.length === 0 ? (
              <p className="text-secondary small">No orders recorded on the platform yet.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-dark table-hover align-middle mb-0" style={{ background: 'transparent' }}>
                  <thead>
                    <tr className="border-secondary text-secondary small">
                      <th>Order ID</th>
                      <th>Artwork</th>
                      <th>Artist</th>
                      <th>Buyer / Customer</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      <th>Delivery Destination</th>
                      <th>Order Tracking Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOrders.map((ord) => (
                      <tr key={ord._id} className="border-secondary border-opacity-25">
                        <td className="fw-bold small text-warning">{ord.orderNumber}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={ord.artImage}
                              alt={ord.artTitle}
                              className="rounded-2"
                              style={{ width: '38px', height: '38px', objectFit: 'cover' }}
                            />
                            <span className="small text-white fw-medium">{ord.artTitle}</span>
                          </div>
                        </td>
                        <td className="small">@{ord.artistName}</td>
                        <td>
                          <div className="small fw-bold text-white">{ord.customerDetails?.fullName}</div>
                          <div className="small text-secondary">{ord.customerDetails?.mobile}</div>
                        </td>
                        <td className="fw-bold text-warning small">₹{ord.amount}</td>
                        <td>
                          <span className="badge bg-secondary mb-1">{ord.paymentMode}</span>
                          {ord.paymentDetails?.upiRef && (
                            <div className="small text-secondary" style={{ fontSize: '0.7rem' }}>
                              UTR: {ord.paymentDetails.upiRef}
                            </div>
                          )}
                        </td>
                        <td className="small text-secondary" style={{ maxWidth: '200px' }}>
                          {ord.customerDetails?.address}, {ord.customerDetails?.city} ({ord.customerDetails?.pincode})
                        </td>
                        <td>
                          <select
                            className="form-select form-select-custom form-select-sm"
                            style={{ minWidth: '130px' }}
                            value={ord.orderStatus}
                            onChange={(e) => handleUpdateOrderStatus(ord._id, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Edit User Modal */}
        {editingUser && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content text-white" style={{ background: '#121626', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="modal-header border-secondary border-opacity-25">
                  <h5 className="modal-title fw-bold">Edit User Details</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setEditingUser(null)}></button>
                </div>
                <form onSubmit={handleSaveUser}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label-custom">Username</label>
                      <input
                        type="text"
                        className="form-control form-control-custom"
                        value={userFormData.username}
                        onChange={(e) => setUserFormData({ ...userFormData, username: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label-custom">Email</label>
                      <input
                        type="email"
                        className="form-control form-control-custom"
                        value={userFormData.email}
                        onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label-custom">Phone</label>
                      <input
                        type="text"
                        className="form-control form-control-custom"
                        value={userFormData.phone}
                        onChange={(e) => setUserFormData({ ...userFormData, phone: e.target.value })}
                      />
                    </div>
                    <div className="row g-2">
                      <div className="col-6">
                        <label className="form-label-custom">Role</label>
                        <select
                          className="form-select form-select-custom"
                          value={userFormData.role}
                          onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
                        >
                          <option value="customer">Customer</option>
                          <option value="artist">Artist</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <div className="col-6">
                        <label className="form-label-custom">Status</label>
                        <select
                          className="form-select form-select-custom"
                          value={userFormData.isActive ? 'active' : 'inactive'}
                          onChange={(e) => setUserFormData({ ...userFormData, isActive: e.target.value === 'active' })}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Suspended / Deactivated</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer border-secondary border-opacity-25">
                    <button type="button" className="btn btn-glass btn-sm" onClick={() => setEditingUser(null)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-gold btn-sm">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Art Modal */}
        {editingArt && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content text-white" style={{ background: '#121626', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="modal-header border-secondary border-opacity-25">
                  <h5 className="modal-title fw-bold">Edit Artwork (Admin)</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setEditingArt(null)}></button>
                </div>
                <form onSubmit={handleSaveArt}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label-custom">Title</label>
                      <input
                        type="text"
                        className="form-control form-control-custom"
                        value={artFormData.title}
                        onChange={(e) => setArtFormData({ ...artFormData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <label className="form-label-custom">Category</label>
                        <input
                          type="text"
                          className="form-control form-control-custom"
                          value={artFormData.category}
                          onChange={(e) => setArtFormData({ ...artFormData, category: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label-custom">Price (₹)</label>
                        <input
                          type="number"
                          className="form-control form-control-custom"
                          value={artFormData.price}
                          onChange={(e) => setArtFormData({ ...artFormData, price: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label-custom">Status</label>
                      <select
                        className="form-select form-select-custom"
                        value={artFormData.status}
                        onChange={(e) => setArtFormData({ ...artFormData, status: e.target.value })}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved (Live)</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer border-secondary border-opacity-25">
                    <button type="button" className="btn btn-glass btn-sm" onClick={() => setEditingArt(null)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-gold btn-sm">Update Artwork</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
