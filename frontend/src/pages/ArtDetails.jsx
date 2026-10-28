import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/client';
import LikeButton from '../components/LikeButton';
import { useAuth } from '../context/AuthContext';
import { localMediaUrl, onLocalImageError } from '../utils/localImage';

export default function ArtDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [art, setArt] = useState(null);
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const res = await api.get(`/arts/${id}`);
        if (res.data.success) {
          setArt(res.data.art);
          setArtist(res.data.artist);
        }
      } catch (err) {
        setError(err.message || 'Failed to load artwork details.');
      } finally {
        setLoading(false);
      }
    };

    fetchArt();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5 min-vh-70 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-warning" role="status"></div>
      </div>
    );
  }

  if (error || !art) {
    return (
      <div className="container py-5 text-center">
        <div className="glass-panel p-5">
          <i className="bi bi-exclamation-circle fs-1 text-danger mb-3 d-block"></i>
          <h3 className="text-white fw-bold">Artwork Not Found</h3>
          <p className="text-secondary small mb-4">{error || 'This artwork may have been removed or is pending approval.'}</p>
          <Link to="/gallery" className="btn btn-gold btn-sm">
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const isLikedByMe = Array.isArray(art.likes) && user
    ? art.likes.map(String).includes(String(user._id))
    : false;

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  return (
    <div className="art-details-page py-5">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/" className="text-secondary text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/gallery" className="text-secondary text-decoration-none">Gallery</Link></li>
            <li className="breadcrumb-item active text-warning" aria-current="page">{art.title}</li>
          </ol>
        </nav>

        <div className="row g-5">
          {/* Left Column: Image Showcase */}
          <div className="col-lg-7">
            <div className="glass-panel p-3 shadow-lg rounded-4 overflow-hidden position-relative">
              <img
                src={localMediaUrl(art.imageUrl, 'art')}
                alt={art.title}
                className="img-fluid rounded-3 w-100 shadow"
                style={{ maxHeight: '600px', objectFit: 'contain', backgroundColor: '#070913' }}
                onError={(e) => onLocalImageError(e, 'art')}
              />
              <div className="position-absolute top-0 end-0 p-4">
                <LikeButton
                  artId={art._id}
                  initialLikesCount={art.likesCount || 0}
                  initialLiked={isLikedByMe}
                  onLikeChanged={(liked, count) => {
                    setArt((prev) => ({ ...prev, likesCount: count }));
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Artwork Metadata & Order Action */}
          <div className="col-lg-5">
            <div className="d-flex flex-column h-100">
              <div className="mb-3">
                <span className="badge-category me-2">{art.category}</span>
                <span className="text-secondary small">
                  <i className="bi bi-heart-fill text-danger me-1"></i>
                  {art.likesCount || 0} likes
                </span>
              </div>

              <h1 className="display-6 fw-bold text-white font-serif mb-2">{art.title}</h1>

              {/* Price Banner */}
              <div className="glass-panel p-3 my-3 d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-secondary small d-block">Original Artwork Price</span>
                  <span className="fs-3 fw-bold text-warning">{formatPrice(art.price)}</span>
                </div>
                <Link
                  to={`/order/${art._id}`}
                  className="btn btn-gold btn-lg px-4 d-flex align-items-center gap-2"
                >
                  <i className="bi bi-bag-check-fill"></i> Order Now
                </Link>
              </div>

              {/* Details & Medium */}
              <div className="mb-4">
                <h6 className="text-white fw-semibold mb-2">About The Artwork</h6>
                <p className="text-secondary small lh-base">{art.description}</p>
                <div className="row g-2 mt-2 pt-2 border-top border-secondary border-opacity-25 small">
                  <div className="col-6">
                    <span className="text-secondary">Medium: </span>
                    <span className="text-light fw-medium">{art.category}</span>
                  </div>
                  <div className="col-6">
                    <span className="text-secondary">Dimensions: </span>
                    <span className="text-light fw-medium">{art.dimensions || 'Standard Frame'}</span>
                  </div>
                </div>
              </div>

              {/* Artist Mini Profile Card */}
              {artist && (
                <div className="glass-panel p-3 mt-auto">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={localMediaUrl(artist.avatar, 'profile')}
                      alt={artist.username}
                      className="rounded-circle"
                      style={{ width: '56px', height: '56px', objectFit: 'cover', border: '2px solid #f59e0b' }}
                      onError={(e) => onLocalImageError(e, 'profile')}
                    />
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2">
                        <h6 className="text-white fw-bold mb-0">@{artist.username}</h6>
                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle small py-0 px-2" style={{ fontSize: '0.7rem' }}>
                          Artist
                        </span>
                      </div>
                      <p className="text-secondary small text-truncate mb-1" style={{ maxWidth: '240px', fontSize: '0.8rem' }}>
                        {artist.bio || 'Independent Master Painter'}
                      </p>
                      <Link
                        to={`/artist/${artist.username}`}
                        className="text-warning small fw-semibold text-decoration-none hover-gold d-inline-flex align-items-center gap-1"
                      >
                        <i className="bi bi-person-badge"></i> View Artist Works
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Guarantee info */}
              <div className="mt-3 p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="d-flex align-items-center gap-2 small text-secondary">
                  <i className="bi bi-shield-check text-success fs-5"></i>
                  <span>Includes Certificate of Authenticity & Direct Artist Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
