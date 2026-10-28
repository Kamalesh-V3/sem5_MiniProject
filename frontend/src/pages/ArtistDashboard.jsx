import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import { localMediaUrl, onLocalImageError } from '../utils/localImage';

export default function ArtistDashboard() {
  const { user, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState('orders'); // 'artworks' | 'orders' | 'settings'
  const [arts, setArts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderFilter, setOrderFilter] = useState('all');
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  // Edit Art Modal State
  const [editingArt, setEditingArt] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    category: '',
    dimensions: '',
    price: ''
  });
  const [savingEdit, setSavingEdit] = useState(false);

  // Profile Settings State
  const [settingsPaymentMethod, setSettingsPaymentMethod] = useState('uploadQr'); // 'uploadQr' | 'bankAccount'
  const [settingsQrFile, setSettingsQrFile] = useState(null);
  const [settingsQrPreview, setSettingsQrPreview] = useState(user?.upiQr || '');

  const [bankData, setBankData] = useState({
    accountNumber: user?.bankDetails?.accountNumber || '',
    confirmAccountNumber: user?.bankDetails?.accountNumber || '',
    ifsc: user?.bankDetails?.ifsc || '',
    accountHolderName: user?.bankDetails?.accountHolderName || user?.username || '',
    bankName: user?.bankDetails?.bankName || ''
  });
  const [bankConvertedQrUrl, setBankConvertedQrUrl] = useState('');
  const [bankConversionSuccess, setBankConversionSuccess] = useState(false);

  const [profileData, setProfileData] = useState({
    upiId: user?.upiId || '',
    upiQr: user?.upiQr || '',
    bio: user?.bio || '',
    phone: user?.phone || ''
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState('');
  const [settingsError, setSettingsError] = useState('');

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [artsRes, ordersRes] = await Promise.allSettled([
        api.get('/arts/my-arts'),
        api.get('/orders/artist-orders')
      ]);

      if (artsRes.status === 'fulfilled' && artsRes.value.data.success) {
        setArts(artsRes.value.data.arts || []);
      }
      if (ordersRes.status === 'fulfilled' && ordersRes.value.data.success) {
        setOrders(ordersRes.value.data.orders || []);
      }
    } catch (err) {
      console.error('Artist dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalLikes = arts.reduce((acc, curr) => acc + (curr.likesCount || 0), 0);
  const totalRevenue = orders.reduce((sum, curr) => sum + (curr.amount || 0), 0);

  // Handle Edit Art Modal
  const openEditModal = (art) => {
    setEditingArt(art);
    setEditFormData({
      title: art.title,
      description: art.description,
      category: art.category,
      dimensions: art.dimensions || '24 x 36 inches',
      price: art.price
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingArt) return;
    setSavingEdit(true);
    try {
      const res = await api.put(`/arts/${editingArt._id}`, editFormData);
      if (res.data.success) {
        setArts((prev) =>
          prev.map((a) => (a._id === editingArt._id ? res.data.art : a))
        );
        setEditingArt(null);
      }
    } catch (err) {
      alert(err.message || 'Failed to update artwork');
    } finally {
      setSavingEdit(false);
    }
  };

  // Handle Delete Art
  const handleDeleteArt = async (artId) => {
    if (!window.confirm('Are you sure you want to delete this artwork? This action cannot be undone.')) {
      return;
    }
    try {
      const res = await api.delete(`/arts/${artId}`);
      if (res.data.success) {
        setArts((prev) => prev.filter((a) => a._id !== artId));
      }
    } catch (err) {
      alert(err.message || 'Failed to delete artwork');
    }
  };

  // Handle Order Status & Payment Status Update
  const handleUpdateOrderStatus = async (orderId, newStatus, newPaymentStatus) => {
    setUpdatingOrderId(orderId);
    try {
      const payload = {};
      if (newStatus) payload.orderStatus = newStatus;
      if (newPaymentStatus) payload.paymentStatus = newPaymentStatus;

      const res = await api.put(`/orders/${orderId}/status`, payload);
      if (res.data.success) {
        setOrders((prev) =>
          prev.map((o) => {
            if (o._id === orderId) {
              return {
                ...o,
                ...(newStatus ? { orderStatus: newStatus } : {}),
                paymentDetails: {
                  ...o.paymentDetails,
                  ...(newPaymentStatus ? { paymentStatus: newPaymentStatus } : {})
                }
              };
            }
            return o;
          })
        );
      }
    } catch (err) {
      alert(err.message || 'Failed to update order status');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // Convert Bank Account to Real QR in Settings
  const handleConvertBankToRealQrInSettings = () => {
    setSettingsError('');
    const acc = bankData.accountNumber.trim();
    const ifsc = bankData.ifsc.trim().toUpperCase();
    const name = bankData.accountHolderName.trim() || user?.username || 'Artist';

    if (!acc || acc.length < 8) {
      setSettingsError('Please enter a valid bank account number (at least 8 digits).');
      return;
    }
    if (bankData.confirmAccountNumber && acc !== bankData.confirmAccountNumber.trim()) {
      setSettingsError('Account numbers do not match. Please verify.');
      return;
    }
    if (!ifsc || ifsc.length !== 11) {
      setSettingsError('Please enter an 11-character bank IFSC code (e.g. SBIN0001234, HDFC0000128).');
      return;
    }

    setBankConvertedQrUrl('/images/QR image/qr-placeholder.svg');
    setBankConversionSuccess(false);
    setSettingsError('For a scannable payment QR, upload the QR image from your images/QR image folder. Bank details are saved separately.');
  };

  // Handle Profile / UPI Settings Save
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setSettingsMsg('');
    setSettingsError('');

    try {
      const data = new FormData();
      if (profileData.upiId) data.append('upiId', profileData.upiId.trim());
      if (profileData.bio) data.append('bio', profileData.bio);
      if (profileData.phone) data.append('phone', profileData.phone.trim());

      if (settingsPaymentMethod === 'uploadQr') {
        if (settingsQrFile) {
          data.append('upiQrImage', settingsQrFile);
        } else if (settingsQrPreview) {
          data.append('upiQr', settingsQrPreview);
        }
      } else if (settingsPaymentMethod === 'bankAccount') {
        if (bankConvertedQrUrl) {
          data.append('upiQr', bankConvertedQrUrl);
        }
        data.append('bankDetails[accountNumber]', bankData.accountNumber.trim());
        data.append('bankDetails[ifsc]', bankData.ifsc.trim().toUpperCase());
        data.append('bankDetails[accountHolderName]', bankData.accountHolderName.trim());
        data.append('bankDetails[bankName]', bankData.bankName.trim());
      }

      const res = await api.put('/auth/profile', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        setSettingsMsg('Artist profile & payment credentials updated successfully!');
        await refreshUser();
      }
    } catch (err) {
      setSettingsError(err.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const filteredOrders = orders.filter(o => {
    if (orderFilter === 'all') return true;
    return o.orderStatus === orderFilter;
  });

  return (
    <div className="artist-dashboard py-5">
      <div className="container">
        {/* Top Header */}
        <div className="glass-panel p-4 mb-4">
          <div className="row align-items-center g-3">
            <div className="col-md-7 d-flex align-items-center gap-3">
              <img
                src={localMediaUrl(user?.avatar, 'profile')}
                alt={user?.username}
                className="rounded-circle"
                style={{ width: '80px', height: '80px', objectFit: 'cover', border: '2px solid rgba(245, 158, 11, 0.45)' }}
                onError={(e) => onLocalImageError(e, 'profile')}
              />
              <div>
                <div className="d-flex align-items-center gap-2">
                  <h3 className="text-white fw-bold mb-0">@{user?.username}</h3>
                  <span className="badge-artist-verified">
                    <i className="bi bi-patch-check-fill text-info"></i> Verified Artist
                  </span>
                </div>
                <div className="text-secondary small mt-1">
                  UPI: <strong className="text-warning">{user?.upiId || 'Configured via Bank / QR'}</strong>
                </div>
              </div>
            </div>

            <div className="col-md-5 d-flex gap-2 justify-content-md-end">
              <Link to="/artist/dashboard" className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1">
                <i className="bi bi-speedometer2"></i> Artist Dashboard
              </Link>
              <Link to="/post-art" className="btn btn-gold btn-sm d-flex align-items-center gap-1">
                <i className="bi bi-plus-lg"></i> Post New Art
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="row g-3 mb-4">
          <div className="col-lg-3 col-6">
            <div className="glass-panel p-3 text-center">
              <i className="bi bi-palette text-warning fs-3 mb-1 d-block"></i>
              <div className="fs-3 fw-bold text-white">{arts.length}</div>
              <div className="text-secondary small">Total Artworks</div>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div className="glass-panel p-3 text-center">
              <i className="bi bi-heart-fill text-danger fs-3 mb-1 d-block"></i>
              <div className="fs-3 fw-bold text-white">{totalLikes}</div>
              <div className="text-secondary small">Total Likes Received</div>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div
              className="glass-panel p-3 text-center"
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveTab('orders')}
              title="Click to view and manage customer orders"
            >
              <i className="bi bi-bag-check text-info fs-3 mb-1 d-block"></i>
              <div className="fs-3 fw-bold text-white">{orders.length}</div>
              <div className="text-secondary small">Customer Orders Received</div>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div className="glass-panel p-3 text-center">
              <i className="bi bi-currency-rupee text-success fs-3 mb-1 d-block"></i>
              <div className="fs-3 fw-bold text-warning">₹{totalRevenue}</div>
              <div className="text-secondary small">Total Sales Volume</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="d-flex gap-3 mb-4 border-bottom border-secondary border-opacity-25 pb-2">
          <button
            onClick={() => setActiveTab('artworks')}
            className={`btn btn-link text-decoration-none fw-bold d-flex align-items-center gap-2 ${activeTab === 'artworks' ? 'text-warning border-bottom border-warning border-2' : 'text-secondary'
              }`}
          >
            <i className="bi bi-images"></i> My Artworks ({arts.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`btn btn-link text-decoration-none fw-bold d-flex align-items-center gap-2 ${activeTab === 'orders' ? 'text-warning border-bottom border-warning border-2' : 'text-secondary'
              }`}
          >
            <i className="bi bi-receipt"></i> Orders For My Art ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`btn btn-link text-decoration-none fw-bold d-flex align-items-center gap-2 ${activeTab === 'settings' ? 'text-warning border-bottom border-warning border-2' : 'text-secondary'
              }`}
          >
            <i className="bi bi-gear"></i> Payment & Profile Settings
          </button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status"></div>
          </div>
        ) : activeTab === 'artworks' ? (
          /* Artworks Management Tab */
          <div>
            {arts.length === 0 ? (
              <div className="glass-panel p-5 text-center my-3">
                <i className="bi bi-palette fs-1 text-secondary mb-3 d-block"></i>
                <h5 className="text-white">No Artworks in Portfolio</h5>
                <p className="text-secondary small mb-3">Upload your artworks to start selling and receiving direct payments!</p>
                <Link to="/post-art" className="btn btn-gold btn-sm">Post First Art</Link>
              </div>
            ) : (
              <div className="row g-4">
                {arts.map((art) => (
                  <div key={art._id} className="col-md-6 col-lg-4">
                    <div className="glass-panel p-3 h-100 d-flex flex-column">
                      <div className="position-relative rounded-3 overflow-hidden mb-3" style={{ height: '220px' }}>
                        <img
                          src={localMediaUrl(art.imageUrl, 'art')}
                          alt={art.title}
                          className="w-100 h-100"
                          style={{ objectFit: 'cover' }}
                          onError={(e) => onLocalImageError(e, 'art')}
                        />
                        <div className="position-absolute top-0 start-0 p-2">
                          <span className="badge-category">{art.category}</span>
                        </div>
                        <div className="position-absolute top-0 end-0 p-2">
                          <span className="badge bg-dark bg-opacity-75 text-warning fw-bold">
                            <i className="bi bi-heart-fill text-danger me-1"></i>
                            {art.likesCount || 0}
                          </span>
                        </div>
                      </div>

                      <h5 className="text-white fw-bold mb-1">{art.title}</h5>
                      <div className="text-warning fw-bold fs-5 mb-2">₹{art.price}</div>
                      <p className="text-secondary small text-truncate-2 mb-3">{art.description}</p>

                      <div className="mt-auto pt-3 border-top border-secondary border-opacity-25 d-flex gap-2">
                        <button
                          onClick={() => openEditModal(art)}
                          className="btn btn-outline-warning btn-sm flex-fill d-flex align-items-center justify-content-center gap-1"
                        >
                          <i className="bi bi-pencil-square"></i> Edit Details
                        </button>
                        <button
                          onClick={() => handleDeleteArt(art._id)}
                          className="btn btn-outline-danger btn-sm px-3"
                          title="Delete artwork"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeTab === 'orders' ? (
          /* Customer Orders Management Tab */
          <div>
            {/* Filter Bar */}
            <div className="d-flex flex-wrap gap-2 mb-4 align-items-center">
              <span className="text-secondary small fw-bold me-1">Filter Orders:</span>
              {['all', 'Pending', 'Confirmed', 'In Progress', 'Dispatched', 'Delivered', 'Cancelled'].map((f) => (
                <button
                  key={f}
                  onClick={() => setOrderFilter(f)}
                  className={`btn btn-sm ${orderFilter === f ? 'btn-warning fw-bold' : 'btn-glass text-secondary'
                    }`}
                >
                  {f === 'all' ? `All (${orders.length})` : f}
                </button>
              ))}
            </div>

            {filteredOrders.length === 0 ? (
              <div className="glass-panel p-5 text-center my-3">
                <i className="bi bi-inbox fs-1 text-secondary mb-3 d-block"></i>
                <h5 className="text-white">No Orders Matching Filter</h5>
                <p className="text-secondary small">
                  {orders.length === 0
                    ? 'When customers order your artwork, their details and shipping information will appear here.'
                    : `No orders currently found in "${orderFilter}" status.`}
                </p>
              </div>
            ) : (
              <div className="row g-4">
                {filteredOrders.map((ord) => (
                  <div key={ord._id} className="col-12">
                    <div className="glass-panel p-4">
                      <div className="row g-3 align-items-center">
                        {/* Artwork Preview */}
                        <div className="col-md-2 col-sm-3 text-center">
                          <img
                            src={localMediaUrl(ord.artImage, 'art')}
                            alt={ord.artTitle}
                            className="rounded-3 shadow w-100"
                            style={{ height: '110px', objectFit: 'cover' }}
                            onError={(e) => onLocalImageError(e, 'art')}
                          />
                        </div>

                        {/* Order & Artwork Details */}
                        <div className="col-md-4 col-sm-9">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <span className="badge bg-secondary" style={{ fontSize: '0.75rem' }}>{ord.orderNumber}</span>
                            <span className="text-secondary small">{new Date(ord.createdAt).toLocaleDateString()}</span>
                          </div>
                          <h5 className="text-white fw-bold mb-1">{ord.artTitle}</h5>
                          <div className="text-warning fw-bold mb-2">Sale Amount: ₹{ord.amount}</div>

                          <div className="p-2 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <div className="small text-secondary mb-1">
                              Payment Mode: <strong className="text-light">{ord.paymentMode}</strong>
                              <span className={`badge ms-2 ${ord.paymentDetails?.paymentStatus === 'Paid' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                {ord.paymentDetails?.paymentStatus || 'Pending Verification'}
                              </span>
                            </div>

                            {ord.paymentDetails?.upiRef && (
                              <div className="small text-light font-monospace mb-1">
                                UTR: <strong>{ord.paymentDetails.upiRef}</strong>
                              </div>
                            )}

                            {ord.paymentDetails?.paymentProof && (
                              <button
                                type="button"
                                onClick={() => setSelectedReceipt(ord.paymentDetails.paymentProof)}
                                className="btn btn-outline-info btn-xs py-0 px-2 mt-1"
                                style={{ fontSize: '0.72rem' }}
                              >
                                <i className="bi bi-receipt me-1"></i> View Receipt Screenshot
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Customer Delivery Details */}
                        <div className="col-md-3 col-sm-6">
                          <div className="text-secondary small mb-1">Customer / Shipping To:</div>
                          <div className="text-white fw-bold small">{ord.customerDetails?.fullName}</div>
                          <div className="text-secondary small mb-1">
                            <a href={`tel:${ord.customerDetails?.mobile}`} className="text-warning text-decoration-none">
                              <i className="bi bi-telephone-fill me-1"></i>{ord.customerDetails?.mobile}
                            </a>
                          </div>
                          <div className="text-secondary small lh-sm">
                            {ord.customerDetails?.address}, {ord.customerDetails?.city}, {ord.customerDetails?.state} - {ord.customerDetails?.pincode}
                          </div>
                          {ord.customerDetails?.notes && (
                            <div className="mt-1 small text-info fst-italic">
                              Notes: "{ord.customerDetails.notes}"
                            </div>
                          )}
                        </div>

                        {/* Order Management Controls */}
                        <div className="col-md-3 col-sm-6 text-md-end">
                          <div className="mb-2">
                            <label className="text-secondary small d-block mb-1">Update Order Status:</label>
                            <select
                              className="form-select form-select-custom form-select-sm"
                              value={ord.orderStatus}
                              disabled={updatingOrderId === ord._id}
                              onChange={(e) => handleUpdateOrderStatus(ord._id, e.target.value)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed (Accepted)</option>
                              <option value="In Progress">In Progress (Packing)</option>
                              <option value="Dispatched">Dispatched (Shipped 🚚)</option>
                              <option value="Delivered">Delivered (Completed ✅)</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>

                          {/* Quick Payment Verification Toggle */}
                          <div className="mt-2">
                            {ord.paymentDetails?.paymentStatus !== 'Paid' ? (
                              <button
                                onClick={() => handleUpdateOrderStatus(ord._id, null, 'Paid')}
                                disabled={updatingOrderId === ord._id}
                                className="btn btn-outline-success btn-sm w-100 py-1 d-flex align-items-center justify-content-center gap-1"
                              >
                                <i className="bi bi-check-circle"></i> Verify & Mark as Paid
                              </button>
                            ) : (
                              <div className="text-success small fw-semibold">
                                <i className="bi bi-patch-check-fill me-1"></i> Payment Verified
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Profile & Payment Settings Tab */
          <div className="glass-panel p-4" style={{ maxWidth: '750px', margin: '0 auto' }}>
            <h5 className="text-white fw-bold mb-3 d-flex align-items-center gap-2">
              <i className="bi bi-wallet2 text-warning"></i> Artist Payment & Profile Settings
            </h5>

            {settingsMsg && (
              <div className="alert alert-success py-2 small d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-check-circle-fill"></i>
                <span>{settingsMsg}</span>
              </div>
            )}
            {settingsError && (
              <div className="alert alert-danger py-2 small d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-exclamation-triangle-fill"></i>
                <span>{settingsError}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile}>
              {/* Payment Credentials Setup (No Auto-Generate) */}
              <div className="mb-4 p-3 rounded-3" style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                <label className="form-label-custom mb-2">
                  Customer Payment Method:
                </label>
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <button
                      type="button"
                      className={`btn w-100 p-2 text-start rounded-3 border small ${settingsPaymentMethod === 'uploadQr'
                          ? 'btn-outline-warning border-warning bg-warning bg-opacity-10 text-white'
                          : 'btn-outline-secondary border-secondary border-opacity-25 text-secondary'
                        }`}
                      onClick={() => setSettingsPaymentMethod('uploadQr')}
                    >
                      <i className="bi bi-qr-code me-1 text-warning"></i>
                      <strong>Upload QR Code Image</strong>
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className={`btn w-100 p-2 text-start rounded-3 border small ${settingsPaymentMethod === 'bankAccount'
                          ? 'btn-outline-warning border-warning bg-warning bg-opacity-10 text-white'
                          : 'btn-outline-secondary border-secondary border-opacity-25 text-secondary'
                        }`}
                      onClick={() => setSettingsPaymentMethod('bankAccount')}
                    >
                      <i className="bi bi-bank me-1 text-warning"></i>
                      <strong>Bank Account Details</strong>
                    </button>
                  </div>
                </div>

                {/* Option 1: Upload QR */}
                {settingsPaymentMethod === 'uploadQr' && (
                  <div>
                    <label className="form-label-custom">Upload New QR Code Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control form-control-custom"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSettingsQrFile(e.target.files[0]);
                          setSettingsQrPreview(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                    />
                    {settingsQrPreview && (
                      <div className="text-center p-3 mt-2">
                        <div className="small text-secondary mb-1">Current Active QR Code:</div>
                        <div className="qr-display-box mx-auto">
                          <img src={settingsQrPreview} alt="QR Preview" className="qr-display-img" style={{ width: '150px', height: '150px', objectFit: 'contain' }} />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Option 2: Bank Account Details */}
                {settingsPaymentMethod === 'bankAccount' && (
                  <div>
                    <div className="row g-2">
                      <div className="col-md-6">
                        <label className="form-label-custom">Bank Account Number</label>
                        <input
                          type="text"
                          className="form-control form-control-custom"
                          placeholder="e.g. 123456789012"
                          value={bankData.accountNumber}
                          onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label-custom">Confirm Account Number</label>
                        <input
                          type="text"
                          className="form-control form-control-custom"
                          placeholder="Re-enter account number"
                          value={bankData.confirmAccountNumber}
                          onChange={(e) => setBankData({ ...bankData, confirmAccountNumber: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label-custom">Bank IFSC Code</label>
                        <input
                          type="text"
                          maxLength={11}
                          className="form-control form-control-custom text-uppercase"
                          placeholder="e.g. SBIN0001234"
                          value={bankData.ifsc}
                          onChange={(e) => setBankData({ ...bankData, ifsc: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label-custom">Account Holder Name</label>
                        <input
                          type="text"
                          className="form-control form-control-custom"
                          placeholder="Full name as in passbook"
                          value={bankData.accountHolderName}
                          onChange={(e) => setBankData({ ...bankData, accountHolderName: e.target.value })}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label-custom">Bank Name (Optional)</label>
                        <input
                          type="text"
                          className="form-control form-control-custom"
                          placeholder="e.g. State Bank of India, HDFC"
                          value={bankData.bankName}
                          onChange={(e) => setBankData({ ...bankData, bankName: e.target.value })}
                        />
                      </div>

                      <div className="col-12 mt-2">
                        <button
                          type="button"
                          onClick={handleConvertBankToRealQrInSettings}
                          className="btn btn-warning w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                        >
                          <i className="bi bi-qr-code-scan"></i> Add Bank Account Details
                        </button>
                      </div>

                      {bankConversionSuccess && bankConvertedQrUrl && (
                        <div className="col-12 text-center py-2">
                          <div className="alert alert-success py-1 small mb-2 d-inline-block">
                            <i className="bi bi-check-circle-fill me-1"></i> Real Bank Account QR Generated
                          </div>
                          <div className="qr-display-box mx-auto">
                            <img src={bankConvertedQrUrl} alt="Real QR" className="qr-display-img" style={{ width: '150px', height: '150px' }} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* UPI ID Input */}
              <div className="mb-3">
                <label className="form-label-custom">Artist UPI ID (Optional fallback)</label>
                <input
                  type="text"
                  className="form-control form-control-custom"
                  placeholder="e.g. name@okhdfcbank"
                  value={profileData.upiId}
                  onChange={(e) => setProfileData({ ...profileData, upiId: e.target.value })}
                />
                <div className="text-secondary small mt-1">Given to customers as a 1-click copy option during checkout.</div>
              </div>

              {/* Bio */}
              <div className="mb-3">
                <label className="form-label-custom">Artist Bio</label>
                <textarea
                  rows="3"
                  className="form-control form-control-custom"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-gold w-100 py-2 fw-bold mt-3"
                disabled={savingProfile}
              >
                {savingProfile ? 'Saving...' : 'Save Profile & Payment Credentials'}
              </button>
            </form>
          </div>
        )}

        {/* Edit Artwork Details Modal */}
        {editingArt && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content text-white" style={{ background: '#121626', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="modal-header border-secondary border-opacity-25">
                  <h5 className="modal-title fw-bold">Edit Artwork Details</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setEditingArt(null)}></button>
                </div>
                <form onSubmit={handleSaveEdit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label-custom">Artwork Title</label>
                      <input
                        type="text"
                        className="form-control form-control-custom"
                        value={editFormData.title}
                        onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <label className="form-label-custom">Category</label>
                        <select
                          className="form-select form-select-custom"
                          value={editFormData.category}
                          onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                          required
                        >
                          <option value="Oil Painting">Oil Painting</option>
                          <option value="Acrylic Painting">Acrylic Painting</option>
                          <option value="Watercolor">Watercolor</option>
                          <option value="Digital Art">Digital Art</option>
                          <option value="Charcoal Sketch">Charcoal Sketch</option>
                          <option value="Sculpture">Sculpture</option>
                        </select>
                      </div>
                      <div className="col-6">
                        <label className="form-label-custom">Price in INR (₹)</label>
                        <input
                          type="number"
                          className="form-control form-control-custom"
                          value={editFormData.price}
                          onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                          required
                        >
                        </input>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label-custom">Dimensions</label>
                      <input
                        type="text"
                        className="form-control form-control-custom"
                        value={editFormData.dimensions}
                        onChange={(e) => setEditFormData({ ...editFormData, dimensions: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label-custom">Description</label>
                      <textarea
                        rows="3"
                        className="form-control form-control-custom"
                        value={editFormData.description}
                        onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="modal-footer border-secondary border-opacity-25">
                    <button type="button" className="btn btn-glass btn-sm" onClick={() => setEditingArt(null)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-gold btn-sm" disabled={savingEdit}>
                      {savingEdit ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Payment Receipt Full Size Modal */}
        {selectedReceipt && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content text-white p-3 text-center" style={{ background: '#121626' }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold text-white mb-0">Customer Payment Proof</h6>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedReceipt(null)}></button>
                </div>
                <img src={selectedReceipt} alt="Payment Receipt" className="img-fluid rounded" style={{ maxHeight: '75vh', objectFit: 'contain' }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
