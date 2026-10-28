import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';

export default function OrderArt() {
  const { artId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [art, setArt] = useState(null);
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedBankField, setCopiedBankField] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.username || '',
    mobile: user?.phone || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
    paymentMode: 'UPI',
    upiRef: ''
  });

  const [paymentProofFile, setPaymentProofFile] = useState(null);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const res = await api.get(`/arts/${artId}`);
        if (res.data.success) {
          setArt(res.data.art);
          setArtist(res.data.artist);
        }
      } catch (err) {
        setError(err.message || 'Artwork not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchArt();
  }, [artId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCopyUpi = () => {
    const upi = artist?.upiId || art?.artistUpiId || 'artist@upi';
    navigator.clipboard.writeText(upi);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyBankField = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedBankField(fieldName);
    setTimeout(() => setCopiedBankField(''), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.mobile || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      setError('Please provide all the required delivery address fields.');
      return;
    }

    if (formData.paymentMode === 'UPI' && !formData.upiRef.trim() && !paymentProofFile) {
      setError('For UPI payments, please enter your UPI Reference (UTR) number or upload payment screenshot.');
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('artId', art._id);
      data.append('fullName', formData.fullName);
      data.append('mobile', formData.mobile);
      data.append('address', formData.address);
      data.append('city', formData.city);
      data.append('state', formData.state);
      data.append('pincode', formData.pincode);
      data.append('notes', formData.notes);
      data.append('paymentMode', formData.paymentMode);
      data.append('upiRef', formData.upiRef);

      if (paymentProofFile) {
        data.append('paymentProof', paymentProofFile);
      }

      const res = await api.post('/orders', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        setOrderSuccess(res.data.order);
      }
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5 min-vh-70 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-warning" role="status"></div>
      </div>
    );
  }

  if (!art) {
    return (
      <div className="container py-5 text-center">
        <div className="glass-panel p-5">
          <h4 className="text-white">Artwork Not Available</h4>
          <Link to="/gallery" className="btn btn-gold btn-sm mt-3">Back to Gallery</Link>
        </div>
      </div>
    );
  }

  // Success view
  if (orderSuccess) {
    return (
      <div className="order-success-page py-5">
        <div className="container" style={{ maxWidth: '650px' }}>
          <div className="glass-panel p-5 text-center">
            <div className="mb-3">
              <i className="bi bi-check-circle-fill text-success fs-1"></i>
            </div>
            <h2 className="text-white fw-bold font-serif mb-2">Order Confirmed!</h2>
            <p className="text-secondary small mb-4">
              Thank you for supporting independent art! Your order has been placed directly with the artist.
            </p>

            <div className="p-3 rounded-3 text-start mb-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary small">Order Number:</span>
                <span className="text-warning fw-bold small">{orderSuccess.orderNumber}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary small">Artwork:</span>
                <span className="text-white small fw-medium">{orderSuccess.artTitle}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary small">Artist:</span>
                <span className="text-white small">@{orderSuccess.artistName}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary small">Total Amount:</span>
                <span className="text-warning fw-bold fs-5">₹{orderSuccess.amount}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary small">Payment Method:</span>
                <span className="badge bg-secondary">{orderSuccess.paymentMode}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-secondary small">Deliver To:</span>
                <span className="text-white small text-end" style={{ maxWidth: '280px' }}>
                  {orderSuccess.customerDetails.fullName}, {orderSuccess.customerDetails.address}, {orderSuccess.customerDetails.city} - {orderSuccess.customerDetails.pincode}
                </span>
              </div>
            </div>

            <div className="d-flex gap-3 justify-content-center">
              <Link to="/customer/dashboard" className="btn btn-gold px-4">
                View My Orders
              </Link>
              <Link to="/gallery" className="btn btn-glass px-4">
                Continue Browsing
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const artistUpiQr = artist?.upiQr || art.artistUpiQr || '/images/QR image/qr-placeholder.svg';
  const artistUpiId = artist?.upiId || art.artistUpiId || 'artist@upi';

  return (
    <div className="order-art-page py-5">
      <div className="container" style={{ maxWidth: '960px' }}>
        <div className="mb-4">
          <Link to={`/art/${art._id}`} className="text-secondary text-decoration-none small hover-gold d-inline-flex align-items-center gap-1">
            <i className="bi bi-arrow-left"></i> Back to Artwork
          </Link>
          <h2 className="text-white fw-bold font-serif mt-2 mb-1">Place Artwork Order</h2>
          <p className="text-secondary small">Direct purchase from certified artist with authentic provenance.</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small d-flex align-items-center gap-2 mb-4" role="alert">
            <i className="bi bi-exclamation-triangle-fill"></i>
            <span>{error}</span>
          </div>
        )}

        <div className="row g-4">
          {/* Order Details Form */}
          <div className="col-lg-7">
            <div className="glass-panel p-4">
              <h5 className="text-white fw-bold mb-3 d-flex align-items-center gap-2">
                <i className="bi bi-geo-alt-fill text-warning"></i> Delivery Address
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Full Name */}
                  <div className="col-md-6">
                    <label className="form-label-custom">Full Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-control form-control-custom"
                      placeholder="Receiver's name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="col-md-6">
                    <label className="form-label-custom">Mobile Number <span className="text-danger">*</span></label>
                    <input
                      type="tel"
                      name="mobile"
                      className="form-control form-control-custom"
                      placeholder="For delivery updates"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Street Address */}
                  <div className="col-12">
                    <label className="form-label-custom">Delivery Street Address <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      name="address"
                      className="form-control form-control-custom"
                      placeholder="House / Apartment no, Street, Landmark"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* City */}
                  <div className="col-md-4 col-6">
                    <label className="form-label-custom">City <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      name="city"
                      className="form-control form-control-custom"
                      placeholder="e.g. Bengaluru"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* State */}
                  <div className="col-md-4 col-6">
                    <label className="form-label-custom">State <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      name="state"
                      className="form-control form-control-custom"
                      placeholder="e.g. Karnataka"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Pincode */}
                  <div className="col-md-4 col-12">
                    <label className="form-label-custom">Pincode <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      name="pincode"
                      className="form-control form-control-custom"
                      placeholder="6 digits"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Delivery Notes */}
                  <div className="col-12">
                    <label className="form-label-custom">Delivery Notes (Optional)</label>
                    <textarea
                      name="notes"
                      rows="2"
                      className="form-control form-control-custom"
                      placeholder="Special packaging or delivery instructions..."
                      value={formData.notes}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {/* Payment Mode Selector */}
                  <div className="col-12 mt-4 pt-3 border-top border-secondary border-opacity-25">
                    <h5 className="text-white fw-bold mb-3 d-flex align-items-center gap-2">
                      <i className="bi bi-credit-card-fill text-warning"></i> Select Payment Mode
                    </h5>

                    <div className="d-flex flex-column gap-2 mb-3">
                      {/* Option 1: UPI */}
                      <label className={`p-3 rounded-3 d-flex align-items-center gap-3 cursor-pointer ${formData.paymentMode === 'UPI' ? 'border border-warning bg-warning bg-opacity-10' : 'glass-panel'}`}>
                        <input
                          type="radio"
                          name="paymentMode"
                          value="UPI"
                          checked={formData.paymentMode === 'UPI'}
                          onChange={handleChange}
                          className="form-check-input"
                        />
                        <div className="flex-grow-1">
                          <div className="fw-bold text-white d-flex align-items-center gap-2">
                            <span>UPI Direct Transfer (Artist QR)</span>
                            <span className="badge bg-warning text-dark">Recommended</span>
                          </div>
                          <div className="text-secondary small">Instant payment via GPay, PhonePe, Paytm, or BHIM directly to creator.</div>
                        </div>
                        <i className="bi bi-qr-code-scan fs-3 text-warning"></i>
                      </label>

                      {/* Option 2: Cash on Delivery */}
                      <label className={`p-3 rounded-3 d-flex align-items-center gap-3 cursor-pointer ${formData.paymentMode === 'COD' ? 'border border-warning bg-warning bg-opacity-10' : 'glass-panel'}`}>
                        <input
                          type="radio"
                          name="paymentMode"
                          value="COD"
                          checked={formData.paymentMode === 'COD'}
                          onChange={handleChange}
                          className="form-check-input"
                        />
                        <div className="flex-grow-1">
                          <div className="fw-bold text-white">Cash / UPI on Delivery (COD)</div>
                          <div className="text-secondary small">Pay securely when the artwork arrives at your door.</div>
                        </div>
                        <i className="bi bi-cash-stack fs-3 text-success"></i>
                      </label>

                      {/* Option 3: Card / NetBanking */}
                      <label className={`p-3 rounded-3 d-flex align-items-center gap-3 cursor-pointer ${formData.paymentMode === 'Card/NetBanking' ? 'border border-warning bg-warning bg-opacity-10' : 'glass-panel'}`}>
                        <input
                          type="radio"
                          name="paymentMode"
                          value="Card/NetBanking"
                          checked={formData.paymentMode === 'Card/NetBanking'}
                          onChange={handleChange}
                          className="form-check-input"
                        />
                        <div className="flex-grow-1">
                          <div className="fw-bold text-white">Debit / Credit Card / Net Banking</div>
                          <div className="text-secondary small">Secure instant simulated gateway.</div>
                        </div>
                        <i className="bi bi-credit-card fs-3 text-info"></i>
                      </label>
                    </div>

                    {/* IF UPI SELECTED: DISPLAY ARTIST'S QR CODE */}
                    {formData.paymentMode === 'UPI' && (
                      <div className="p-4 rounded-3 text-center my-3" style={{ background: '#0e1222', border: '1px solid rgba(245, 158, 11, 0.35)' }}>
                        <div className="d-inline-flex align-items-center gap-2 mb-2 text-warning small fw-bold">
                          <i className="bi bi-qr-code"></i> ARTIST'S UPI PAYMENT QR
                        </div>
                        <h6 className="text-white mb-3">Scan & Pay ₹{art.price} to @{art.artistUsername || art.artistName}</h6>

                        {/* Display QR Code */}
                        <div className="qr-display-box mx-auto mb-3">
                          <img
                            src={artistUpiQr}
                            alt="Artist UPI QR"
                            className="qr-display-img"
                          />
                        </div>
                        {artistUpiQr.includes('qr-placeholder.svg') && (
                          <p className="small text-warning mb-3">Sample image only. The artist must add a scannable QR from the local images/QR image folder.</p>
                        )}

                        {/* Artist UPI ID with copy */}
                        <div className="d-inline-flex align-items-center gap-2 p-2 px-3 rounded-pill bg-dark border border-secondary mb-3">
                          <span className="text-secondary small">Artist UPI ID:</span>
                          <span className="text-warning fw-bold small">{artistUpiId}</span>
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className="btn btn-sm btn-outline-secondary py-0 px-2 text-light"
                          >
                            {copiedUpi ? 'Copied!' : 'Copy'}
                          </button>
                        </div>

                        {/* Optional Bank Account Details if provided by Artist */}
                        {(artist?.bankDetails?.accountNumber || art.artistBankDetails?.accountNumber) && (
                          <div className="mt-2 mb-3 p-3 rounded text-start" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <div className="small fw-bold text-white mb-2 d-flex align-items-center gap-1">
                              <i className="bi bi-bank text-warning"></i> Direct Bank Account Transfer (IMPS / NEFT):
                            </div>
                            {(artist?.bankDetails?.bankName || art.artistBankDetails?.bankName) && (
                              <div className="small text-secondary mb-1">
                                Bank: <strong className="text-light">{artist?.bankDetails?.bankName || art.artistBankDetails?.bankName}</strong>
                              </div>
                            )}
                            <div className="d-flex justify-content-between align-items-center small mb-1">
                              <span>A/C No: <strong className="text-light">{artist?.bankDetails?.accountNumber || art.artistBankDetails?.accountNumber}</strong></span>
                              <button
                                type="button"
                                onClick={() => handleCopyBankField(artist?.bankDetails?.accountNumber || art.artistBankDetails?.accountNumber, 'acc')}
                                className="btn btn-outline-secondary btn-xs py-0 px-2"
                                style={{ fontSize: '0.72rem' }}
                              >
                                {copiedBankField === 'acc' ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                            <div className="d-flex justify-content-between align-items-center small">
                              <span>IFSC: <strong className="text-warning">{artist?.bankDetails?.ifsc || art.artistBankDetails?.ifsc}</strong></span>
                              <button
                                type="button"
                                onClick={() => handleCopyBankField(artist?.bankDetails?.ifsc || art.artistBankDetails?.ifsc, 'ifsc')}
                                className="btn btn-outline-secondary btn-xs py-0 px-2"
                                style={{ fontSize: '0.72rem' }}
                              >
                                {copiedBankField === 'ifsc' ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="text-start mt-3 pt-3 border-top border-secondary border-opacity-25">
                          <label className="form-label-custom">
                            UPI Transaction Reference / UTR Number <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="upiRef"
                            className="form-control form-control-custom mb-2"
                            placeholder="Enter 12-digit UPI reference ID from your banking app"
                            value={formData.upiRef}
                            onChange={handleChange}
                          />

                          <label className="form-label-custom mt-2">
                            Optional: Upload Payment Receipt Screenshot
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            className="form-control form-control-custom"
                            onChange={(e) => setPaymentProofFile(e.target.files[0])}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      className="btn btn-gold w-100 py-3 fw-bold fs-5 d-flex align-items-center justify-content-center gap-2"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          <span>Confirming Order...</span>
                        </>
                      ) : (
                        <>
                          <i className="bi bi-shield-lock-fill"></i>
                          <span>Place Order • ₹{art.price}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Artwork Summary */}
          <div className="col-lg-5">
            <div className="glass-panel p-4 position-sticky" style={{ top: '100px' }}>
              <h5 className="text-white fw-bold mb-3">Order Summary</h5>
              <div className="d-flex gap-3 mb-3 pb-3 border-bottom border-secondary border-opacity-25">
                <img
                  src={art.imageUrl && !String(art.imageUrl).startsWith('http') ? art.imageUrl : '/images/Art image/artwork-placeholder.svg'}
                  alt={art.title}
                  className="rounded-3 shadow"
                  style={{ width: '90px', height: '90px', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = '/images/Art image/artwork-placeholder.svg'; }}
                />
                <div>
                  <h6 className="text-white fw-bold mb-1">{art.title}</h6>
                  <div className="text-secondary small mb-1">By @{art.artistUsername || art.artistName}</div>
                  <span className="badge-category" style={{ fontSize: '0.7rem' }}>{art.category}</span>
                </div>
              </div>

              <div className="d-flex justify-content-between mb-2 small text-secondary">
                <span>Artwork Price:</span>
                <span className="text-white fw-semibold">₹{art.price}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 small text-secondary">
                <span>Packaging & Wooden Crate:</span>
                <span className="text-success fw-semibold">FREE (Protected)</span>
              </div>
              <div className="d-flex justify-content-between mb-3 small text-secondary">
                <span>Doorstep Insured Delivery:</span>
                <span className="text-success fw-semibold">FREE</span>
              </div>

              <div className="d-flex justify-content-between pt-3 border-top border-secondary border-opacity-25 mb-4">
                <span className="text-white fw-bold fs-5">Total Payable:</span>
                <span className="text-warning fw-bold fs-4">₹{art.price}</span>
              </div>

              <div className="p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="d-flex align-items-center gap-2 small text-secondary">
                  <i className="bi bi-shield-check text-warning fs-5"></i>
                  <span>100% Secure Checkout Guarantee • Certificate of Authenticity Included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
