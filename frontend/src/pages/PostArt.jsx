import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';

const categories = ['Oil Painting', 'Acrylic', 'Watercolor', 'Digital Art', 'Charcoal Sketch', 'Sculpture'];

export default function PostArt() {
  const { user, isArtist } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', category: categories[0], dimensions: '', price: '', artistUpiId: user?.upiId || '', artistBio: user?.bio || '' });
  const [artImage, setArtImage] = useState(null);
  const [qrImage, setQrImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    if (!artImage) return setError('Choose an image for your artwork.');
    if (!isArtist && !form.artistUpiId && !qrImage) return setError('Add your UPI ID or upload a scannable QR image for your first submission.');

    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => body.append(key, value));
    body.append('artImage', artImage);
    if (qrImage) body.append('upiQrImage', qrImage);

    setSubmitting(true);
    try {
      const response = await api.post('/arts', body, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSuccess(response.data.message || 'Artwork submitted.');
      window.setTimeout(() => navigate(isArtist ? '/artist/dashboard' : '/customer/dashboard'), 1800);
    } catch (requestError) {
      setError(requestError.message || 'Could not submit the artwork.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-5">
      <div className="container" style={{ maxWidth: 820 }}>
        <div className="mb-4">
          <Link to={isArtist ? '/artist/dashboard' : '/customer/dashboard'} className="text-secondary text-decoration-none small"><i className="bi bi-arrow-left me-1" />Back to dashboard</Link>
          <h1 className="text-white fw-bold font-serif mt-2">Share your artwork</h1>
          <p className="text-secondary">Add your artwork details and a local image file.</p>
        </div>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {success && <div className="alert alert-success py-2">{success}</div>}

        <form onSubmit={submit} className="glass-panel p-4 p-md-5">
          <div className="row g-3">
            <div className="col-md-8">
              <label className="form-label-custom">Artwork title</label>
              <input className="form-control form-control-custom" name="title" value={form.title} onChange={update} required maxLength={100} />
            </div>
            <div className="col-md-4">
              <label className="form-label-custom">Price (₹)</label>
              <input className="form-control form-control-custom" name="price" type="number" min="1" step="1" value={form.price} onChange={update} required />
            </div>
            <div className="col-md-6">
              <label className="form-label-custom">Medium</label>
              <select className="form-select form-control-custom" name="category" value={form.category} onChange={update}>{categories.map((category) => <option key={category}>{category}</option>)}</select>
            </div>
            <div className="col-md-6">
              <label className="form-label-custom">Dimensions</label>
              <input className="form-control form-control-custom" name="dimensions" value={form.dimensions} onChange={update} placeholder="e.g. 24 x 36 inches" />
            </div>
            <div className="col-12">
              <label className="form-label-custom">Description</label>
              <textarea className="form-control form-control-custom" name="description" rows="4" value={form.description} onChange={update} required maxLength={2000} />
            </div>
            <div className="col-12">
              <label className="form-label-custom">Artwork image</label>
              <input className="form-control form-control-custom" type="file" accept="image/*" onChange={(event) => setArtImage(event.target.files?.[0] || null)} required />
            </div>

            {!isArtist && <>
              <div className="col-md-6">
                <label className="form-label-custom">UPI ID</label>
                <input className="form-control form-control-custom" name="artistUpiId" value={form.artistUpiId} onChange={update} placeholder="name@bank" />
              </div>
              <div className="col-md-6">
                <label className="form-label-custom">Payment QR image</label>
                <input className="form-control form-control-custom" type="file" accept="image/*" onChange={(event) => setQrImage(event.target.files?.[0] || null)} />
                <div className="form-text text-secondary">Upload a real, scannable QR image. Local sample placeholders cannot receive payments.</div>
              </div>
              <div className="col-12">
                <label className="form-label-custom">Short artist bio</label>
                <textarea className="form-control form-control-custom" name="artistBio" rows="2" value={form.artistBio} onChange={update} maxLength={500} />
              </div>
            </>}
          </div>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-gold px-4" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit artwork'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
